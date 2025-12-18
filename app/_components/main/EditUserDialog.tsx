"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pen, Trash } from "lucide-react";
import { set } from "mongoose";

export const EditUserDialog = ({
  id,
  refetchItems,
}: {
  id: string;
  refetchItems: () => Promise<void>;
}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [phone, setPhone] = useState<number | string>("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imageUrl, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setDesc(data.desc);
        setPhone(data.phone);
        setCategory(data.category);
        setLocation(data.location);
        setEmail(data.email);
        setImage(data.imageUrl);
        setType(data.type);
      });
  }, [id]);

  const titleChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const descChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setDesc(e.target.value);

  const phoneChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setPhone(e.target.value);

  const categoryChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setCategory(e.target.value);

  const locationChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setLocation(e.target.value);
  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const imageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setNewImage(e.target.files[0]);
  };
  const typeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const editItemHandler = async (id: string) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("type", type);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("email", email);
    formData.append("phone", String(phone));

    if (newImage) {
      formData.append("image", newImage);
    } else formData.append("oldImageUrl", imageUrl || "");

    const res = await fetch(`/api/items`, {
      method: "PATCH",
      body: formData,
    });

    if (!res.ok) return alert("Failed to update item");

    alert("Item updated!");
    window.location.reload();
  };

  const deleteItemHandler = async (id: string) => {
    await fetch("/api/items", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    await refetchItems();
  };

  return (
    <Dialog>
      <DialogTrigger className="rounded-full bg-white border w-11 h-11 flex justify-center items-center cursor-pointer">
        <Pen className="w-4 h-4" color="red" />
      </DialogTrigger>

      <DialogContent className="max-w-[472px] p-6">
        <DialogHeader>
          <DialogTitle>Edit item</DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 justify-between">
          <Label>Title</Label>
          <Input
            className="w-[288px]"
            value={title}
            onChange={titleChangeHandler}
          />
        </div>

        <div className="flex gap-4 justify-between">
          <Label>Description</Label>
          <Input
            className="w-[288px]"
            value={desc}
            onChange={descChangeHandler}
          />
        </div>

        <div className="flex gap-4 justify-between">
          <Label>Phone</Label>
          <Input
            type="number"
            className="w-[288px]"
            value={phone}
            onChange={phoneChangeHandler}
          />
        </div>
        <div className="flex gap-4 justify-between">
          <Label>Category</Label>
          <Input
            className="w-[288px]"
            value={category}
            onChange={categoryChangeHandler}
          />
        </div>
        <div className="flex gap-4 justify-between">
          <Label>Location</Label>
          <Input
            className="w-[288px]"
            value={location}
            onChange={locationChangeHandler}
          />
        </div>
        <div className="flex gap-4 justify-between">
          <Label>Email</Label>
          <Input
            className="w-[288px]"
            value={email}
            onChange={emailChangeHandler}
          />
        </div>
        <div className="flex gap-4 justify-between">
          <Label>Type</Label>
          <Input
            className="w-[288px]"
            value={type}
            onChange={typeChangeHandler}
          />
        </div>
        <div className="flex gap-4 justify-between">
          <Label>Image</Label>
          <Input
            className="w-[288px]"
            value={imageUrl}
            onChange={imageChangeHandler}
          />
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            className="bg-white border border-red-500"
            onClick={() => deleteItemHandler(id)}
          >
            <Trash color="red" />
          </Button>

          <Button onClick={() => editItemHandler(id)} type="submit">
            Save changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
