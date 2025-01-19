import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import textRoutes from "./routes/textRoutes";
import aboutRoutes from "./routes/abouteRoutes";
import projectRoutes from "./routes/projectRoute";
import blogRoutes from "./routes/blogRoutes";

// 🌐 MongoDB Bağlantısı
const mongoURI =
  "mongodb+srv://eneskoyuncu5507:eneskoyuncu5507@portfoliocluster.8d1tw.mongodb.net/?retryWrites=true&w=majority&appName=PortfolioCluster";
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB bağlantısı başarılı!"))
  .catch((err) => console.error("❌ MongoDB bağlantı hatası:", err));

const app = express();
const PORT = process.env.PORT || 5000;

// 🔥 Middleware'ler
app.use(cors());
app.use(express.json());

// 📌 Text Routes
app.use("/api/texts", textRoutes);

app.use("/api/about", aboutRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/blogs", blogRoutes);
// 🌐 Sunucu Başlat
app.listen(PORT, () =>
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
);
