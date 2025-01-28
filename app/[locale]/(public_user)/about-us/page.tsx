"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import CardTeam from "@/components/About-us/CardTeam";
import { useParams } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css"; // Make sure you import the CSS for animations
import { useEffect } from "react";

export default function AboutUs() {
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
    <div className=" bg-slate-50">
      <section className="grid grid-cols-1 bg-white lg:grid-cols-2 md:grid-cols-1 gap-2 lg:px-[100px]  md:px-20 px-10 lg:h-[650px]  md:h-auto h-[1050px]">
        <div className="max-w-7xl mx-auto my-4 md:my-6 space-y-6 py-10 ">
          <h1
            data-aos="zooom-in-left"
            className="text-primary lg:text-4xl md:text-4xl text-3xl font-semibold"
          >
            <span className="text-secondary">ការណែនាំអំពី</span>
            នាំផ្លូវ
          </h1>
          <p className="text-textprimary lg:text-2xl md:text-2xl text-xl leading-relaxed">
            ជួយសិស្សថ្នាក់មធ្យមសិក្សាទុតិយភូមិ
            ក្នុងការជ្រើសរើសមុខវិជ្ជាសិក្សានៅសាកលវិទ្យាល័យដោយផ្តល់ឱ្យពួកគេនូវ
            ឱកាសសិក្សាស្វែងយល់អំពីសមត្ថភាព ការចាប់អារម្មណ៍ និងគោលដៅអនាគត។
            យើងបំពេញបេសកកម្មនេះតាមរយៈការធ្វើតេស្តលើ បុគ្គលិកលក្ខណៈ
            តាមចំណាប់អារម្មណ៍ តាមគុណតម្លៃ ភាពខ្លាំងខ្សោយ តាមរបៀបសិក្សា
            និងការចែករំលែកចំណេះដឹងពីវិស័យនានា។
          </p>
          <div className="py-4">
            <Link
              href={`/${locale}/test`}
              className="bg-emerald-500  text-white px-6 py-2 md:px-8 md:py-2 lg:px-8 lg:py-3 rounded-xl text-md md:text-lg lg:text-lg hover:bg-emerald-600 transition-colors"
            >
              ចាប់ផ្តើម
            </Link>
          </div>
        </div>
        <div className="flex  justify-center items-start w-full h-[700px]  py-10">
          <div>
            <div className=" absolute  lg:ml-14 md:ml-4 bg-green-100 lg:w-[600px] md:w-[550px] animate-pulse h-[400px] lg:mt-20 md:mt-24 rounded-xl"></div>
            <Image
              src="/assets/cover-about.jpg"
              width={1000}
              height={1000}
              className="relative w-[570px] lg:h-64 md:h-auto h-40 lg:ml-40 md:ml-[50px] rounded-xl mt-8 object-fill "
              alt=""
              data-aos="flip-left"
            />

            <Image
              src="/assets/stu-isatd.png"
              width={1000}
              height={1000}
              className=" relative lg:ml-0 md:-ml-0 w-[450px] h-50 mr-10 rounded-xl mt-8 object-fill"
              alt=""
              data-aos="flip-left"
            />
          </div>
        </div>
      </section>
      <section>
        <section
          className="flex bg-pr lg:px-20  md:px-0 px-0 mt-10  max-w-full justify-center  "
          data-aos="slide-up"
        >
          <div className="flex max-w-[92%] mx-auto  my-4 md:my-6 bg-white bg-opacity-90 lg:p-10 md:p-10 p-4 rounded-2xl ">
            <div className=" space-y-4 lg:w-[65%] md:w-[60%] h-auto">
              <div className=" text-primary lg:text-4xl md:text-4xl text-3xl font-semibold">
                គោលបំណង
              </div>
              <p className="text-textprimary lg:text-2xl md:text-2xl text-xl leading-relaxed">
                ក្រុមរបស់យើងប្តេជ្ញាចិត្តក្នុងការផ្តល់ជូននូវធនធាន ការណែនាំ
                និងការគាំទ្រដែលអ្នកត្រូវការដើម្បីធ្វើការសម្រេចចិត្តដោយមានព័ត៌មានគ្រប់គ្រាន់អំពីអនាគតរបស់អ្នក។
                ជាមួយនឹងឧបករណ៍ និងការណែនាំរបស់យើង
                អ្នកនឹងមានទំនុកចិត្តក្នុងការជ្រើសរើសផ្លូវការសិក្សាដែលត្រូវនឹងគោលដៅ
                និងក្តីស្រមៃរបស់អ្នក។
              </p>
            </div>
            <div className=" lg:block md:block hidden lg:w-[35%] md:w-[40%]    ">
              <div className="flex lg:justify-end md:justify-end  lg:items-start md:items-center">
                <Image
                  src="/assets/Next steps-pana.png"
                  width={1000}
                  height={1000}
                  className=" relative lg:w-[400px] lg:h-[400px] md:w-[420px] md:h-[300px] rounded-xl object-fill lg:-mt-8 md:mt-8"
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
          <div className="flex max-w-[92%] mx-auto my-4 md:my-6 bg-primary bg-opacity-5 p-10 rounded-2xl ">
            <div className=" lg:block md:block hidden lg:w-[35%] md:w-[40%]    ">
              <div className=" flex justify-start">
                <Image
                  src="/assets/Create-bro.png"
                  width={1000}
                  height={1000}
                  className=" relative lg:w-[400px] lg:h-[400px] md:w-[420px] md:h-[340px]  rounded-xl object-fill lg:-mt-8 md:mt-8"
                  alt=""
                />
              </div>
            </div>
            <div className="mt-10 space-y-4 lg:w-[65%] md:w-[70%] h-auto">
              <div className=" text-primary lg:text-4xl md:text-4xl text-3xl  font-semibold text-end">
                ចក្ខុវិស័យ
              </div>
              <p className="text-textprimary lg:text-2xl md:text-2xl text-xl leading-relaxed text-end">
                ក្រុមរបស់យើងប្តេជ្ញាចិត្តក្នុងការផ្តល់ជូននូវធនធាន ការណែនាំ
                និងការគាំទ្រដែលអ្នកត្រូវការដើម្បីធ្វើការសម្រេចចិត្តដោយមានព័ត៌មានគ្រប់គ្រាន់អំពីអនាគតរបស់អ្នក។
                ជាមួយនឹងឧបករណ៍ និងការណែនាំរបស់យើង
                អ្នកនឹងមានទំនុកចិត្តក្នុងការជ្រើសរើសផ្លូវការសិក្សាដែលត្រូវនឹងគោលដៅ
                និងក្តីស្រមៃរបស់អ្នក។
              </p>
            </div>
          </div>
        </section>
        <section
          className="flex bg-pr lg:px-20  md:px-0 px-0   max-w-full justify-center md:hidden lg:hidden "
          data-aos="slide-up"
        >
          <div className="flex max-w-[92%] mx-auto  my-4 md:my-6 bg-primary bg-opacity-5 lg:p-10 md:p-10 p-4 rounded-2xl ">
            <div className=" space-y-4 lg:w-[65%] md:w-[60%] h-auto">
              <div className=" text-primary lg:text-4xl md:text-4xl text-3xl font-semibold">
                ចក្ខុវិស័យ
              </div>
              <p className="text-textprimary lg:text-2xl md:text-2xl text-xl leading-relaxed">
                ក្រុមរបស់យើងប្តេជ្ញាចិត្តក្នុងការផ្តល់ជូននូវធនធាន ការណែនាំ
                និងការគាំទ្រដែលអ្នកត្រូវការដើម្បីធ្វើការសម្រេចចិត្តដោយមានព័ត៌មានគ្រប់គ្រាន់អំពីអនាគតរបស់អ្នក។
                ជាមួយនឹងឧបករណ៍ និងការណែនាំរបស់យើង
                អ្នកនឹងមានទំនុកចិត្តក្នុងការជ្រើសរើសផ្លូវការសិក្សាដែលត្រូវនឹងគោលដៅ
                និងក្តីស្រមៃរបស់អ្នក។
              </p>
            </div>
            <div className=" lg:block md:block hidden lg:w-[35%] md:w-[40%]    ">
              <div className="flex lg:justify-end md:justify-end  lg:items-start md:items-center">
                <Image
                  src="/assets/Next steps-pana.png"
                  width={1000}
                  height={1000}
                  className=" relative lg:w-[400px] lg:h-[400px] md:w-[420px] md:h-[300px] rounded-xl object-fill lg:-mt-8 md:mt-8"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </section>
      <section
        data-aos="slide-up"
        className="max-w-7xl mt-4  mx-auto my-4 md:my-6 flex justify-center "
      >
        <div className=" text-primary lg:text-4xl md:text-4xl text-3xl font-semibold ">
        ណែនាំដោយ
        </div>
      </section>
      <section className="flex px-20   max-w-full lg:h-[650px] md:h-[500px] h-[700px] py-20  justify-center  ">
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
              អ្នកគ្រូ មុំ រស្មី
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
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
              លោកគ្រូ​ អ៉ឹង មួយលាង
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        data-aos="slide-up"
        className="max-w-full h-[200px] lg:mt-0 md:-mt-[20px] mt-[190px]  items-center  bg-white mx-auto   flex justify-center "
      >
        <div className=" text-primary lg:text-4xl md:text-4xl text-3xl font-semibold ">
          សមាជិកក្រុម
        </div>
      </section>
      <section className="flex  bg-white justify-center">
        <CardTeam />
      </section>
    </div>
  );
}
