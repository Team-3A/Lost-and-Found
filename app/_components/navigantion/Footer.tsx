import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-30 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-1.5 rounded-md">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-600">
                Sentinel Trace
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-6 max-w-xs leading-relaxed">
              Алдагдсан болон олдсон эд зүйлсийг хялбар мэдэгдэж, олоход туслах.
              Олон нийтийг холбож, эд зүйлсийг эргүүлэн олгоно.
            </p>
            <div className="flex space-x-5">
              <a
                href="https://www.facebook.com/"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Sentinel Trace</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Нүүр
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Ангилал
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Зүйл илгээх
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Холбоо барих
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Нөөц мэдээлэл</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Бидний тухай
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Хэрхэн ажилладаг вэ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Түгээмэл асуулт
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Хууль эрх зүй</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Нууцлалын бодлого
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Үйлчилгээний нөхцөл
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-16 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2025 Sentinel Trace. Бүх эрх хуулиар хамгаалагдсан.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
