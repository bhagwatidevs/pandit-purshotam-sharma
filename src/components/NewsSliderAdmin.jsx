import React, { useEffect, useRef, useState } from "react";
import api from "../services/api";
import { API_ENDPOINTS } from "../config/api";
import "../css/newsSliderAdmin.css";

const NEWS_SLIDES_URL = API_ENDPOINTS.NEWS_SLIDES;
const MAX_IMAGE_KB = 200;
const MAX_IMAGE_BYTES = MAX_IMAGE_KB * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const EMPTY_FORM = {
  title: "",
  category: "",
  description: "",
  imageUrl: "",
  alt: "",
  sortOrder: 0,
  isActive: true,
};

const normalizeSlides = (payload) => {
  if (Array.isArray(payload)) return payload;
  return payload?.slides || payload?.data || [];
};

const NewsSliderAdmin = () => {
  const [slides, setSlides] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [imageMode, setImageMode] = useState("upload"); // "upload" | "url"
  const [imageFile, setImageFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const fileInputRef = useRef(null);

  const clearSelectedFile = () => {
    setImageFile(null);
    setFilePreview((current) => {
      if (current) URL.revokeObjectURL(current);
      return "";
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      clearSelectedFile();
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      clearSelectedFile();
      setStatus({ type: "error", message: "Only JPG, PNG or WEBP images are allowed." });
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      clearSelectedFile();
      setStatus({
        type: "error",
        message: `Image is ${(file.size / 1024).toFixed(0)} KB. Maximum allowed size is ${MAX_IMAGE_KB} KB — please choose a smaller image.`,
      });
      return;
    }

    setStatus({ type: "", message: "" });
    setFilePreview((current) => {
      if (current) URL.revokeObjectURL(current);
      return URL.createObjectURL(file);
    });
    setImageFile(file);
  };

  const loadSlides = async () => {
    setLoading(true);
    try {
      // The backend must protect this admin endpoint with its admin middleware.
      const response = await api.get(`${NEWS_SLIDES_URL}/admin`);
      setSlides(normalizeSlides(response.data));
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Slider items could not be loaded. Check admin login and API settings.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSlides();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setImageMode("upload");
    clearSelectedFile();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    const usingUpload = imageMode === "upload";
    if (usingUpload && !imageFile && !(editingId && form.imageUrl)) {
      setStatus({ type: "error", message: "Please choose an image to upload (max 200 KB)." });
      return;
    }
    if (!usingUpload && !form.imageUrl.trim()) {
      setStatus({ type: "error", message: "Please enter an image URL." });
      return;
    }

    setSaving(true);

    const payload = {
      ...form,
      sortOrder: Number(form.sortOrder) || 0,
      title: form.title.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
      alt: form.alt.trim() || form.title.trim(),
    };

    // A newly chosen file is sent as multipart form data; otherwise plain JSON.
    let body = payload;
    if (usingUpload && imageFile) {
      body = new FormData();
      body.append("title", payload.title);
      body.append("category", payload.category);
      body.append("description", payload.description);
      body.append("alt", payload.alt);
      body.append("sortOrder", String(payload.sortOrder));
      body.append("isActive", String(payload.isActive));
      body.append("image", imageFile);
    }

    try {
      if (editingId) {
        await api.put(`${NEWS_SLIDES_URL}/admin/${editingId}`, body);
        setStatus({ type: "success", message: "Slider item updated successfully." });
      } else {
        await api.post(`${NEWS_SLIDES_URL}/admin`, body);
        setStatus({ type: "success", message: "New slider item added successfully." });
      }

      resetForm();
      await loadSlides();
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Could not save this item. Please check the details and try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (slide) => {
    setEditingId(slide._id || slide.id);
    setForm({
      title: slide.title || "",
      category: slide.category || "",
      description: slide.description || "",
      imageUrl: slide.imageUrl || slide.image || "",
      alt: slide.alt || slide.title || "",
      sortOrder: slide.sortOrder ?? 0,
      isActive: slide.isActive !== false,
    });
    setImageMode("upload");
    clearSelectedFile();
    setStatus({ type: "", message: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (slide) => {
    const id = slide._id || slide.id;
    const confirmed = window.confirm(
      `Delete “${slide.title || "this slider item"}”? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await api.delete(`${NEWS_SLIDES_URL}/admin/${id}`);
      setSlides((current) => current.filter((item) => (item._id || item.id) !== id));
      if (editingId === id) resetForm();
      setStatus({ type: "success", message: "Slider item deleted." });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Could not delete this item. Please try again.",
      });
    }
  };

  const handleToggleActive = async (slide) => {
    const id = slide._id || slide.id;
    try {
      const updated = { ...slide, isActive: slide.isActive === false };
      await api.put(`${NEWS_SLIDES_URL}/admin/${id}`, { isActive: updated.isActive });
      setSlides((current) =>
        current.map((item) =>
          (item._id || item.id) === id ? { ...item, isActive: updated.isActive } : item
        )
      );
      setStatus({
        type: "success",
        message: updated.isActive ? "Slider item is now visible." : "Slider item is now hidden.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Could not change visibility. Please try again.",
      });
    }
  };

  return (
    <section className="news-admin-page">
      <header className="news-admin-header">
        <div>
          <span className="news-admin-eyebrow">WEBSITE CONTENT</span>
          <h1>About Astrology Slider</h1>
          <p>Add, edit, hide or remove the cards shown on the public website.</p>
        </div>
        <button type="button" className="news-admin-refresh" onClick={loadSlides}>
          Refresh list
        </button>
      </header>

      {status.message && (
        <div className={`news-admin-status news-admin-status--${status.type}`} role="status">
          {status.message}
        </div>
      )}

      <section className="news-admin-panel">
        <div className="news-admin-panel-heading">
          <h2>{editingId ? "Edit slider item" : "Add a slider item"}</h2>
          {editingId && (
            <button type="button" className="news-admin-cancel" onClick={resetForm}>
              Cancel edit
            </button>
          )}
        </div>

        <form className="news-admin-form" onSubmit={handleSubmit}>
          <label>
            Title <span>*</span>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. A Moment of Spiritual Study"
              maxLength={120}
              required
            />
          </label>

          <label>
            Category
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g. Spiritual Practice"
              maxLength={60}
            />
          </label>

          <div className="news-admin-full news-admin-image-field">
            <span className="news-admin-field-label">
              Image <span>*</span>
            </span>

            <div className="news-admin-mode-toggle" role="tablist">
              <button
                type="button"
                className={imageMode === "upload" ? "is-active" : ""}
                onClick={() => setImageMode("upload")}
              >
                Upload from device
              </button>
              <button
                type="button"
                className={imageMode === "url" ? "is-active" : ""}
                onClick={() => setImageMode("url")}
              >
                Image URL
              </button>
            </div>

            {imageMode === "upload" ? (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                />
                <small>
                  JPG, PNG or WEBP only. Maximum size {MAX_IMAGE_KB} KB.
                  {editingId && !imageFile && " Leave empty to keep the current image."}
                </small>
              </>
            ) : (
              <>
                <input
                  type="url"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/your-image.jpg"
                />
                <small>Use a publicly accessible image URL.</small>
              </>
            )}
          </div>

          {(imageMode === "upload" ? filePreview || (editingId && form.imageUrl) : form.imageUrl) && (
            <div className="news-admin-preview news-admin-full">
              <span>
                {imageMode === "upload" && filePreview ? "New image preview" : "Image preview"}
              </span>
              <img
                src={imageMode === "upload" ? filePreview || form.imageUrl : form.imageUrl}
                alt="Slider preview"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
                onLoad={(event) => {
                  event.currentTarget.style.display = "block";
                }}
              />
            </div>
          )}

          <label className="news-admin-full">
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write a short description for the image..."
              rows={4}
              maxLength={500}
            />
          </label>

          <label>
            Image alt text
            <input
              name="alt"
              value={form.alt}
              onChange={handleChange}
              placeholder="Describe the image for accessibility"
              maxLength={180}
            />
          </label>

          <label>
            Display order
            <input
              type="number"
              name="sortOrder"
              value={form.sortOrder}
              onChange={handleChange}
              min="0"
              step="1"
            />
          </label>

          <label className="news-admin-checkbox news-admin-full">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            Show this item on the public slider
          </label>

          <div className="news-admin-actions news-admin-full">
            <button type="submit" disabled={saving} className="news-admin-save">
              {saving ? "Saving..." : editingId ? "Save changes" : "Add to slider"}
            </button>
            {editingId && (
              <button type="button" className="news-admin-secondary" onClick={resetForm}>
                Clear form
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="news-admin-list-section">
        <div className="news-admin-list-heading">
          <h2>Slider items</h2>
          <span>{slides.length} total</span>
        </div>

        {loading ? (
          <p className="news-admin-empty">Loading slider items...</p>
        ) : slides.length === 0 ? (
          <p className="news-admin-empty">No slider items yet. Add the first item above.</p>
        ) : (
          <div className="news-admin-list">
            {slides.map((slide) => {
              const id = slide._id || slide.id;
              return (
                <article className="news-admin-item" key={id}>
                  <img
                    src={slide.imageUrl || slide.image}
                    alt={slide.alt || slide.title || "Slider item"}
                    className="news-admin-item-image"
                  />
                  <div className="news-admin-item-info">
                    <span className="news-admin-item-category">{slide.category || "Uncategorized"}</span>
                    <h3>{slide.title}</h3>
                    <p>{slide.description || "No description"}</p>
                    <span className={`news-admin-badge ${slide.isActive === false ? "is-hidden" : "is-visible"}`}>
                      {slide.isActive === false ? "Hidden" : "Visible on website"}
                    </span>
                  </div>
                  <div className="news-admin-item-actions">
                    <button type="button" onClick={() => handleEdit(slide)}>Edit</button>
                    <button type="button" onClick={() => handleToggleActive(slide)}>
                      {slide.isActive === false ? "Show" : "Hide"}
                    </button>
                    <button type="button" className="delete" onClick={() => handleDelete(slide)}>Delete</button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </section>
  );
};

export default NewsSliderAdmin;
