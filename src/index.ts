import express from "express";
import cors from "cors";
import mongoose from "mongoose";
require("dotenv").config();

import textRoutes from "./routes/textRoutes";
import aboutRoutes from "./routes/abouteRoutes";
import projectRoutes from "./routes/projectRoute";
import blogRoutes from "./routes/blogRoutes";

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("❌ MONGODB_URI is not defined in environment variables");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB bağlantısı başarılı!"))
  .catch((err) => console.error("❌ MongoDB bağlantı hatası:", err));

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/texts", textRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);

// Start Server
app.listen(PORT, () =>
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
);
