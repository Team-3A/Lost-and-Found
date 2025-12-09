import { connectDB } from "../mongodb";
import Item from "../models/Item";

export async function getItemsByCategory(category:string){
    await connectDB();

    const items = await Item.find({category})
    .sort({createdAt: -1 })
    .lean()

    return items
}