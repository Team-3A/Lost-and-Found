import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function ReportLost() {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-8 py-10 flex flex-col items-center">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Report a Lost Item
        </h3>

        <div className=" max-w-4xl border rounded-md p-8 bg-white ">
          <h2 className="text-xl font-semibold mb-1">Item Details</h2>
          <span className="text-gray-500">
            Provide basic information about the found item.
          </span>

          <div className="mt-6">
            <h4 className="text-md font-medium">Item Title</h4>
            <Textarea
              className="mt-2"
              placeholder="e.g., Black Leather Wallet"
            />
          </div>

          <div className="mt-4">
            <h4 className="text-md font-medium">Description</h4>
            <Textarea
              className="mt-2"
              placeholder="Provide a detailed description of the item and its condition."
            />
          </div>

          <div className="mt-4">
            <h4 className="text-md font-medium">Category</h4>
            <div className="mt-2 ">
              <Select>
                <SelectTrigger className="w-[455px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className=" max-w-4xl border rounded-md p-8 bg-white mt-6">
          <h2 className="text-xl font-semibold mb-1">Location Information</h2>
          <input
            placeholder="e.g., Central Park, Main Street Cafe"
            className="w-full"
          ></input>
          <div className="mt-3">
            <h3 className="text-black">Lost location </h3>
            <img className="-mt-3 w-[472px] -ml-5" src="map.png" />
            <Textarea placeholder="e.g., Main Street Park, near fountain"></Textarea>
          </div>
        </div>

        <div className=" max-w-4xl border rounded-md p-8 bg-white mt-5 ">
          <h2 className="text-xl font-semibold mb-1">Upload Photo</h2>
          <span className="text-gray-500">
            Add a photo of your llost item optional but recommended
          </span>
          <div className="mt-3">
            <input
              type="file"
              placeholder="enter your image"
              className=" border rounded-md w-[455px] pl-5 h-8"
            ></input>
          </div>
        </div>

        <div className="w-[520px] border rounded-md p-8 bg-white mt-5">
          <h2 className="text-xl font-semibold mb-1">Contact Information</h2>
          <span className="text-gray-500">
            How can others reach you if your item is found?
          </span>

          <div className="flex gap-4 mt-4">
            <div className="flex-1 flex flex-col">
              <label className="font-semibold mb-1" htmlFor="email">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="font-semibold mb-1" htmlFor="phone">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (123) 456-7890"
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
