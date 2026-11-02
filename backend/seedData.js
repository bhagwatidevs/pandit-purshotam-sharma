require("dotenv").config();
const mongoose = require("mongoose");
const Blog = require("./models/Blog");
const Product = require("./models/Product");
const Photo = require("./models/Photo");

// Sample data
const sampleBlogs = [
  {
    name: "Pandit Purshotam Gaur",
    title: "Understanding Your Birth Chart",
    contentType: "article",
    category: "Astrology Basics",
    description: "Learn how to read and interpret your birth chart for better life insights.",
    imageUrl: "https://res.cloudinary.com/dl65hiwyr/image/upload/v1/astrology/blog1.jpg"
  },
  {
    name: "Pandit Purshotam Gaur", 
    title: "Planetary Remedies for Success",
    contentType: "article",
    category: "Remedies",
    description: "Discover powerful planetary remedies to overcome obstacles and achieve success.",
    imageUrl: "https://res.cloudinary.com/dl65hiwyr/image/upload/v1/astrology/blog2.jpg"
  }
];

const sampleProducts = [
  {
    name: "Rudraksha Mala",
    price: 1500,
    oldprice: 2000,
    role: "Spiritual Protection",
    imageUrl: "https://res.cloudinary.com/dl65hiwyr/image/upload/v1/astrology/rudraksha.jpg"
  },
  {
    name: "Gemstone Ring",
    price: 5000,
    oldprice: 7000,
    role: "Planetary Remedy",
    imageUrl: "https://res.cloudinary.com/dl65hiwyr/image/upload/v1/astrology/gemstone.jpg"
  },
  {
    name: "Yantra Set",
    price: 2500,
    oldprice: 3500,
    role: "Energy Enhancement",
    imageUrl: "https://res.cloudinary.com/dl65hiwyr/image/upload/v1/astrology/yantra.jpg"
  },
  {
    name: "Puja Kit",
    price: 1200,
    oldprice: 1800,
    role: "Ritual Essentials",
    imageUrl: "https://res.cloudinary.com/dl65hiwyr/image/upload/v1/astrology/puja.jpg"
  }
];

const samplePhotos = [
  {
    imageUrl: "https://res.cloudinary.com/dl65hiwyr/image/upload/v1/astrology/gallery1.jpg"
  },
  {
    imageUrl: "https://res.cloudinary.com/dl65hiwyr/image/upload/v1/astrology/gallery2.jpg"
  },
  {
    imageUrl: "https://res.cloudinary.com/dl65hiwyr/image/upload/v1/astrology/gallery3.jpg"
  },
  {
    imageUrl: "https://res.cloudinary.com/dl65hiwyr/image/upload/v1/astrology/gallery4.jpg"
  }
];

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Blog.deleteMany({});
    await Product.deleteMany({});
    await Photo.deleteMany({});
    
    console.log("🗑️ Cleared existing data");

    // Insert sample data
    await Blog.insertMany(sampleBlogs);
    await Product.insertMany(sampleProducts);
    await Photo.insertMany(samplePhotos);
    
    console.log("✅ Sample data inserted successfully");
    console.log(`📝 Blogs: ${sampleBlogs.length}`);
    console.log(`🛍️ Products: ${sampleProducts.length}`);
    console.log(`📸 Photos: ${samplePhotos.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seedData();