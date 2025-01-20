import { Request, Response } from "express";
import Blog from "../models/blogModel";

// Tüm blog yazılarını getir (Dil desteği eklenmiş)
export const getBlogs = async (req: Request, res: Response) => {
  const { language } = req.query; // Dil sorgusunu al
  try {
    let blogs;
    if (language) {
      blogs = await Blog.find().select(
        `title.${language} summary.${language} content.${language} date keywords image`
      );
    } else {
      blogs = await Blog.find(); // Tüm dilleri getir
    }
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
};

// Yeni bir blog yazısı ekle
export const createBlog = async (req: Request, res: Response) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ success: false, message: "Failed to create blog" });
  }
};
