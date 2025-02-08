import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BoxReveal from "./box-reveal";
import { useTranslations } from "next-intl";

export default function NromplovFor() {
  const t = useTranslations("HomePage"); // Hook to access translations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 120,
      once: true,
      // Animation duration (in ms)
      // Whether animation should happen only once
    });
  }, []);
  return (
    <div className=" relative lg:h-[670px] md:h-auto ">
      <div className=" lg:py-14 md:py-0 relative ">
        <div className="container mx-auto ">
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-6 md:gap-14">
            {/* Left Section */}
            <div className=" grid-cols-1 grid md:grid lg:grid  lg:gap-4 md:gap-4 gap-2   ">
              <div className=" lg:py-16 md:py-4 py-4">
                <div className="container mx-auto lg:px-6 md:px-6 px-0">
                  <div className="grid grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-4">
                    {/* Left Section */}
                    <div className="bg-white p-2 rounded-xl w-full lg:h-[440px] md:h-[440px] h-[260px] shadow-lg lg:shadow-slate-200 md:shadow-slate-200 shadow-slate-100">
                      <Image
                        src="/home/university-end.png"
                        width={1000}
                        height={1000}
                        alt=""
                        className=" rounded-xl object-cover w-full h-full"
                      ></Image>
                    </div>

                    {/* Right Section */}
                    <div className="lg:space-y-8 md:space-y-8 space-y-4 ">
                      {/* Track Progress */}
                      <div className="bg-white p-2 rounded-xl shadow-lg lg:shadow-slate-200 md:shadow-slate-200 shadow-slate-100">
                        <div>
                          <Image
                            src="/home/student.png"
                            width={1000}
                            height={1000}
                            alt=""
                            className=" rounded-xl"
                          ></Image>
                        </div>
                      </div>

                      {/* Schedule Interviews */}
                      <div className="bg-white p-2 rounded-xl shadow-lg lg:shadow-slate-200 md:shadow-slate-200 shadow-slate-100">
                        <div>
                          <Image
                            src="/home/worker.png"
                            width={1000}
                            height={1000}
                            alt=""
                            className=" rounded-xl"
                          ></Image>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-x-0 lg:top-[60px] md:-top-[10px] lg:w-[650px] md:w-full  lg:h-1/5 md:h-1/6 bg-gradient-to-b from-white dark:from-background"></div>
              <div className="pointer-events-none absolute inset-x-0 -bottom-2  lg:top-[380px] md:top-[300px]    lg:w-[650px] md:w-full lg:h-2/4 md:h-2/6 bg-gradient-to-t from-white dark:from-background"></div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col justify-center -mt-2  ">
              <div
                ata-aos="zoom-in-up"
                className="lg:mb-10 md:mb-10 mb-4 space-y-4 "
              >
                <BoxReveal boxColor={"#0BBB8A"} duration={1}>
                  <div className="flex justify-center  ">
                    <h1 className="lg:text-4xl lg:mt-2 md:mt-2  mt-4 mb-2 md:text-4xl text-2xl font-bold text-center  text-textprimary">
                      {t("contain.part1")}
                      <span className="text-emerald-500">
                        {t("contain.part2")}
                      </span>
                      {t("contain.part3")}
                    </h1>
                  </div>
                </BoxReveal>
                <BoxReveal boxColor={"#0BBB8A"} duration={1}>
                  <p className="text-start  lg:text-xl md:text-xl mb-2 text-lg text-gray-600 ">
                    {t("contain.description")}
                  </p>
                </BoxReveal>
              </div>
              <div className="grid grid-cols-1  md:grid-cols-3 gap-4 ">
                <div
                  data-aos="zooom-in-left"
                  className="flex flex-col items-center p-6 bg-white shadow-xl shadow-slate-50 rounded-xl"
                >
                  <div className="mb-4 w-[110px] h-[110px]  bg-primary bg-opacity-10 p-2 rounded-full flex justify-center items-center ">
                    <Image src="/home/highschool.png" alt="" width={1000} height={1000}
                    className="w-full h-full object-cover rounded-full"/>
                  </div>
                  <p className="text-center lg:text-xl md:text-xl text-lg text-gray-600">
                    {t("contain.stu-high-school")}
                  </p>
                </div>
                <div
                  ata-aos="zoom-in-up"
                  className="flex flex-col items-center p-6 bg-white shadow-xl shadow-slate-50 rounded-xl"
                >
                  <div className="mb-4 w-[110px] h-[110px] bg-accent bg-opacity-10 p-2 rounded-full flex justify-center items-center ">
                  <Image src="/home/university-student.png" alt="" width={1000} height={1000}
                    className="w-full h-full object-cover rounded-full"/>
                  </div>
                  <p className="text-center lg:text-xl md:text-xl text-lg text-gray-600">
                    {t("contain.stu-university")}
                  </p>
                </div>
                <div
                  data-aos="zooom-in-left"
                  className="flex flex-col items-center p-6 bg-white shadow-xl shadow-slate-50 rounded-xl"
                >
                  <div className="mb-4 w-[110px] h-[110px] bg-secondary bg-opacity-10 p-2 rounded-full flex justify-center items-center ">
                  <Image src="/home/working.png" alt="" width={1000} height={1000}
                    className="w-full h-full object-cover rounded-full"/>
                  </div>
                  <p className="text-center  lg:text-xl md:text-xl text-lg text-gray-600">
                    {t("contain.Staff-working")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
