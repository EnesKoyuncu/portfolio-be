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

// Component ve dile göre textleri getir

export const getTextsByComponentAndLang = async (
  req: Request<{ component: string; language: string }>,
  res: Response
): Promise<any> => {
  try {
    const { component, language } = req.params;
    // Component ve dile göre filtrele
    const texts = await Text.find(
      {
        component, // Belirli bir component'i filtrele
        [`translations.${language}`]: { $exists: true }, // İstenen dilde çeviri varsa kontrol et
      },
      {
        key: 1, // Sadece key değerini getir
        [`translations.${language}`]: 1, // Sadece istenen dildeki çeviriyi getir
      }
    );

    console.log("Fetched texts from DB:", texts);

    if (!texts || texts.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Component '${component}' için dil '${language}' bulunamadı.`,
      });
    }

    // Gelen veriyi düzenliyoruz
    // const translations = texts.reduce((acc: Record<string, string>, text) => {
    //   type LanguageKeys = "en" | "tr" | "de";
    //   const language: LanguageKeys = "en";
    //   acc[text.key] = text.translations[language];
    //   console.log(acc);
    //   return acc;
    // }, {});

    const translations = texts.reduce((acc: Record<string, string>, text) => {
      const translation =
        text.translations[language as keyof typeof text.translations];
      if (translation) {
        acc[text.key] = translation;
      }
      return acc;
    }, {});

    return res.status(200).json({
      success: true,
      translations,
    });
  } catch (error) {
    console.error("Veritabanı hatası:", error);
    return res.status(500).json({
      success: false,
      message: "Bir hata oluştu. Lütfen tekrar deneyin.",
    });
  }
};
// Diğer işlemler burada tanımlanabilir (create, update, delete gibi).
