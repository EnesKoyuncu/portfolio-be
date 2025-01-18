import mongoose, { Schema, Document } from "mongoose";

export interface ITimeline extends Document {
  component: string; // Örneğin "about"
  language: string; // Örneğin "en", "tr", "de"
  date: string; // Tarih bilgisi, "2022 - 2023"
  icon: string; // "graduation" veya "briefcase"
  title: string; // Başlık
  subtitle: string; // Alt başlık
  description?: string; // Açıklama (isteğe bağlı)
}

const timelineSchema: Schema = new Schema({
  component: { type: String, required: true },
  language: { type: String, required: true },
  date: { type: String, required: true },
  icon: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String },
});

const Timeline = mongoose.model<ITimeline>("Timeline", timelineSchema);

export default Timeline;
