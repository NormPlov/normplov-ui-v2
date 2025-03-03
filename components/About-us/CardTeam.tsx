"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css"; // Make sure you import the CSS for animations

export default function CardTeam() {
  const [, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
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
    <div className=" h-auto   grid w-auto auto-rows-fr grid-cols-1 lg:gap-[120px] md:gap-[100px] gap-3  lg:grid-cols-3 md:grid-cols-2 mb-10">
      <div className="text-center" >
        <div className="flex justify-center">
          <Image
            src="/assets/lyminh copy.png"
            alt=""
            width={1000}
            height={1000}
            className="w-[250px] "
          />
        </div>
        <div className=" space-y-2">
          <div className="text-2xl text-textprimary -mt-3">Phy Lymann</div>
          <div className="text-lg text-primary   flex justify-center ">
            <h1 className="bg-primary  px-4 rounded-xl bg-opacity-5  ">
              BACK-END DEVELOPER
            </h1>
          </div>
          <div className="  flex justify-center  items-center p-4 space-x-4">
            <div className="bg-slate-50 border border-slate-100 p-2.5 shadow-sm rounded-full">
              <a
                href="https://www.facebook.com/phy.lymann"
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
            <div className="bg-slate-50 border border-slate-100 p-2.5 shadow-sm rounded-full">
              <a
                href="https://www.linkedin.com/in/phy-lymann-6b072a281/"
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
            <div className="bg-slate-50 border border-slate-100 p-2.5 shadow-sm rounded-full">
              <a
                href="https://github.com/LymannPhy"
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
      <div className="text-center" >
        <div className="flex justify-center">
          <Image
            src="/assets/roza copy.png"
            alt=""
            width={1000}
            height={1000}
            className="w-[250px] "
          />
        </div>
        <div className=" space-y-2">
          <div className="text-2xl text-textprimary -mt-3">Yeng Sokroza</div>
          <div className="text-lg text-primary   flex justify-center ">
            <h1 className="bg-primary  px-4 rounded-xl bg-opacity-5  ">
            MODEL EVALUATE
            </h1>
          </div>
          <div className="  flex justify-center  items-center p-4 space-x-4">
            <div className="bg-slate-50 border border-slate-100 p-2.5 shadow-sm rounded-full">
              <a
                href="https://www.facebook.com/chori.chan/"
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
            <div className="bg-slate-50 border border-slate-100 p-2.5 shadow-sm rounded-full">
              <a
                href="https://www.linkedin.com/in/sokroza-yeng-a92223289/"
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
            <div className="bg-slate-50 border border-slate-100 p-2.5 shadow-sm rounded-full">
              <a
                href="https://github.com/YengSokroza"
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
      <div className="text-center" >
        <div className="flex justify-center">
          <Image
            src="/assets/sovanarith copy.png"
            alt=""
            width={1000}
            height={1000}
            className="w-[250px] "
          />
        </div>
        <div className=" space-y-2">
          <div className="text-2xl text-textprimary -mt-3">
            Hout Sovannarith
          </div>
          <div className="text-lg text-primary   flex justify-center ">
            <h1 className="bg-primary  px-4 rounded-xl bg-opacity-5  ">
              FRONT-END DEVELOPER
            </h1>
          </div>
          <div className="  flex justify-center  items-center p-4 space-x-4">
            <div className="bg-slate-50 border border-slate-100 p-2.5 shadow-sm rounded-full">
              <a
                href="https://www.facebook.com/@sovannarith.2804"
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
            <div className="bg-slate-50 border border-slate-100 p-2.5 shadow-sm rounded-full">
              <a
                href="https://www.linkedin.com/in/hout-sovannarith-8453771a1/"
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
            <div className="bg-slate-50 border border-slate-100 p-2.5 shadow-sm rounded-full">
              <a
                href="https://github.com/HoutSovannarith"
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
      <div className="text-center" >
        <div className="flex justify-center">
          <Image
            src="/assets/seavmey.png"
            alt=""
            width={1000}
            height={1000}
            className="w-[250px] "
          />
        </div>
        <div className=" space-y-2">
          <div className="text-2xl text-textprimary -mt-3">Channtha Seamey</div>
          <div className="text-lg text-primary   flex justify-center ">
            <h1 className="bg-primary  px-4 rounded-xl bg-opacity-5  ">
              FRONT-END DEVELOPER
            </h1>
          </div>
          <div className="  flex justify-center  items-center p-4 space-x-4">
            <div className="bg-slate-50 border border-slate-100 p-2.5 shadow-sm rounded-full">
              <a
                href="https://www.facebook.com/share/1NTAu8Gfa7/?mibextid=wwXIfr"
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
            <div className="bg-slate-50 border border-slate-100 p-2.5 shadow-sm rounded-full">
              <a
                href="https://www.linkedin.com/in/seamey-channtha-b465a7288/"
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
            <div className="bg-slate-50 border border-slate-100 p-2.5 shadow-sm rounded-full">
              <a
                href="https://github.com/Seamey"
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
      <div className="text-center">
        <div className="flex justify-center">
          <Image
            src="/assets/Chhunhy copy.png"
            alt=""
            width={1000}
            height={1000}
            className="w-[250px] "
          />
        </div>
        <div className=" space-y-2">
          <div className="text-2xl text-textprimary -mt-3">Chhem Chhunhy</div>
          <div className="text-lg text-primary   flex justify-center ">
            <h1 className="bg-primary  px-4 rounded-xl bg-opacity-5  ">
            MODEL EVALUATE
            </h1>
          </div>
          <div className="  flex justify-center  items-center p-4 space-x-4">
            <div className="bg-slate-50 border border-slate-100 p-2.5 shadow-sm rounded-full">
              <a
                href="https://www.facebook.com/share/15CsACuEbw/"
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
            <div className="bg-slate-50 border border-slate-100 p-2.5 shadow-sm rounded-full">
              <a
                href="https://www.linkedin.com/in/chhem-chhunhy-45a0a8337/"
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
            <div className="bg-slate-50 border border-slate-100 p-2.5 shadow-sm rounded-full">
              <a
                href="https://github.com/chhunhy"
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
      <div className="text-center" >
        <div className="flex justify-center">
          <Image
            src="/assets/kimla copy.png"
            alt=""
            width={1000}
            height={1000}
            className="w-[250px] "
          />
        </div>
        <div className=" space-y-2">
          <div className="text-2xl text-textprimary -mt-3">Chhoeurn Kimla</div>
          <div className="text-lg text-primary   flex justify-center ">
            <h1 className="bg-primary  px-4 rounded-xl bg-opacity-5  ">
              FRONT-END DEVELOPER
            </h1>
          </div>
          <div className="  flex justify-center  items-center p-4 space-x-4">
            <div className="bg-slate-50 border border-slate-100 p-2.5 shadow-sm rounded-full">
              <a
                href="https://www.facebook.com/profile.php?id=100040141150755"
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
            <div className="bg-slate-50 border border-slate-100 p-2.5 shadow-sm rounded-full">
              <a
                href="https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit"
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
            <div className="bg-slate-50 border border-slate-100 p-2.5 shadow-sm rounded-full">
              <a
                href="https://github.com/kimla1234"
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
    </div>
  );
}
