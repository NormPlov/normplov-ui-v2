import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function FooterPage() {
  return (
    <footer className="border-t py-4   bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-4 ">
          {/* Logo and Description */}
          <div className="flex justify-center">
            <div className="space-y-4">
              <Link href="/" className="text-emerald-500 text-xl font-semibold">
                <Image src="/assets/logo.jpg" alt="Logo" width={1000} height={1000} className="lg:w-[60px] md:w-[50px] w-[40px] "></Image>
              </Link>
              <p className="text-textprimary block md:hidden lg:block text-md leading-relaxed">
                នាំផ្លូវ គឺជាគេហទំព័រដែលជួយឲ្យអ្នក
                ស្គាល់ខ្លួនឯងកាន់តែច្បាស់និងមាន ប្រសិទ្ធភាពក្នុងការចាប់យកអាជីពនា
                ពេលបច្ចុប្បន្ននិងអនាគត ។
              </p>
              <p className="text-textprimary hidden md:block lg:hidden text-md leading-relaxed">
                នាំផ្លូវ គឺជាគេហទំព័រដែលជួយឲ្យអ្នក
                ស្គាល់ខ្លួនឯងកាន់តែច្បាស់និងមាន ប្រសិទ្ធភាពក្នុងការចាប់យកអាជីពនា
                ពេលបច្ចប្បន្ននិងអនាគត ។
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-start md:justify-center lg:justify-center lg:mr-[80px] md:mr-0 mr-0 ">
            <div>
              <h3 className="font-semibold text-2xl mb-4 text-textprimary">
                មាតិការ
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/"
                    className="text-textprimary hover:text-emerald-500"
                  >
                    ទំព័រដើម
                  </Link>
                </li>
                <li>
                  <Link
                    href="/test"
                    className="text-textprimary hover:text-emerald-500"
                  >
                    តេស្ត
                  </Link>
                </li>
                <li>
                  <Link
                    href="/university"
                    className="text-textprimary hover:text-emerald-500"
                  >
                    គ្រឹស្ថានសិក្សា
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobs"
                    className="text-textprimary hover:text-emerald-500"
                  >
                    ការងារ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/policy"
                    className="text-textprimary hover:text-emerald-500"
                  >
                    ឯកជនភាព
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="text-textprimary hover:text-emerald-500"
                  >
                    អំពីយើង
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex justify-start md:justify-center lg:justify-center lg:mr-[80px] md:mr-0 mr-0">
            <div>
              <h3 className="font-semibold text-2xl mb-4 text-textprimary">
                ព័ត៌មានទំនាក់ទំនង
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-emerald-500 mt-1" />
                  <div>
                    <a href="tel:+855978443615" className="text-textprimary">
                      +855978443615
                    </a>
                    <p className="text-gray-500 text-sm">លេខទូរស័ព្ទ</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-emerald-500 mt-1" />
                  <div>
                    <a
                      href="mailto:normplov@gmail.com"
                      className="text-textprimary"
                    >
                      normplov@gmail.com
                    </a>
                    <p className="text-gray-500 text-sm">អ៉ីម៉ែល</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-emerald-500 mt-1" />
                  <div>
                    <a
                      href="https://www.google.com/maps/dir/11.5762226,104.9272048/11.5784119,104.90279/@11.5682273,104.900408,14z/data=!3m1!4b1!4m4!4m3!1m1!4e1!1m0?entry=ttu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-textprimary"
                    >
                      សង្កាត់បឹកកក់១ ខណ្ឌទួលគោក រាជធានីភ្នំពេញ
                    </a>
                    <p className="text-gray-500 text-sm">អាសយដ្ឋាន</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Partner Logos */}
          <div className="flex justify-start md:justify-center lg:justify-start lg:mr-[80px] md:mr-0 mr-0  w-full">
            <div>
              <h3 className="font-semibold text-2xl mb-4 text-textprimary">
                ឧបត្ថម្ភដោយ
              </h3>
             
                <div className="space-y-4">
                  <Image
                    src="/assets/MPTC-logo.jpg"
                    alt="Partner logo 1"
                    width={1000}
                    height={1000}
                    className="object-contain w-40  "
                  />
                  <Image
                    src="/assets/CBRD-logo.jpg"
                    alt="Partner logo 2"
                    width={1000}
                    height={1000}
                    className="object-contain w-40 -ml-1"
                  />
                </div>
                <div className="space-y-4 mt-4">
                <h3 className="font-semibold text-2xl text-textprimary">
                រៀបចំដោយ
              </h3>
                <Image
                  src="/assets/istad_logo.jpg"
                  alt="Partner logo 2"
                  width={1000}
                  height={1000}
                  className="object-contain w-[158px]"
                />
                </div>
          

              {/* <div className=" mt-4 ">
              
              </div> */}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t text-center text-textprimary">
          <p>
            2024 Copyright NormPlov by{" "}
            <span className="text-green-700">
              <Link href="https://www.cstad.edu.kh/">ISTAD</Link>
            </span>
            . All rights reserved.™
          </p>
        </div>
      </div>
    </footer>
  );
}
