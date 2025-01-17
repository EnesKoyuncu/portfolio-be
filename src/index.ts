import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import textRoutes from "./routes/textRoutes";

// 🌐 MongoDB Bağlantısı
const mongoURI =
  "mongodb+srv://eneskoyuncu5507:eneskoyuncu5507@portfoliocluster.mongodb.net/portfolio?retryWrites=true&w=majority";
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

// 🌐 Sunucu Başlat
app.listen(PORT, () =>
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
);
