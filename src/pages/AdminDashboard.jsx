
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api, { getErrorMessage } from "../services/api";
import { API_ENDPOINTS } from "../config/api";

import "../css/adminDashboard.css";
import NewsSliderAdmin from "../components/NewsSliderAdmin";

const REVIEWS_ENDPOINT = "/api/reviews";

const emptyContentForm = {
  name: "",
  title: "",
  category: "",
  description: "",
  image: null,
};

const emptyProductForm = {
  name: "",
  role: "",
  price: "",
  oldprice: "",
  image: null,
};

const emptyContactForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const isNewsContent = (item) => {
  const type = String(item?.contentType || item?.type || "")
    .trim()
    .toLowerCase();
  const category = String(item?.category || "").trim();

  if (/news|press/.test(type)) return true;
  if (/(^|[**\s**_-])(news|press)([**\s**_-]|$)/i.test(category)) {
    return true;
  }
  if (type) return false;
  return false;
};

const getList = (result, keys = []) => {
  if (!result || result.status !== "fulfilled") return [];

  const data = result.value.data;

  if (Array.isArray(data)) return data;

  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key];
  }

  return [];
};

const createRequestBody = (fields, image) => {
  if (!image) return fields;

  const body = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      body.append(key, String(value));
    }
  });

  body.append("image", image);
  return body;
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const [contentForm, setContentForm] = useState(emptyContentForm);
  const [editingContentId, setEditingContentId] = useState("");

  const [productForm, setProductForm] = useState(emptyProductForm);
  const [editingProductId, setEditingProductId] = useState("");

  const [photoFile, setPhotoFile] = useState(null);
  const [editingPhotoId, setEditingPhotoId] = useState("");

  const [editingContactId, setEditingContactId] = useState("");
  const [contactForm, setContactForm] = useState(emptyContactForm);

  const [editingSubscriberId, setEditingSubscriberId] = useState("");
  const [subscriberEmail, setSubscriberEmail] = useState("");

  const articles = useMemo(
    () => blogs.filter((item) => !isNewsContent(item)),
    [blogs]
  );

  const pressReleases = useMemo(
    () => blogs.filter(isNewsContent),
    [blogs]
  );

  const ensureAdmin = useCallback(() => {
    const token = localStorage.getItem("token");
    let user;

    try {
      user = JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      user = null;
    }

    if (!token || user?.role !== "admin") {
      navigate("/login", {
        state: { from: "/admin" },
        replace: true,
      });
      return false;
    }

    return true;
  }, [navigate]);

  const loadData = useCallback(async () => {
    if (!ensureAdmin()) return;

    setLoading(true);

    const tasks = await Promise.allSettled([
      api.get(`${API_ENDPOINTS.ADMIN}/stats`),
      api.get(API_ENDPOINTS.BLOG, { params: { type: "article" } }),
      api.get(API_ENDPOINTS.PRESS_RELEASE),
      api.get(API_ENDPOINTS.PRODUCT),
      api.get(API_ENDPOINTS.PHOTO),
      api.get(API_ENDPOINTS.CONTACT),
      api.get(API_ENDPOINTS.SUBSCRIBERS),
      api.get(REVIEWS_ENDPOINT),
    ]);

    if (tasks[0].status === "fulfilled") {
      setStats(tasks[0].value.data?.stats || {});
    }

    const taskLabels = [
      "dashboard statistics",
      "blog articles",
      "press releases",
      "products",
      "gallery photos",
      "customer inquiries",
      "subscribers",
      "reviews",
    ];

    const firstFailureIndex = tasks.findIndex(
      (task) => task.status === "rejected"
    );

    if (firstFailureIndex >= 0) {
      const failedTask = tasks[firstFailureIndex];

      setNotice(
        `Could not load ${taskLabels[firstFailureIndex]}: ${getErrorMessage(
          failedTask.reason,
          "Request failed."
        )}`
      );
    } else {
      setNotice("");
    }

    const articleRecords = getList(tasks[1], [
      "blogs",
      "data",
      "posts",
    ]);

    const pressRecords = getList(tasks[2], [
      "pressReleases",
      "pressRelease",
      "blogs",
      "data",
      "posts",
    ]);

    setBlogs([
      ...articleRecords.filter((item) => !isNewsContent(item)),
      ...pressRecords.map((item) => ({
        ...item,
        contentType: "news",
      })),
    ]);

    setProducts(getList(tasks[3], ["products", "data"]));
    setPhotos(getList(tasks[4], ["photos", "photo", "data"]));
    setContacts(getList(tasks[5], ["contacts", "data"]));
    setSubscribers(getList(tasks[6], ["subscribers", "data"]));
    setReviews(getList(tasks[7], ["reviews", "data"]));

    setLoading(false);
  }, [ensureAdmin]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const clearContentEdit = () => {
    setEditingContentId("");
    setContentForm({ ...emptyContentForm });
  };

  const clearProductEdit = () => {
    setEditingProductId("");
    setProductForm({ ...emptyProductForm });
  };

  const clearPhotoEdit = () => {
    setEditingPhotoId("");
    setPhotoFile(null);
  };

  const clearContactEdit = () => {
    setEditingContactId("");
    setContactForm({ ...emptyContactForm });
  };

  const clearSubscriberEdit = () => {
    setEditingSubscriberId("");
    setSubscriberEmail("");
  };

  const handleContentSubmit = async (event, contentType) => {
    event.preventDefault();

    const formElement = event.currentTarget;

    setBusy(true);
    setNotice("");

    const fields = {
      name: contentForm.name.trim(),
      title: contentForm.title.trim(),
      category: contentForm.category.trim(),
      description: contentForm.description.trim(),
      contentType,
    };

    try {
      const body = createRequestBody(fields, contentForm.image);

      const contentEndpoint =
        contentType === "news"
          ? API_ENDPOINTS.PRESS_RELEASE
          : API_ENDPOINTS.BLOG;

      if (editingContentId) {
        await api.put(`${contentEndpoint}/${editingContentId}`, body);

        setNotice(
          contentType === "news"
            ? "Press release updated successfully."
            : "Blog article updated successfully."
        );
      } else {
        await api.post(contentEndpoint, body);

        setNotice(
          contentType === "news"
            ? "Press release published successfully."
            : "Blog article published successfully."
        );
      }

      formElement.reset();
      clearContentEdit();
      await loadData();
    } catch (error) {
      setNotice(
        getErrorMessage(
          error,
          "Could not save this content. Check the form and image configuration."
        )
      );
    } finally {
      setBusy(false);
    }
  };

  const handleProductSubmit = async (event) => {
    event.preventDefault();

    const formElement = event.currentTarget;

    setBusy(true);
    setNotice("");

    const fields = {
      name: productForm.name.trim(),
      role: productForm.role.trim(),
      price: productForm.price,
      oldprice: productForm.oldprice,
    };

    try {
      if (!editingProductId && !productForm.image) {
        throw new Error("Please choose a product image.");
      }

      const body = createRequestBody(fields, productForm.image);

      if (editingProductId) {
        await api.put(`${API_ENDPOINTS.PRODUCT}/${editingProductId}`, body);
        setNotice("Product updated successfully.");
      } else {
        await api.post(API_ENDPOINTS.PRODUCT, body);
        setNotice("Product added successfully.");
      }

      formElement.reset();
      clearProductEdit();
      await loadData();
    } catch (error) {
      setNotice(getErrorMessage(error, "Could not save product."));
    } finally {
      setBusy(false);
    }
  };

  const handlePhotoSubmit = async (event) => {
    event.preventDefault();

    const formElement = event.currentTarget;

    if (!photoFile) {
      setNotice(
        editingPhotoId
          ? "Choose a replacement image to edit this photo."
          : "Please choose a photo file."
      );
      return;
    }

    setBusy(true);
    setNotice("");

    try {
      const body = new FormData();
      body.append("image", photoFile);

      if (editingPhotoId) {
        await api.put(`${API_ENDPOINTS.PHOTO}/${editingPhotoId}`, body);
        setNotice("Gallery photo replaced successfully.");
      } else {
        await api.post(API_ENDPOINTS.PHOTO, body);
        setNotice("Gallery photo uploaded successfully.");
      }

      formElement.reset();
      clearPhotoEdit();
      await loadData();
    } catch (error) {
      setNotice(
        getErrorMessage(
          error,
          "Could not save photo. Check Cloudinary configuration."
        )
      );
    } finally {
      setBusy(false);
    }
  };

  const startEditContent = (item, contentType) => {
    setEditingContentId(item._id);

    setContentForm({
      name: item.name || "",
      title: item.title || "",
      category: item.category || "",
      description: item.description || "",
      image: null,
    });

    setTab(contentType === "news" ? "press" : "blogs");

    setNotice(
      "Edit the fields and save your changes. Choose a new image only if you want to replace the current one."
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startEditProduct = (item) => {
    setEditingProductId(item._id);

    setProductForm({
      name: item.name || "",
      role: item.role || "",
      price: String(item.price ?? ""),
      oldprice:
        item.oldprice == null ? "" : String(item.oldprice),
      image: null,
    });

    setTab("products");

    setNotice(
      "Edit product details and save. Select a new image only if you want to replace the current image."
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startEditPhoto = (photo) => {
    setEditingPhotoId(photo._id);
    setPhotoFile(null);
    setTab("photos");

    setNotice(
      "Choose a replacement image, then click Replace Photo."
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startEditContact = (item) => {
    setEditingContactId(item._id);

    setContactForm({
      name: item.name || "",
      email: item.email || "",
      phone: item.phone || "",
      message: item.message || "",
    });
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    setBusy(true);
    setNotice("");

    try {
      await api.put(
        `${API_ENDPOINTS.CONTACT}/${editingContactId}`,
        contactForm
      );

      setNotice("Inquiry updated successfully.");

      clearContactEdit();
      await loadData();
    } catch (error) {
      setNotice(getErrorMessage(error, "Could not update inquiry."));
    } finally {
      setBusy(false);
    }
  };

  const startEditSubscriber = (item) => {
    setEditingSubscriberId(item._id || item.id);
    setSubscriberEmail(item.email || "");
  };

  const handleSubscriberSubmit = async (event) => {
    event.preventDefault();

    setBusy(true);
    setNotice("");

    try {
      await api.put(
        `${API_ENDPOINTS.SUBSCRIBERS}/${editingSubscriberId}`,
        { email: subscriberEmail }
      );

      setNotice("Subscriber email updated successfully.");

      clearSubscriberEdit();
      await loadData();
    } catch (error) {
      setNotice(
        getErrorMessage(error, "Could not update subscriber.")
      );
    } finally {
      setBusy(false);
    }
  };

  const deleteItem = async (kind, id, contentType = "article") => {
    if (!id || !window.confirm("Delete this item? This cannot be undone.")) {
      return;
    }

    const endpointMap = {
      content:
        contentType === "news"
          ? API_ENDPOINTS.PRESS_RELEASE
          : API_ENDPOINTS.BLOG,

      product: API_ENDPOINTS.PRODUCT,
      photo: API_ENDPOINTS.PHOTO,
      contact: API_ENDPOINTS.CONTACT,
      subscriber: API_ENDPOINTS.SUBSCRIBERS,
      review: REVIEWS_ENDPOINT,
    };

    try {
      setNotice("");

      await api.delete(`${endpointMap[kind]}/${id}`);

      if (kind === "content" && editingContentId === id) {
        clearContentEdit();
      }

      if (kind === "product" && editingProductId === id) {
        clearProductEdit();
      }

      if (kind === "photo" && editingPhotoId === id) {
        clearPhotoEdit();
      }

      if (kind === "contact" && editingContactId === id) {
        clearContactEdit();
      }

      if (kind === "subscriber" && editingSubscriberId === id) {
        clearSubscriberEdit();
      }

      setNotice(
        kind === "review"
          ? "Review deleted successfully."
          : "Item deleted successfully."
      );

      await loadData();
    } catch (error) {
      setNotice(
        getErrorMessage(error, "Could not delete this item.")
      );
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const renderContentForm = (contentType) => {
    const isEditing = Boolean(editingContentId);
    const isPress = contentType === "news";

    return (
      <>
        <h2>
          {isEditing
            ? `Edit ${isPress ? "Press Release" : "Blog Article"}`
            : isPress
              ? "Add a Press Release"
              : "Publish a Blog Article"}
        </h2>

        <p className="admin-section-intro">
          {isPress
            ? "Press releases added here appear on the website's Press Release page only."
            : "Blog articles added here appear in the Blog and Latest Articles sections only."}
        </p>

        <form
          className="admin-form"
          onSubmit={(event) => handleContentSubmit(event, contentType)}
        >
          <label>
            Author / Source name
            <input
              required
              value={contentForm.name}
              onChange={(event) =>
                setContentForm({
                  ...contentForm,
                  name: event.target.value,
                })
              }
            />
          </label>

          <label>
            Title
            <input
              required
              value={contentForm.title}
              onChange={(event) =>
                setContentForm({
                  ...contentForm,
                  title: event.target.value,
                })
              }
            />
          </label>

          <label>
            Category
            <input
              value={contentForm.category}
              onChange={(event) =>
                setContentForm({
                  ...contentForm,
                  category: event.target.value,
                })
              }
            />
          </label>

          <label>
            Description
            <textarea
              required
              rows="5"
              value={contentForm.description}
              onChange={(event) =>
                setContentForm({
                  ...contentForm,
                  description: event.target.value,
                })
              }
            />
          </label>

          <label>
            {isEditing
              ? "Replace image (optional)"
              : "Image (optional)"}
            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                setContentForm({
                  ...contentForm,
                  image: event.target.files?.[0] || null,
                })
              }
            />
          </label>

          <div className="admin-form-actions">
            <button disabled={busy} type="submit">
              {busy
                ? "Saving…"
                : isEditing
                  ? "Save Changes"
                  : isPress
                    ? "Publish Press Release"
                    : "Publish Blog Article"}
            </button>

            {isEditing && (
              <button
                className="admin-cancel-button"
                type="button"
                onClick={clearContentEdit}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <h2>
          {isPress
            ? "Published Press Releases"
            : "Published Blog Articles"}
        </h2>

        <div className="admin-record-list">
          {(isPress ? pressReleases : articles).map((item) => (
            <article key={item._id} className="admin-record">
              <div className="admin-record-main">
                <strong>{item.title}</strong>

                <p>
                  {item.name || ""}
                  {item.category
                    ? ` · ${item.category}`
                    : " · Uncategorised"}
                </p>

                {item.imageUrl && (
                  <img
                    className="admin-record-thumb"
                    src={item.imageUrl}
                    alt=""
                  />
                )}

                <p className="admin-record-description">
                  {item.description}
                </p>
              </div>

              <div className="admin-record-actions">
                <button
                  type="button"
                  className="admin-edit-button"
                  onClick={() =>
                    startEditContent(
                      item,
                      isPress ? "news" : "article"
                    )
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="admin-delete-button"
                  onClick={() =>
                    deleteItem(
                      "content",
                      item._id,
                      isPress ? "news" : "article"
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </article>
          ))}

          {(isPress ? pressReleases : articles).length === 0 && (
            <p>
              No {isPress ? "press releases" : "blog articles"} are in
              the database yet.
            </p>
          )}
        </div>
      </>
    );
  };

  return (
    <main className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="form-eyebrow">Content management</p>
          <h1>Admin Dashboard</h1>

          <p>
            Manage blog articles, press releases, products, photos,
            inquiries, subscribers and customer reviews.
          </p>
        </div>

        <div className="admin-actions">
          <button
            type="button"
            onClick={loadData}
            disabled={loading}
            className="admin-secondary-button"
          >
            {loading ? "Refreshing…" : "Refresh data"}
          </button>

          <Link to="/" className="admin-secondary-button">
            View website
          </Link>

          <button
            type="button"
            onClick={signOut}
            className="admin-secondary-button"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="admin-tabs">
        {[
          ["overview", "Overview"],
          ["blogs", "Blog Articles"],
          ["Newsslider", "News Slider"],
          ["press", "Press Releases"],
          ["products", "Products"],
          ["photos", "Photo Gallery"],
          ["inquiries", "Inquiries"],
          ["subscribers", "Subscribers"],
          ["reviews", "Customer Reviews"],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={tab === id ? "is-active" : ""}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {notice && (
        <p className="admin-notice" role="status">
          {notice}
        </p>
      )}

      {loading && (
        <p className="admin-notice">
          Loading dashboard…
        </p>
      )}

      {!loading && tab === "overview" && (
        <section className="admin-stats-grid">
          {[
            ["Users", stats.users],
            ["Products", stats.products],
            ["Orders", stats.orders],
            ["Published content", stats.blogs],
            [
              "Revenue",
              `₹${Number(stats.revenue || 0).toLocaleString("en-IN")}`,
            ],
            ["Inquiries", contacts.length],
            ["Subscribers", subscribers.length],
            ["Press Releases", pressReleases.length],
            ["Reviews", reviews.length],
          ].map(([label, value]) => (
            <article className="admin-stat-card" key={label}>
              <p>{label}</p>
              <strong>{value ?? "—"}</strong>
            </article>
          ))}

          <p className="admin-info">
            Add, edit or delete published content from the separate
            Blog Articles and Press Releases sections. New image
            uploads need Cloudinary configuration.
          </p>
        </section>
      )}

      {!loading && tab === "blogs" && (
        <section className="admin-section">
          {renderContentForm("article")}
        </section>
      )}

      {!loading && tab === "press" && (
        <section className="admin-section">
          {renderContentForm("news")}
        </section>
      )}

      {!loading && tab === "Newsslider" && (
        <NewsSliderAdmin />
      )}

      {!loading && tab === "products" && (
        <section className="admin-section">
          <h2>
            {editingProductId ? "Edit Product" : "Add a Product"}
          </h2>

          <p className="admin-section-intro">
            Edit product details or replace its image. Changes will
            reflect in the website product carousel and catalogue.
          </p>

          <form
            className="admin-form"
            onSubmit={handleProductSubmit}
          >
            <label>
              Product name
              <input
                required
                value={productForm.name}
                onChange={(event) =>
                  setProductForm({
                    ...productForm,
                    name: event.target.value,
                  })
                }
              />
            </label>

            <label>
              Product description
              <input
                required
                value={productForm.role}
                onChange={(event) =>
                  setProductForm({
                    ...productForm,
                    role: event.target.value,
                  })
                }
              />
            </label>

            <label>
              Price (₹)
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={productForm.price}
                onChange={(event) =>
                  setProductForm({
                    ...productForm,
                    price: event.target.value,
                  })
                }
              />
            </label>

            <label>
              Old price (₹)
              <input
                type="number"
                min="0"
                step="0.01"
                value={productForm.oldprice}
                onChange={(event) =>
                  setProductForm({
                    ...productForm,
                    oldprice: event.target.value,
                  })
                }
              />
            </label>

            <label>
              {editingProductId
                ? "Replace product image (optional)"
                : "Product image"}
              <input
                type="file"
                accept="image/*"
                required={!editingProductId}
                onChange={(event) =>
                  setProductForm({
                    ...productForm,
                    image: event.target.files?.[0] || null,
                  })
                }
              />
            </label>

            <div className="admin-form-actions">
              <button disabled={busy} type="submit">
                {busy
                  ? "Saving…"
                  : editingProductId
                    ? "Save Changes"
                    : "Add Product"}
              </button>

              {editingProductId && (
                <button
                  className="admin-cancel-button"
                  type="button"
                  onClick={clearProductEdit}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <h2>Products</h2>

          <div className="admin-record-list">
            {products.map((item) => (
              <article key={item._id} className="admin-record">
                <div className="admin-record-main">
                  {item.imageUrl && (
                    <img
                      className="admin-record-thumb"
                      src={item.imageUrl}
                      alt=""
                    />
                  )}

                  <strong>{item.name}</strong>

                  <p>
                    {item.role} · ₹{item.price}
                    {item.oldprice
                      ? ` (old ₹${item.oldprice})`
                      : ""}
                  </p>
                </div>

                <div className="admin-record-actions">
                  <button
                    type="button"
                    className="admin-edit-button"
                    onClick={() => startEditProduct(item)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="admin-delete-button"
                    onClick={() =>
                      deleteItem("product", item._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}

            {products.length === 0 && (
              <p>No products are in the database yet.</p>
            )}
          </div>
        </section>
      )}

      {!loading && tab === "photos" && (
        <section className="admin-section">
          <h2>
            {editingPhotoId
              ? "Replace Gallery Photo"
              : "Upload Gallery Photo"}
          </h2>

          <p className="admin-section-intro">
            To edit a photo, choose a replacement image and save it.
          </p>

          <form
            className="admin-form"
            onSubmit={handlePhotoSubmit}
          >
            <label>
              {editingPhotoId
                ? "Replacement photo"
                : "Photo"}
              <input
                required
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setPhotoFile(event.target.files?.[0] || null)
                }
              />
            </label>

            <div className="admin-form-actions">
              <button disabled={busy} type="submit">
                {busy
                  ? "Uploading…"
                  : editingPhotoId
                    ? "Replace Photo"
                    : "Upload Photo"}
              </button>

              {editingPhotoId && (
                <button
                  className="admin-cancel-button"
                  type="button"
                  onClick={clearPhotoEdit}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <h2>Gallery Photos</h2>

          <div className="admin-photo-grid">
            {photos.map((photo) => (
              <article
                className="admin-photo-card"
                key={photo._id}
              >
                {photo.imageUrl && (
                  <img src={photo.imageUrl} alt="Gallery item" />
                )}

                <div className="admin-photo-actions">
                  <button
                    type="button"
                    className="admin-edit-button"
                    onClick={() => startEditPhoto(photo)}
                  >
                    Edit / Replace
                  </button>

                  <button
                    type="button"
                    className="admin-delete-button"
                    onClick={() =>
                      deleteItem("photo", photo._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>

          {photos.length === 0 && (
            <p>No photos are in the database yet.</p>
          )}
        </section>
      )}

      {!loading && tab === "inquiries" && (
        <section className="admin-section">
          <h2>Customer Inquiries</h2>

          {editingContactId && (
            <form
              className="admin-form admin-inline-edit-form"
              onSubmit={handleContactSubmit}
            >
              <h3>Edit Inquiry</h3>

              <label>
                Name
                <input
                  required
                  value={contactForm.name}
                  onChange={(event) =>
                    setContactForm({
                      ...contactForm,
                      name: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Email
                <input
                  required
                  type="email"
                  value={contactForm.email}
                  onChange={(event) =>
                    setContactForm({
                      ...contactForm,
                      email: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Phone
                <input
                  value={contactForm.phone}
                  onChange={(event) =>
                    setContactForm({
                      ...contactForm,
                      phone: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Message
                <textarea
                  required
                  rows="4"
                  value={contactForm.message}
                  onChange={(event) =>
                    setContactForm({
                      ...contactForm,
                      message: event.target.value,
                    })
                  }
                />
              </label>

              <div className="admin-form-actions">
                <button disabled={busy} type="submit">
                  {busy ? "Saving…" : "Save Changes"}
                </button>

                <button
                  className="admin-cancel-button"
                  type="button"
                  onClick={clearContactEdit}
                >
                  Cancel Edit
                </button>
              </div>
            </form>
          )}

          <div className="admin-record-list">
            {contacts.map((item) => (
              <article
                className="admin-record"
                key={item._id}
              >
                <div className="admin-record-main">
                  <strong>
                    {item.name || item.fullName || "Inquiry"}
                  </strong>

                  <p>
                    {item.email || "No email"} ·{" "}
                    {item.phone || item.mobile || "No phone"}
                  </p>

                  <p className="admin-record-description">
                    {item.message || item.service || "No message"}
                  </p>
                </div>

                <div className="admin-record-actions">
                  <button
                    type="button"
                    className="admin-edit-button"
                    onClick={() => startEditContact(item)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="admin-delete-button"
                    onClick={() =>
                      deleteItem("contact", item._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}

            {contacts.length === 0 && (
              <p>No inquiries found.</p>
            )}
          </div>
        </section>
      )}

      {!loading && tab === "subscribers" && (
        <section className="admin-section">
          <h2>Newsletter Subscribers</h2>

          {editingSubscriberId && (
            <form
              className="admin-form admin-inline-edit-form"
              onSubmit={handleSubscriberSubmit}
            >
              <h3>Edit Subscriber Email</h3>

              <label>
                Email
                <input
                  required
                  type="email"
                  value={subscriberEmail}
                  onChange={(event) =>
                    setSubscriberEmail(event.target.value)
                  }
                />
              </label>

              <div className="admin-form-actions">
                <button disabled={busy} type="submit">
                  {busy ? "Saving…" : "Save Changes"}
                </button>

                <button
                  className="admin-cancel-button"
                  type="button"
                  onClick={clearSubscriberEdit}
                >
                  Cancel Edit
                </button>
              </div>
            </form>
          )}

          <div className="admin-record-list">
            {subscribers.map((item) => (
              <article
                className="admin-record"
                key={item._id || item.id}
              >
                <div className="admin-record-main">
                  <strong>{item.email}</strong>

                  <p>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : ""}
                  </p>
                </div>

                <div className="admin-record-actions">
                  <button
                    type="button"
                    className="admin-edit-button"
                    onClick={() => startEditSubscriber(item)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="admin-delete-button"
                    onClick={() =>
                      deleteItem(
                        "subscriber",
                        item._id || item.id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}

            {subscribers.length === 0 && (
              <p>No subscribers yet.</p>
            )}
          </div>
        </section>
      )}

      {/* CUSTOMER REVIEWS SECTION */}
      {!loading && tab === "reviews" && (
        <section className="admin-section">
          <h2>Customer Reviews</h2>

          <p className="admin-section-intro">
            View customer reviews submitted on your website.
            You can delete any review from here.
          </p>

          <div className="admin-record-list">
            {reviews.map((review) => {
              const rating = Math.min(
                5,
                Math.max(0, Math.round(Number(review.rating) || 0))
              );

              return (
                <article
                  className="admin-record"
                  key={review._id}
                >
                  <div className="admin-record-main">
                    <strong>
                      {review.name || "Anonymous"}
                    </strong>

                    <p>
                      <span
                        style={{
                          color: "#f5a623",
                          fontSize: "18px",
                          letterSpacing: "2px",
                        }}
                      >
                        {"★".repeat(rating)}
                        {"☆".repeat(5 - rating)}
                      </span>

                      {" "}
                      ({review.rating || 0}/5)
                    </p>

                    <p className="admin-record-description">
                      {review.text ||
                        review.message ||
                        "No review text"}
                    </p>

                    <small>
                      {review.createdAt
                        ? new Date(
                            review.createdAt
                          ).toLocaleString()
                        : ""}
                    </small>
                  </div>

                  <div className="admin-record-actions">
                    <button
                      type="button"
                      className="admin-delete-button"
                      onClick={() =>
                        deleteItem("review", review._id)
                      }
                    >
                      Delete Review
                    </button>
                  </div>
                </article>
              );
            })}

            {reviews.length === 0 && (
              <p>
                No customer reviews found in the database.
              </p>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default AdminDashboard;
