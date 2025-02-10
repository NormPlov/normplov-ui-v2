import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

import checkIcon from "@/public/Quiz/skill-icon/check.png";

export default function PolicyConponent() {
    const t = useTranslations("Policy"); // Hook to access translations

  return (
    <div>
      <div className="w-full h-full ">
      <div className="lg:max-w-[80%] bg-primary bg-opacity-5 px-10 py-10 rounded-2xl md:max-w-[85%] max-w-[94%] mx-auto my-4 md:my-6">
        <div className=" space-y-2">
          <div className="lg:text-3xl md:text-3xl text-xl   text-primary ">
            {t("header")}

          </div>

          <div className="lg:text-md md:text-md text-sm text-gray-400">
            {t("dateupdate")}
          </div>
          <div
            className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary"
            style={{ lineHeight: "1.7" }}
          >
            {t("container")}
          </div>
        </div>
        <div className=" space-y-2">
          <div className="lg:text-3xl md:text-3xl text-xl  text-primary ">
            {t("question_1")}
          </div>
          <div
            className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary"
            style={{ lineHeight: "1.7" }}
          >
            {t("description_1_question_1")}
            <div
              className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary"
              style={{ lineHeight: "1.7" }}
            >
              {t("description_2_question_1")}
            </div>
            <div
              className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary"
              style={{ lineHeight: "1.7" }}
            >
              {t("description_3_question_1")}
            </div>
            <div
              className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary"
              style={{ lineHeight: "1.7" }}
            >
              {t("description_4_question_1")}
            </div>
            <div
              className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary"
              style={{ lineHeight: "1.7" }}
            >
              {t("description_5_question_1")}
            </div>
          </div>
        </div>
        <div className=" space-y-2">
          <div className="lg:text-3xl md:text-3xl text-xl  text-primary ">
            {t("question_2")}
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>
            <div className=" text-ellipsis" style={{ lineHeight: "1.7" }}>
              {t("description_1_question_2")}
            </div>
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1  flex items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }} className=" text-ellipsis">
              {t("description_2_question_2")}
            </div>
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex  items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }}>
              {t("description_3_question_2")}
            </div>
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex  items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }}>
              {t("description_4_question_2")}
            </div>
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex  items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }}>
              {t("description_5_question_2")}
            </div>
          </div>
          <div
            style={{ lineHeight: "1.7" }}
            className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary"
          >
            {t("description_6_question_2")}
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex  items-center space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }}>
              {t("description_7_question_2")}
            </div>
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }}>
              {t("description_8_question_2")}
            </div>
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }}>
              {t("description_9_question_2")}
            </div>
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }}>
              {t("description_10_question_2")}
            </div>
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }}>
              {t("description_11_question_2")}
            </div>
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }}>
              {t("description_12_question_2")}
            </div>
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }}>
              {t("description_13_question_2")}
            </div>
          </div>

          <div
            style={{ lineHeight: "1.7" }}
            className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary"
          >
            {t("description_14_question_2")}
          </div>
          <div
            style={{ lineHeight: "1.7" }}
            className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary"
          >
            {t("description_15_question_2")}
          </div>
          <div
            style={{ lineHeight: "1.7" }}
            className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary"
          >
            {t("description_16_question_2")}
          </div>

          <div
            style={{ lineHeight: "1.7" }}
            className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary"
          >
            {t("description_17_question_2")}
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }}>
              {t("description_18_question_2")}
            </div>
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }}>
              {t("description_19_question_2")}
            </div>
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }}>
              {t("description_20_question_2")}
            </div>
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }}>
              {t("description_21_question_2")}
            </div>
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }}>
              {t("description_22_question_2")}
            </div>
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
            <div style={{ lineHeight: "1.7" }}>
              {t("description_23_question_2")}
            </div>
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }}>
              {t("description_24_question_2")}
            </div>
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }}>
              {t("description_25_question_2")}
            </div>
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }}>
              {t("description_26_question_2")}
            </div>
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
            <Image
              src={checkIcon}
              alt=""
              width={30} // Set a consistent width
              height={30} // Set a consistent height
              className="object-cover rounded-md"
            ></Image>

            <div style={{ lineHeight: "1.7" }}>
              {t("description_27_question_2")}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
