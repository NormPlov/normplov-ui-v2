"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import CardTeam from "@/components/About-us/CardTeam";
import { useParams } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css"; // Make sure you import the CSS for animations
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { LayoutGridDemo } from "@/components/ui/LayoutGridDemo";
import Lottie from "lottie-react";
import animationData from "../../../../public/lottie/about.json";
export default function AboutUs() {
  const t = useTranslations("Abbout"); // Hook to access translations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 120,
      once: true,
      // Animation duration (in ms)
      // Whether animation should happen only once
    });
  }, []);
  const { locale } = useParams();
  return (
    <div className=" bg-slate-50 ">
      <section className="grid  grid-cols-1 h-auto bg-bgPrimaryLight lg:grid-cols-2 md:grid-cols-1  gap-0 lg:px-20 md:px-16 px-0  lg:h-screen  md:h-auto ">
        <div className="  mx-auto my-4 md:my-6 lg:space-y-10 md:space-y-0 space-y-0 py-[16px]   lg:px-10 md:px-0 px-6">
          <div className="my-4 md:my-6 space-y-6 lg:py-10   ">
            <h1
              data-aos="zooom-in-left"
              className="text-secondary lg:text-4xl md:text-4xl text-3xl font-semibold"
            >
              {t("title-2")}
            </h1>
            <p
              className="text-textprimary lg:text-2xl md:text-[24px] text-[18px] "
              style={{ lineHeight: "1.5" }}
            >
              {t("description")}
            </p>
            <div className="py-4">
              <Link
                href={`/${locale}/test`}
                className="bg-emerald-500  text-white px-4 py-2 md:px-6 md:py-3 lg:px-6 lg:py-3 rounded-xl text-md md:text-lg lg:text-lg hover:bg-emerald-600 transition-colors"
              >
                {t("btn-start")}
              </Link>
            </div>
          </div>
          <div className=" -mt-[200px] flex justify-center items-end">
            <Lottie
              animationData={animationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
              className="flex justify-center items-end opacity-40 bg-cover"
            />
          </div>
        </div>
        <div>
          <LayoutGridDemo />
        </div>
      </section>
      <section className=" bg-white h-auto flex justify-center ">
        <div className="w-full max-w-[85%] mb-10 lg:space-y-12 md:space-y-12 space-y-8  lg:px-20 lg:py-14 md:py-20 py-10  md:px-0 px-0 mx-auto  my-4 md:my-6 ">
          <div className="lg:text-4xl md:text-4xl  text-2xl font-semibold text-gray-500">
           {t("header_01.title")}
          </div>
          <div
            className=" lg:space-x-6 md:space-x-6 space-x-0 lg:space-y-0 md:space-y-0 space-y-2 lg:items-start md:items-start justify-start items-center"
            data-aos="zoom-up"
          >
            <div className="flex space-x-4 justify-start items-center md:items-start lg:items-start">
              <div>
                <div className=" col-span-1  lg:w-[70px] lg:h-[70px] md:w-[70px] md:h-[70px] w-[50px] h-[50px] bg-primary bg-opacity-40 rounded-full p-1.5">
                  <Image
                    src="/assets/about/technology_1.png"
                    alt=" "
                    width={1000}
                    height={1000}
                    className=" rounded-full w-full h-full object-cover"
                  ></Image>
                </div>
              </div>
              <div className=" space-y-3">
                <div className="lg:text-3xl md:text-4xl  text-[20px] text-primary">
                {t("header_01.Technology_01")}
                </div>
                <div className="lg:text-xl md:text-[24px] text-gray-500 lg:block md:block hidden"style={{ lineHeight: "1.5" }}>
                {t("header_01.des_01")}
                </div>
              </div>
            </div>
            <div className="lg:text-xl text-gray-500 lg:hidden md:hidden block">
            {t("header_01.des_01")}
            </div>
          </div>
          <div className=" grid grid-cols-3 lg:gap-6 md:gap-6 gap-3 mb-10" data-aos="zoom-up">
            <div className="bg-slate-50 bg-opacity-60 rounded-xl  flex justify-center items-center  ">
              <Image
                src="/assets/about/nextjs.png"
                alt=" "
                width={1000}
                height={1000}
                className="w-[230px] "
              ></Image>
            </div>
            <div className="bg-slate-50 bg-opacity-60 rounded-xl  flex justify-center items-center  ">
              <Image
                src="/assets/about/fastapi.png"
                alt=" "
                width={1000}
                height={1000}
                className="w-[290px] "
              ></Image>
            </div>
            <div className="bg-slate-50 bg-opacity-60 rounded-xl  flex justify-center items-center  ">
              <Image
                src="/assets/about/PostgreSQL.png"
                alt=" "
                width={1000}
                height={1000}
                className="w-[230px] "
              ></Image>
            </div>
          </div>
          <div
            className="lg:space-x-6 md:space-x-6 space-x-0 lg:space-y-0 md:space-y-0 space-y-2 lg:items-start md:items-start items-center"
            data-aos="zoom-up"
          >
            <div className="flex space-x-4 justify-start items-center md:items-start lg:items-start ">
              <div>
                <div className=" col-span-1  lg:w-[70px] lg:h-[70px] md:w-[70px] md:h-[70px] w-[50px] h-[50px] bg-secondary bg-opacity-40 rounded-full p-1.5">
                  <Image
                    src="/assets/about/technology_1.png"
                    alt=" "
                    width={1000}
                    height={1000}
                    className=" rounded-full w-full h-full object-cover"
                  ></Image>
                </div>
              </div>
              <div className=" space-y-3">
                <div className="lg:text-3xl md:text-4xl  text-[20px] text-secondary">
                {t("header_01.Technology_02")}
                </div>
                <div className="lg:text-xl md:text-[24px] text-gray-500 lg:block md:block hidden" style={{ lineHeight: "1.6" }}>
                {t("header_01.des_02")}
                </div>
              </div>
            </div>
            <div className="lg:text-xl text-gray-500 lg:hidden md:hidden block">
            {t("header_01.des_02")}
            </div>
          </div>
          <div className=" grid grid-cols-3 lg:gap-6 md:gap-6 gap-3 mb-10" data-aos="zoom-up">
            <div className="bg-slate-50 bg-opacity-60 p-2 rounded-xl  flex justify-center items-center  ">
              <Image
                src="/assets/about/beautifulsoup.png"
                alt=" "
                width={1000}
                height={1000}
                className="w-[230px] "
              ></Image>
            </div>
            <div className="bg-slate-50 bg-opacity-60 rounded-xl  p-2 flex justify-center items-center  ">
              <Image
                src="/assets/about/puppeteer.png"
                alt=" "
                width={1000}
                height={1000}
                className="w-[250px] "
              ></Image>
            </div>
            <div className="bg-slate-50 bg-opacity-60 rounded-xl   flex justify-center items-center  ">
              <Image
                src="/assets/about/django.png"
                alt=" "
                width={1000}
                height={1000}
                className="w-[230px] "
              ></Image>
            </div>
          </div>
          <div className="lg:space-x-6 md:space-x-6 space-x-0 lg:space-y-0 md:space-y-0 space-y-2 lg:items-start md:items-start items-center">
            <div className="flex space-x-4 justify-start md:items-start lg:items-start">
              <div>
                <div data-aos="zoom-up" className=" col-span-1  lg:w-[70px] lg:h-[70px] md:w-[70px] md:h-[70px] w-[50px] h-[50px] bg-accent bg-opacity-40 rounded-full p-1.5">
                  <Image
                    src="/assets/about/technology_1.png"
                    alt=" "
                    width={1000}
                    height={1000}
                    className=" rounded-full w-full h-full object-cover"
                  ></Image>
                </div>
              </div>
              <div className=" space-y-3" data-aos="zoom-up">
                <div className="lg:text-3xl md:text-4xl  text-[20px] text-accent">
                {t("header_01.Technology_03")}
                </div>
                <div className="lg:text-xl md:text-[24px] text-gray-500 lg:block md:block hidden" style={{ lineHeight: "1.6" }}>
                {t("header_01.des_03")}
                </div>
              </div>
            </div>
            <div className="lg:text-xl text-gray-500 lg:hidden md:hidden block">
            {t("header_01.des_03")}
            </div>
          </div>
          <div className=" grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-6 md:gap-6 gap-3 mb-20" data-aos="zoom-up">
            <div className="bg-slate-50 bg-opacity-60 lg:col-span-2 md:col-span-2 col-span-1 p-2 rounded-xl  flex justify-center items-center  ">
              <Image
                src="/assets/about/Recommendation-removebg-preview.png"
                alt=" "
                width={1000}
                height={1000}
                className="w-full "
              ></Image>
            </div>
            <div className="bg-slate-50 bg-opacity-60 col-span-1 rounded-xl  p-2 flex justify-center items-center  ">
              <Image
                src="/assets/about/Integrated.png"
                alt=" "
                width={1000}
                height={1000}
                className="w-full "
              ></Image>
            </div>
          </div>
        </div>
      </section>
      <section>
        <section
          className="flex bg-pr lg:px-20  md:px-0 px-0 mt-10  max-w-full justify-center  "
          data-aos="slide-up"
        >
          <div className="flex max-w-[85%] mx-auto  my-4 md:my-6 bg-white bg-opacity-90 lg:p-10 md:p-10 p-4 rounded-2xl ">
            <div className=" space-y-4 lg:w-[65%] md:w-[70%] h-auto">
              <div className=" text-primary lg:text-4xl md:text-4xl text-2xl font-semibold">
                {t("mission")}
              </div>
              <p
                className="text-textprimary lg:text-2xl md:text-2xl text-[18px] leading-relaxed"
                style={{ lineHeight: "1.5" }}
              >
                {t("mission-description")}
              </p>
            </div>
            <div className=" lg:block md:block hidden lg:w-[35%] md:w-[40%]    ">
              <div className="flex lg:justify-end md:justify-end  lg:items-start md:items-center">
                <Image
                  src="/assets/Next steps-pana.png"
                  width={1000}
                  height={1000}
                  className=" relative lg:w-[300px] lg:h-[300px] md:w-[400px] md:h-[280px] rounded-xl object-fill lg:-mt-8 md:mt-8"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className="lg:px-20 md:px-0 px-0 max-w-full justify-center  hidden md:flex lg:flex "
          data-aos="slide-up"
        >
          <div className="flex max-w-[85%] mx-auto my-4 md:my-6 bg-primary bg-opacity-5 p-10 rounded-2xl ">
            <div className=" lg:block md:block hidden lg:w-[35%] md:w-[40%]    ">
              <div className=" flex justify-start">
                <Image
                  src="/assets/Create-bro.png"
                  width={1000}
                  height={1000}
                  className=" relative lg:w-[300px] lg:h-[300px] md:w-[400px] md:h-[320px]  rounded-xl object-fill lg:-mt-8 md:mt-8"
                  alt=""
                />
              </div>
            </div>
            <div className="mt-10 space-y-4 lg:w-[65%] md:w-[70%] h-auto">
              <div className=" text-primary lg:text-4xl md:text-4xl text-2xl  font-semibold text-end">
                {t("vision")}
              </div>
              <p
                className="text-textprimary lg:text-2xl md:text-2xl text-[18px] leading-relaxed text-end"
                style={{ lineHeight: "1.5" }}
              >
                {t("vision-description")}
              </p>
            </div>
          </div>
        </section>
        <section
          className="flex bg-pr lg:px-20  md:px-0 px-0   max-w-full justify-center md:hidden lg:hidden "
          data-aos="slide-up"
        >
          <div className="flex max-w-[85%] mx-auto  my-4 md:my-6 bg-primary bg-opacity-5 lg:p-10 md:p-10 p-4 rounded-2xl ">
            <div className=" space-y-4 lg:w-[65%] md:w-[60%] h-auto">
              <div className=" text-primary lg:text-4xl md:text-4xl text-2xl font-semibold">
                {t("vision")}
              </div>
              <p className="text-textprimary lg:text-2xl md:text-2xl text-[18px] leading-relaxed">
                {t("vision-description")}
              </p>
            </div>
            <div className=" lg:block md:block hidden lg:w-[35%] md:w-[40%]    ">
              <div className="flex lg:justify-end md:justify-end  lg:items-start md:items-center">
                <Image
                  src="/assets/Next steps-pana.png"
                  width={1000}
                  height={1000}
                  className=" relative lg:w-[400px] lg:h-[400px] md:w-[400px] md:h-[280px] rounded-xl object-fill lg:-mt-8 md:mt-8"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className="max-w-7xl mt-4  mx-auto my-4 md:my-6   ">
        <div className="  mt-14 text-primary max-w-7xl  text-center lg:text-4xl md:text-4xl text-3xl font-semibold ">
          <div>{t("our mentors")}</div>
        </div>

        <section className="flex px-20    max-w-full lg:h-[650px] md:h-[500px] h-[700px] py-20  justify-center  ">
          <div className="lg:flex md:flex lg:space-x-[200px] md:space-x-[100px]   max-w-7xl mx-auto my-4 md:my-6  ">
            <div className=" mb-10" data-aos="slide-up">
              <Image
                src="/assets/cher_mey.png"
                width={1000}
                height={1000}
                className=" lg:w-[390px] lg:h-[320px]  md:w-[260px] md:h-[220px] w-[240px] h-[200px]  "
                alt=""
              />
              <div className="flex mr-6 justify-center text-textprimary text-2xl mt-[10px]">
                {t("cher-mey")}
              </div>
              <div className="  flex justify-center mr-6 items-center p-4 space-x-4">
                <div className="bg-slate-100 border border-slate-200 p-2.5 shadow-sm rounded-full">
                  <a
                    href="https://www.facebook.com/mom.reksmey.12?_rdc=1&_rdr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                </div>
                <div className="bg-slate-100 border border-slate-200 p-2.5 shadow-sm rounded-full">
                  <a
                    href="https://t.me/reksmey_mom"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-linkedin"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
                <div className="bg-slate-100 border border-slate-200 p-2.5 shadow-sm rounded-full">
                  <a
                    href="https://github.com/Reksmeys"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-github"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className=" " data-aos="slide-up">
              <Image
                src="/assets/cher_leang copy 2.png"
                width={1000}
                height={1000}
                className="lg:w-[390px] lg:h-[320px]  md:w-[260px] md:h-[220px] w-[240px] h-[200px]"
                alt=""
              />
              <div className="flex mr-6 justify-center text-textprimary text-2xl mt-[10px]">
                {t("cher-leang")}
              </div>
              <div className="  flex justify-center mr-6 items-center p-4 space-x-4">
                <div className="bg-slate-100 border border-slate-200 p-2.5 shadow-sm rounded-full">
                  <a
                    href="https://www.facebook.com/mom.reksmey.12?_rdc=1&_rdr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                </div>
                <div className="bg-slate-100 border border-slate-200 p-2.5 shadow-sm rounded-full">
                  <a
                    href="https://t.me/reksmey_mom"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-linkedin"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
                <div className="bg-slate-100 border border-slate-200 p-2.5 shadow-sm rounded-full">
                  <a
                    href="https://t.me/reksmey_mom"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-github"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      <section
        data-aos="slide-up"
        className="max-w-full h-[200px] lg:mt-0 md:-mt-[20px] mt-[190px]  items-center  bg-white mx-auto   flex justify-center "
      >
        <div className=" text-primary lg:text-4xl md:text-4xl text-3xl font-semibold ">
          {t("team")}
        </div>
      </section>
      <section className="flex  bg-white justify-center">
        <CardTeam />
      </section>
    </div>
  );
}
