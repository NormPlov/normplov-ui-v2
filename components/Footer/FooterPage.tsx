"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function FooterPage() {
  const { locale } = useParams();
  const t = useTranslations("Footer"); // Hook to access translations
  return (
    <footer className="border-t py-4   bg-slate-100">
      <div className="container mx-auto lg:px-8 md:px-0 px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:gap-0 md:gap-0 gap-4 mt-4  ">
          {/* Logo and Description */}
          <div className="flex justify-center">
            <div className="space-y-3">
              <Link href="/" className="text-emerald-500 text-xl font-semibold">
                <Image
                  src="/assets/logo-text.jpg"
                  alt="Logo"
                  width={1000}
                  height={1000}
                  className="lg:w-[220px] md:w-[200px] w-[200px] -ml-2 "
                ></Image>
              </Link>
              <p className="text-textprimary block md:hidden lg:block text-base leading-relaxed">
                {t("description")}
              </p>
              <p className="text-textprimary hidden md:block lg:hidden text-md leading-relaxed">
                {t("description")}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-start  md:justify-center lg:justify-center lg:mr-[100px] md:mr-[80px] mr-0 ">
            <div>
              <h3 className="font-semibold text-2xl mb-4 text-textprimary">
                {t("navigationTitle.navLinks")}
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/"
                    className="text-textprimary hover:text-emerald-500"
                  >
                    {t("navigationTitle.navLinks1")}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/test`}
                    className="text-textprimary hover:text-emerald-500"
                  >
                    {t("navigationTitle.navLinks2")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/university`}
                    className="text-textprimary hover:text-emerald-500"
                  >
                    {t("navigationTitle.navLinks3")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/jobs`}
                    className="text-textprimary hover:text-emerald-500"
                  >
                    {t("navigationTitle.navLinks4")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/privacy-policy`}
                    className="text-textprimary hover:text-emerald-500"
                  >
                    {t("navigationTitle.navLinks5")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/about-us`}
                    className="text-textprimary hover:text-emerald-500"
                  >
                    {t("navigationTitle.navLinks6")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex justify-start  md:justify-center lg:justify-center lg:mr-[120px] md:mr-[60px] mr-0">
            <div>
              <h3 className="font-semibold text-2xl mb-4 text-textprimary">
              {t("contactTitle")}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-emerald-500 mt-1" />
                  <div>
                    <a href="tel:+855978443615" className="text-textprimary">
                      +855978443615
                    </a>
                    <p className="text-gray-500 text-sm">{t("contact.phone")}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-emerald-500 mt-1" />
                  <div>
                    <a
                      href="mailto:efound.istad@gmail.com"
                      className="text-textprimary"
                    >
                      efound.istad@gmail.com
                    </a>
                    <p className="text-gray-500 text-sm">{t("contact.email")}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-emerald-500 mt-1" />
                  <div>
                    <a
                      href="https://www.google.com/maps/dir/11.5762226,104.9272048/11.5784119,104.90279/@11.5682273,104.900408,14z/data=!3m1!4b1!4m4!4m3!1m1!4e1!1m0?entry=ttu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-textprimary"
                    >
                      {t("contact.address.text")}
                    </a>
                    <p className="text-gray-500 text-sm">{t("contact.address.label")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Partner Logos */}
          <div className="flex justify-start md:justify-center lg:justify-start lg:mr-[130px] md:mr-0 mr-0  w-full">
            <div>
              <h3 className="font-semibold text-2xl mb-4 text-textprimary">
              {t("sponsoredBy")}
              </h3>

              <div className="lg:flex md:block flex justify-between lg:gap-2 md:gap-2 gap-8">
                <Image
                  src="/assets/MPTC-logo.jpg"
                  alt="Partner logo 1"
                  width={1000}
                  height={1000}
                  className="object-contain w-40  lg:mb-0 md:mb-4 mb-4"
                />
                <Image
                  src="/assets/CBRD-logo.jpg"
                  alt="Partner logo 2"
                  width={1000}
                  height={1000}
                  className="object-contain w-40 -ml-1 -mt-2"
                />
              </div>
              <div className="space-y-4 mt-4">
                <h3 className="font-semibold text-2xl text-textprimary">
                {t("organizedBy")}
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
          © 2024 {t("copyright")}{" "}
            <span className="text-green-700">
              <Link href="https://www.cstad.edu.kh/">ISTAD</Link>
            </span>
            {" "}{t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
