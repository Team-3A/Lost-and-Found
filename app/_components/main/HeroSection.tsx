import { Input } from "@/components/ui/input";
import Link from "next/link";
import Card from "./Card";

export default async function HeroSection() {
  return (
    <div>
      <div className=" bg-linear-to-b from-sky-100 via-blue-300 to-white ">
        <section className="w-full py-20">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Алдагдсан зүйлээ олж, олдсон зүйлсээ эзэнд нь хүргэе
            </h1>
            <p className="text-gray-800 max-w-xl mx-auto">
              Бусад хүмүүстэй холбогдож, үнэ цэнтэй эд зүйлсээ буцаан олж,
              сэтгэл амар байх боломжийг бүрдүүлээрэй.
            </p>

            <div>
              <Input
                placeholder="Search lost/found items..."
                className="max-w-[570px] text-[14px] pl-10 border-[#E1E1FF] border-solid rounded-md mt-30 bg-white h-10"
              ></Input>
            </div>

            <div className="flex items-center gap-3  mt-10 justify-center">
              <Link
                href="/report-lost"
                className="flex items-center max-w-50 h-11 pl-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow"
              >
                <div className="flex pr-3">
                  <img
                    src="add.png"
                    alt="Lost Item"
                    className="object-cover rounded w-5 h-5 mt-2"
                  />

                  <span className="ml-3 font-semibold text-sm ">
                    Алдагдсан зүйл бүртгэх
                  </span>
                </div>
              </Link>

              <Link
                href="/report-found"
                className="px-4 py-2 w-[200px] h-11 pt-3  rounded-lg border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50 transition bg-white"
              >
                Олсон зүйл бүртгэх
              </Link>
            </div>
          </div>
        </section>
      </div>
      <div className="w-full h-auto bg-white mx-auto flex flex-col gap-10">
        <h1 className="sm:text-3xl md:text-4xl flex justify-center items-center font-semibold  mt-20">
          Саяхан олдсон ба алдагдсан эд зүйлс
        </h1>

        <Card />
      </div>
    </div>
  );
}
