import express from "express";
import { getProjects, createProject } from "../controllers/projectController";

const router = express.Router();

// Projeleri getir
router.get("/", getProjects);

// Yeni proje oluştur (isteğe bağlı)
router.post("/", createProject);

export default router;
