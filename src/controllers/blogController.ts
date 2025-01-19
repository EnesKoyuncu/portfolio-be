import { Request, Response } from "express";
import Blog from "../models/blogModel";

// Tüm blog yazılarını getir
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
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
