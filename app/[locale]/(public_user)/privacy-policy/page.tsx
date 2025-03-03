import { useTranslations } from "next-intl";
import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";

export default function Page() {
  const e = useTranslations("Policys"); // Hook to access translations
  return (
    <div className="lg:max-w-[80%] md:max-w-[85%] max-w-[94%] mx-auto my-4 md:my-6">
      <div className=" space-y-2">
        <div className="lg:text-3xl md:text-3xl text-xl   text-primary ">{e("header")}</div>
        <div className="lg:text-md md:text-md text-sm text-gray-400">
        {e("dateupdate")}
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary">
        {e("container")}
        </div>
      </div>
      <div className=" space-y-2">
        <div className="lg:text-3xl md:text-3xl text-xl  text-primary ">
        {e("question_1")}
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary">
        {e("description_1_question_1")}
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary">
          {e("description_2_question_1")}
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary">
          {e("description_3_question_1")}
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary">
          {e("description_4_question_1")}
          </div>
          <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 text-textprimary">
          {e("description_5_question_1")}
          </div>
        </div>
      </div>
      <div className=" space-y-2">
        <div className="lg:text-3xl md:text-3xl text-xl  text-primary ">
        {e("question_2")}
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
          <LuLayoutDashboard className="text-secondary w-5 h-5" />
          <div className=" text-ellipsis">
          {e("description_1_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1  flex items-start space-x-3 text-textprimary">
          <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_2_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex  items-start space-x-3 text-textprimary">
       <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_3_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex  items-start space-x-3 text-textprimary">
       <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_4_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex  items-start space-x-3 text-textprimary">
       <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_5_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
        {e("description_6_question_2")}
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex  items-center space-x-3 text-textprimary">
       <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_7_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_8_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_9_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_10_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_11_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_12_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_13_question_2")}
          </div>
        </div>

        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
        {e("description_14_question_2")}
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
        {e("description_15_question_2")}
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
        {e("description_16_question_2")}
        </div>

        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
        {e("description_17_question_2")}
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_18_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_19_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_20_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_21_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_22_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
          <div>
          {e("description_23_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_24_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_25_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_26_question_2")}
          </div>
        </div>
        <div className="lg:text-xl md:text-xl text-sm lg:py-3 md:py-3 py-1 flex items-start space-x-3 text-textprimary">
         <div ><LuLayoutDashboard className="text-secondary lg:w-5 lg:h-5 md:w-5 md:h-5 w-3.5 h-3.5" /></div>
          <div>
          {e("description_27_question_2")}
          </div>
        </div>
      </div>
    </div>
  );
}
