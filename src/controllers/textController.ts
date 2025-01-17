import { Request, Response } from "express";
import Text from "../models/textModel";

// GET: Tüm textleri getir
export const getAllTexts = async (req: Request, res: Response) => {
  try {
    const texts = await Text.find(); // Veritabanından tüm verileri getir
    res.status(200).json({ success: true, data: texts });
  } catch (error) {
    console.error("Error fetching texts:", error);
    res.status(500).json({ success: false, message: "Veriler getirilemedi." });
  }
};

// GET: Belirli bir component'e ait textleri getir
export const getTextsByComponent = async (req: Request, res: Response) => {
  try {
    const { component } = req.params;
    const texts = await Text.find({ component }); // Belirli bir component'e göre filtrele
    res.status(200).json({ success: true, data: texts });
  } catch (error) {
    console.error("Error fetching component texts:", error);
    res.status(500).json({ success: false, message: "Veriler getirilemedi." });
  }
};

export const addText = async (req: Request, res: Response) => {
  try {
    const { component, key, translations } = req.body;
    const newText = new Text({ component, key, translations });
    await newText.save(); // MongoDB'ye kaydet
    res.status(201).json({
      success: true,
      message: "Text başarıyla kaydedildi!",
      data: newText,
    });
  } catch (error) {
    console.error("Veri kaydedilemedi:", error);
    res.status(500).json({ success: false, message: "Text kaydedilemedi." });
  }
};

// Diğer işlemler burada tanımlanabilir (create, update, delete gibi).
