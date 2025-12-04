import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    clerkId: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    name: { type: String },
    profileImage: { type: String },
    phoneNumber: { type: String },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", UserSchema);
export default User;
