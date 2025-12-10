import mongoose, { Schema } from "mongoose";
export type ItemSchemaType = {
  type: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: Date;
  imageUrl: string;
  email: string;
  phone: number;
  clerkId: string;
};
const ItemSchema = new Schema({
  type: { type: String, enum: ["lost", "found"], required: true },
  title: String,
  desc: String,
  category: String,
  location: String,
  date: Date,
  imageUrl: String,
  email: String,
  phone: Number,
  clerkId: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Item ||
  mongoose.model<ItemSchemaType>("Item", ItemSchema);
