import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: {
    en: string;
    tr: string;
    de: string;
  };
  date: Date;
  summary: {
    en: string;
    tr: string;
    de: string;
  };
  keywords: string[];
  image: string;
  content: {
    en: string;
    tr: string;
    de: string;
  };
}

const BlogSchema: Schema = new Schema({
  title: {
    en: { type: String, required: true },
    tr: { type: String, required: true },
    de: { type: String, required: true },
  },
  date: { type: Date, required: true },
  summary: {
    en: { type: String, required: true },
    tr: { type: String, required: true },
    de: { type: String, required: true },
  },
  keywords: [{ type: String, required: true }],
  image: { type: String, required: true },
  content: {
    en: { type: String, required: true },
    tr: { type: String, required: true },
    de: { type: String, required: true },
  },
});

export default mongoose.model<IBlog>("Blog", BlogSchema);
