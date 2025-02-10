"use client"
import React, { useState } from "react";
import NavbarPage from "../components/Navbar/NavbarPage";
import FooterPage from "../components/Footer/FooterPage";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  const [currentLocale, ] = useState<string>("km");
  return (
    <div>
      <NavbarPage />

      {/* Background Image Section */}
      <div className="w-full lg:h-screen md:h-[400px] h-screen flex  justify-center items-center">
        <div className=" -mt-4 flex justify-center items-start   rounded-lg">
          <div>
            <div className=" flex justify-center  lg:w-full   lg:h-auto md:w-[400px] md:h-[400px] w-[200px] h-[200px] ">
              <div className="w-[400px] h-auto">
              <Image
                src="https://cdn.prod.website-files.com/5beab1239ac88487c3a6608f/6514e57fce3e02e011dc4a00_Search%20Empty.avif"
                alt="Error-bro"
                width={1000}
                height={1000}
                className="lg:w-full lg:h-full md:w-[300px] md:h-[300px] opacity-70  "
              />
              </div>
            </div>
            <div className="space-y-4 text-white  lg:mt-10 md:mt-20 mt-3">
              <div className="lg:text-3xl md:text-4xl text-2xl font-semibold text-textprimary text-center">
                រកមិនឃើញទំព័រ
              </div>
              <div className="lg:text-xl md:text-2xl text-lg  text-slate-500 text-center ">
                សុំទោស! សូមចូលទៅកាន់គេហទំព័រដើមដើម្បីទទួលបាន កន្លែងដែលអ្នកចង់ទៅ
              </div>
              <div className=" border-t border-dashed "></div>
              <div className="flex justify-center">
              <Link
                href={`/${currentLocale}`}
                className="flex items-center bg-primary rounded-xl w-40  h-12 justify-center text-center"
              >
               
                <div className="py-2 px-2 text-lg md:text-xl lg:text-xl font-medium text-white  flex justify-center">
                  ទៅទំព័រដើម
                </div>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterPage />
    </div>
  );
};

export default NotFound;
