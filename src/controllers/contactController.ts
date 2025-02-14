import { Request, Response } from "express";
import Contact from "../models/contactModel";

// POST: Yeni bir ilgi alanları dizisi ekle
export const addContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    const newInterests = new Contact({
      name,
      email,
      message,
    });
    await newInterests.save();
    res
      .status(201)
      .json({ success: true, message: "Current interests added!" });
  } catch (error) {
    console.error("Error adding current interests:", error);
    res.status(500).json({
      success: false,
      message: "Current interests could not be added.",
    });
  }
};

// GET: Belirli bir component ve dile ait ilgi alanlarını getir
export const getContactMessage = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, email } = req.params;
    const interests = await Contact.findOne({ name, email });
    if (!interests) {
      return res
        .status(404)
        .json({ success: false, message: "No interests found." });
    }
    res.status(200).json({ success: true, data: interests });
  } catch (error) {
    console.error("Error fetching current interests:", error);
    res.status(500).json({
      success: false,
      message: "Current interests could not be fetched.",
    });
  }
};
