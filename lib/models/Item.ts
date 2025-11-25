import { Schema, model, models } from "mongoose";
export type ItemSchemaType = {
  title: string;
  description: string;
  category: string;
  location: string;
  date: Date;
  imageUrl: string;
  email: string;
  phone: number;
};
const ItemSchema = new Schema({
  type: { type: String, enum: ["lost", "found"], required: true },
  title: String,
  description: String,
  category: String,
  location: String,
  date: Date,
  imageUrl: String,
  email: String,
  phone: Number,
  createdAt: { type: Date, default: Date.now },
});

export default models.Item || model("Item", ItemSchema);
