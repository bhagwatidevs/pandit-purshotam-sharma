const Contact = require("../models/Contact");
const sendMail = require("../utils/sendMail");

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);

exports.submitContactForm = async (req, res) => {
  try {
    const name = String(req.body?.name || "").trim();
    const email = String(req.body?.email || "").trim().toLowerCase();
    const phone = String(req.body?.phone || "").trim();
    const message = String(req.body?.message || "").trim();

    const fieldErrors = {};
    if (name.length < 2) fieldErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fieldErrors.email = "Please provide a valid email address.";
    }
    if (message.length < 5) fieldErrors.message = "Please enter a message of at least 5 characters.";

    if (Object.keys(fieldErrors).length) {
      return res.status(400).json({
        error: "Validation failed",
        fieldErrors,
        message: "Please check the form fields.",
      });
    }

    const contact = await Contact.create({ name, email, phone, message });
    let emailSent = true;

    try {
      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safePhone = escapeHtml(phone || "N/A");
      const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

      if (process.env.ADMIN_EMAIL && process.env.BREVO_API_KEY) {
        await Promise.all([
          sendMail(
            process.env.ADMIN_EMAIL,
            `New Contact Form Submission from ${safeName}`,
            `<h3>New Contact Form Submission</h3>
             <p><strong>Name:</strong> ${safeName}</p>
             <p><strong>Email:</strong> ${safeEmail}</p>
             <p><strong>Phone:</strong> ${safePhone}</p>
             <p><strong>Message:</strong><br/>${safeMessage}</p>`
          ),
          sendMail(
            email,
            "We have received your query",
            `<h2>Hi ${safeName},</h2>
             <p>Thank you for contacting Pandit Purshotam Gaur. We have received your message and will get back to you soon.</p>`
          ),
        ]);
      } else {
        emailSent = false;
      }
    } catch (mailError) {
      emailSent = false;
      console.error("Contact email notification failed:", mailError.message || mailError);
    }

    return res.status(201).json({
      success: true,
      message: emailSent
        ? "Contact form submitted successfully. We will get back to you soon."
        : "Your inquiry was saved successfully. Email notification is not configured yet.",
      emailSent,
      id: contact._id,
    });
  } catch (error) {
    console.error("Contact form submission failed:", error.message || error);
    return res.status(500).json({ error: "Something went wrong while saving your inquiry." });
  }
};

exports.getAllContacts = async (_req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Fetch contacts failed:", error.message || error);
    return res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const Contact = require("../models/Contact");
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    const name = req.body?.name === undefined ? contact.name : String(req.body.name).trim();
    const email = req.body?.email === undefined ? contact.email : String(req.body.email).trim().toLowerCase();
    const phone = req.body?.phone === undefined ? contact.phone : String(req.body.phone).trim();
    const message = req.body?.message === undefined ? contact.message : String(req.body.message).trim();

    if (!name || name.length < 2) return res.status(400).json({ message: "Please enter a valid name." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "")) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }
    if (!message || message.length < 5) return res.status(400).json({ message: "Message must be at least 5 characters long." });

    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    contact.message = message;
    await contact.save();

    return res.json({ success: true, contact, message: "Inquiry updated successfully." });
  } catch (error) {
    console.error("Update contact failed:", error.message || error);
    return res.status(500).json({ message: "Failed to update inquiry." });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    return res.status(200).json({ message: "Contact deleted successfully!" });
  } catch (error) {
    console.error("Delete contact failed:", error.message || error);
    return res.status(500).json({ error: "Failed to delete contact" });
  }
};
