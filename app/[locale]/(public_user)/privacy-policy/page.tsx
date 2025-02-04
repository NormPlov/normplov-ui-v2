import { useTranslations } from "next-intl";
import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";

export default function Page() {
  const t = useTranslations("Policy"); // Hook to access translations
  return (
    <div className="lg:max-w-7xl md:max-w-2xl max-w-[350px] mx-auto my-4 md:my-6">
      <div className=" space-y-2">
        <div className="lg:text-3xl md:text-3xl text-xl   text-primary ">{t("header")}</div>
        <div className="lg:text-md md:text-md text-sm text-gray-400">
        {t("dateupdate")}
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary">
        {t("container")}
        </div>
      </div>
      <div className=" space-y-2">
        <div className="lg:text-3xl md:text-3xl text-xl  text-primary ">
        {t("question_1")}
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary">
        {t("description_1_question_1")}
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary">
          {t("description_2_question_1")}
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary">
          {t("description_3_question_1")}
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary">
          {t("description_4_question_1")}
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary">
          {t("description_5_question_1")}
          </div>
        </div>
      </div>
      <div className=" space-y-2">
        <div className="lg:text-3xl md:text-3xl text-xl  text-primary ">
        {t("question_2")}
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
          <LuLayoutDashboard className="text-secondary w-5 h-5" />
          <div className=" text-ellipsis">
          {t("description_1_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1  flex items-start space-x-3 text-textprimary">
          <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_2_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex  items-start space-x-3 text-textprimary">
       <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_3_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex  items-start space-x-3 text-textprimary">
       <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_4_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex  items-start space-x-3 text-textprimary">
       <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_5_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
        {t("description_6_question_2")}
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex  items-center space-x-3 text-textprimary">
       <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_7_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_8_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_9_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_10_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_11_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_12_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_13_question_2")}
          </div>
        </div>

        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
        {t("description_14_question_2")}
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
        {t("description_15_question_2")}
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
        {t("description_16_question_2")}
        </div>

        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
        {t("description_17_question_2")}
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_18_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_19_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_20_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_21_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_22_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
          <div>
          {t("description_23_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_24_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_25_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_26_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {t("description_27_question_2")}
          </div>
        </div>
      </div>
    </div>
  );
}
