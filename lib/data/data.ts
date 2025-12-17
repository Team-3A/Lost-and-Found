import {
  Wallet,
  Smartphone,
  Briefcase,
  Key,
  Laptop,
  FileText,
  Shirt,
  Gem,
  PawPrint,
  Box,
} from "lucide-react";

export const categories = [
  {
    name: "Түрийвч",
    href: "/categories/wallet",
    icon: Wallet,
    description: "Алдагдсан түрийвч, хэтэвч",
  },
  {
    name: "Утас",
    href: "/categories/phone",
    icon: Smartphone,
    description: "Утас, таблет",
  },
  {
    name: "Цүнх",
    href: "/categories/bag",
    icon: Briefcase,
    description: "Цүнх, ачаа",
  },
  {
    name: "Түлхүүр",
    href: "/categories/keys",
    icon: Key,
    description: "Гэр болон машин түлхүүр",
  },
  {
    name: "Цахилгаан хэрэгсэл",
    href: "/categories/electronics",
    icon: Laptop,
    description: "Гаджет, төхөөрөмж",
  },
  {
    name: "Баримт бичиг",
    href: "/categories/documents",
    icon: FileText,
    description: "Иргэний үнэмлэх, бичиг баримт",
  },
  {
    name: "Хувцас",
    href: "/categories/clothes",
    icon: Shirt,
    description: "Хувцас, дагалдах хэрэгсэл",
  },
  {
    name: "Гоёл чимэглэл",
    href: "/categories/jewelry",
    icon: Gem,
    description: "Цаг, бөгж, ээмэг",
  },
  {
    name: "Амьтан",
    href: "/categories/pet",
    icon: PawPrint,
    description: "Алдагдсан амьтан",
  },
  {
    name: "Бусад",
    href: "/categories/others",
    icon: Box,
    description: "Бусад төрөл",
  },
];
