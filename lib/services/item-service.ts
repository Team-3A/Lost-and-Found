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
  image: string;
}) => {
  await connectDB();
  const newItem = new Item({ ...itemData });
  await newItem.save();
  return newItem;
};
