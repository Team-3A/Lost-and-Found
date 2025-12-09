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
}) => {
  await connectDB();
  const newItem = new Item({ ...itemData });
  await newItem.save();
  return newItem;
};
// import Item from "../models/Item";
// import { connectDB } from "../mongodb";
// import { algoliaIndex } from "../algolia";

// export const createItem = async (itemData: {
//   type: string;
//   title: string;
//   desc: string;
//   category: string;
//   location: string;
//   phone: number;
//   email: string;
//   imageUrl: string;
// }) => {
//   await connectDB();

//   const newItem = new Item({ ...itemData });
//   await newItem.save();

//   await algoliaIndex.saveObject({
//     objectID: newItem._id.toString(),
//     title: newItem.title,
//     desc: newItem.desc,
//     category: newItem.category,
//     location: newItem.location,
//     phone: newItem.phone,
//     email: newItem.email,
//     imageUrl: newItem.imageUrl,
//     type: newItem.type,
//     createdAt: newItem.createdAt,
//   });

//   return newItem;
// };
