import Item from "../models/Item";
import { connectDB } from "../mongodb";

export const createItem = async (itemData: {
  type: string;
  title: string;
  desc: string;
  category: string;
  location: string;
  phone: number;
  email: string;
  imageUrl: string;
  clerkId: string;
  date?: Date;
}) => {
  await connectDB();
  const newItem = new Item({ ...itemData });
  await newItem.save();
  return newItem;
};
