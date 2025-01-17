import mongoose, { Schema, Document, Model } from "mongoose";

// Text verisi için bir şema tanımlıyoruz
interface IText extends Document {
  component: string;
  key: string;
  translations: {
    en: string;
    tr: string;
    de?: string; // Opsiyonel
  };
}

const textSchema = new Schema<IText>({
  component: { type: String, required: true },
  key: { type: String, required: true },
  translations: {
    en: { type: String, required: true },
    tr: { type: String, required: true },
    de: { type: String }, // İsteğe bağlı
  },
});

const Text: Model<IText> = mongoose.model<IText>("Text", textSchema);

export default Text;
