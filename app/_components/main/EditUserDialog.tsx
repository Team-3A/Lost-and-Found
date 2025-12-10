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

type EditUserDialogProps = {
  id: string;
};

export const EditUserDialog = ({ id }: EditUserDialogProps) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [phone, setPhone] = useState<number | string>("");
  const [image, setImage] = useState<File | null>(null);

  // Load existing item
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/items/${id}`);
      const data = await res.json();

      setTitle(data.title);
      setDesc(data.desc);
      setPhone(data.phone);
    }
    load();
  }, [id]);

  // --- Handlers ---
  const titleChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const descChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setDesc(e.target.value);

  const phoneChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setPhone(e.target.value);

  const imageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  // --- PATCH update ---
  const editItemHandler = async () => {
    const form = new FormData();

    form.append("title", title);
    form.append("desc", desc);
    form.append("phone", phone.toString());
    if (image) form.append("image", image);

    const res = await fetch(`/api/items/${id}`, {
      method: "PATCH",
      body: form,
    });

    if (!res.ok) return alert("Failed to update item");

    alert("Item updated!");
    window.location.reload();
  };

  // --- DELETE item ---
  const deleteItemHandler = async () => {
    const res = await fetch(`/api/items/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) return alert("Failed to delete");

    alert("Deleted successfully!");
    window.location.reload();
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

        <div className="flex gap-4 justify-between h-36">
          <Label>Image</Label>
          <Input
            type="file"
            className="w-[288px]"
            onChange={imageChangeHandler}
          />
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            className="bg-white border border-red-500"
            onClick={deleteItemHandler}
          >
            <Trash color="red" />
          </Button>

          <Button onClick={editItemHandler}>Save changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
