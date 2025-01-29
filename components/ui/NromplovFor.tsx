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
    <div className=" relative lg:h-[670px] md:h-[400px]">
      <div className=" py-14 relative">
        <div className="container mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Section */}
            <div className=" grid-cols-1 hidden md:hidden lg:grid  gap-4  ">
              <div className=" py-16">
                <div className="container mx-auto px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Left Section */}
                    <div className="bg-white p-2 rounded-xl w-full h-[440px] shadow-lg shadow-slate-200">
                      <Image
                        src="/home/student-uni.png"
                        width={1000}
                        height={1000}
                        alt=""
                        className=" rounded-xl object-cover w-full h-full"
                      ></Image>
                    </div>

                    {/* Right Section */}
                    <div className="space-y-8">
                      {/* Track Progress */}
                      <div className="bg-white p-2 rounded-xl shadow-lg shadow-slate-200">
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
                      <div className="bg-white p-2 rounded-xl shadow-lg shadow-slate-200">
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
              <div className="pointer-events-none absolute inset-x-0 top-[60px] w-[650px]  h-1/5 bg-gradient-to-b from-white dark:from-background"></div>
              <div className="pointer-events-none absolute inset-x-0 -bottom-2 w-[650px] h-2/4 bg-gradient-to-t from-white dark:from-background"></div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col justify-center -mt-2  ">
              <div
                ata-aos="zoom-in-up"
                className="lg:mb-10 md:mb-10 mb-4 space-y-4 "
              >
                <BoxReveal boxColor={"#0BBB8A"} duration={1}>
                  <div className="flex justify-center  ">
                    <h1 className="lg:text-4xl mt-2 mb-2 md:text-4xl text-2xl font-bold text-center  text-textprimary">
                      {t("contain.part1")}
                      <span className="text-emerald-500">
                        {t("contain.part2")}
                      </span>
                      {t("contain.part3")}
                    </h1>
                  </div>
                </BoxReveal>
                <BoxReveal boxColor={"#0BBB8A"} duration={1}>
                  <p className="text-start  lg:text-xl md:text-xl text-lg text-gray-600 ">
                    {t("contain.description")}
                  </p>
                </BoxReveal>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                <div
                  data-aos="zooom-in-left"
                  className="flex flex-col items-center p-6 bg-white shadow-lg shadow-slate-50 rounded-xl"
                >
                  <div className="mb-4 w-16 h-16 bg-primary bg-opacity-10 p-2 rounded-full flex justify-center items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-school text-primary"
                    >
                      <path d="M14 22v-4a2 2 0 1 0-4 0v4" />
                      <path d="m18 10 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.382a1 1 0 0 1 .553-.894L6 10" />
                      <path d="M18 5v17" />
                      <path d="m4 6 7.106-3.553a2 2 0 0 1 1.788 0L20 6" />
                      <path d="M6 5v17" />
                      <circle cx="12" cy="9" r="2" />
                    </svg>
                  </div>
                  <p className="text-center lg:text-xl md:text-xl text-lg text-gray-600">
                    {t("contain.stu-high-school")}
                  </p>
                </div>
                <div
                  ata-aos="zoom-in-up"
                  className="flex flex-col items-center p-6 bg-white shadow-lg shadow-slate-50 rounded-xl"
                >
                  <div className="mb-4 w-16 h-16 bg-accent bg-opacity-10 p-2 rounded-full flex justify-center items-center ">
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
                      className="lucide lucide-university text-accent"
                    >
                      <circle cx="12" cy="10" r="1" />
                      <path d="M22 20V8h-4l-6-4-6 4H2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2" />
                      <path d="M6 17v.01" />
                      <path d="M6 13v.01" />
                      <path d="M18 17v.01" />
                      <path d="M18 13v.01" />
                      <path d="M14 22v-5a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5" />
                    </svg>
                  </div>
                  <p className="text-center lg:text-xl md:text-xl text-lg text-gray-600">
                    {t("contain.stu-university")}
                  </p>
                </div>
                <div
                  data-aos="zooom-in-left"
                  className="flex flex-col items-center p-6 bg-white shadow-lg shadow-slate-50 rounded-xl"
                >
                  <div className="mb-4 w-16 h-16 bg-secondary bg-opacity-10 p-2 rounded-full flex justify-center items-center ">
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
                      className="lucide lucide-circle-dollar-sign text-secondary"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                      <path d="M12 18V6" />
                    </svg>
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
