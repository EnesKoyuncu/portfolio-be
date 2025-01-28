import express from "express";
import cors from "cors";
import mongoose from "mongoose";
require("dotenv").config();

import textRoutes from "./routes/textRoutes";
import aboutRoutes from "./routes/abouteRoutes";
import projectRoutes from "./routes/projectRoute";
import blogRoutes from "./routes/blogRoutes";

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

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something broke!" });
  }
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("✅ MongoDB bağlantısı başarılı!"))
  .catch((err) => {
    console.error("❌ MongoDB bağlantı hatası:", err);
    process.exit(1);
  });

// Start Server
app.listen(PORT, () =>
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
);
