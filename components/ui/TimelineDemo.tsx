import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { BorderBeam } from "./border-beam";
import { useTranslations } from "next-intl";

export function TimelineDemo() {
    const t = useTranslations("HomePage"); // Hook to access translations
  const data = [
    {
      title: t("Process.steps.0.number"),
      content: (
        <div>
          <p className="text-gray-600 dark:text-neutral-300 lg:text-xl md:text-xl text-md font-normal mb-8">
            {t("Process.steps.0.description-part1")}
            <span className="text-primary bg-primary bg-opacity-5 rounded-[8px] px-2 py-1  ">
            {t("Process.steps.0.description-part2")}
            </span>{" "}
            {t("Process.steps.0.description-part3")}{" "}
            <span className="text-primary bg-primary bg-opacity-5 rounded-[8px] px-2 py-1">
            {t("Process.steps.0.description-part4")}
            </span>{" "}
            {t("Process.steps.0.description-part5")}{" "}
            <span className="text-secondary bg-secondary bg-opacity-5 rounded-[8px]  py-0">
            {t("Process.steps.0.description-part6")}
            </span>{" "}
            {t("Process.steps.0.description-part7")}
          </p>
          <div className="grid lg:grid-cols-1 md:grid-cols-1 gap-4">
            <div className="relative border-dashed border  border-slate-200 rounded-xl p-2.5">
              <Image
                src="/assets/login-home.gif"
                alt="login"
                width={1000}
                height={1000}
                className="rounded-xl object-fill h-auto  md:h-auto lg:h-auto w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <BorderBeam
                anchor={20}
                colorFrom="#0BBB8A"
                colorTo="#FFA500"
                delay={10}
                borderWidth={1}
              />
            </div>
            
          </div>
        </div>
      ),
    },
    {
      title: t("Process.steps.1.number"),
      content: (
        <div>
          <p className="text-gray-600 dark:text-neutral-300 lg:text-xl md:text-xl text-md font-normal mb-8">
          {t("Process.steps.1.description-part1")}{" "}

            <span className="text-primary bg-primary bg-opacity-5 rounded-[8px] px-2 py-1">
            {t("Process.steps.1.description-part2")}
            </span>{" "}
            {t("Process.steps.1.description-part3")}
          </p>
          
          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4 ">
            <div className="relative border-dashed border border-slate-200 rounded-xl p-2.5">
              <Image
                src="/home/test1.png"
                alt="hero template"
                width={1000}
                height={1000}
                className="rounded-xl  object-contain h-auto  md:h-auto lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <BorderBeam
                anchor={20}
                colorFrom="#0BBB8A"
                colorTo="#FFA500"
                delay={10}
                borderWidth={1}
              />
            </div>
            <div className="relative border-dashed border border-slate-200 rounded-xl p-2.5">
              <Image
                src="/home/test2.png"
                alt="hero template"
                width={1000}
                height={1000}
                className="rounded-xl  object-contain h-auto  md:h-auto lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <BorderBeam
                anchor={20}
                colorFrom="#0BBB8A"
                colorTo="#FFA500"
                delay={10}
                borderWidth={1}
              />
            </div>
            <div className="relative border-dashed border border-slate-200 rounded-xl p-2.5">
              <Image
                src="/home/test3.png"
                alt="hero template"
                width={1000}
                height={1000}
                className="rounded-xl  object-contain h-auto  md:h-auto lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <BorderBeam
                anchor={20}
                colorFrom="#0BBB8A"
                colorTo="#FFA500"
                delay={10}
                borderWidth={1}
              />
            </div>
            <div className="relative border-dashed border border-slate-200 rounded-xl p-2.5">
              <Image
                src="/home/test4.png"
                alt="hero template"
                width={1000}
                height={1000}
                className="rounded-xl  object-contain h-auto  md:h-auto lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <BorderBeam
                anchor={20}
                colorFrom="#0BBB8A"
                colorTo="#FFA500"
                delay={10}
                borderWidth={1}
              />
            </div>
            <div className="relative border-dashed border border-slate-200 rounded-xl p-2.5">
              <Image
                src="/home/test5.png"
                alt="hero template"
                width={1000}
                height={1000}
                className="rounded-xl  object-contain h-auto  md:h-auto lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <BorderBeam
                anchor={20}
                colorFrom="#0BBB8A"
                colorTo="#FFA500"
                delay={10}
                borderWidth={1}
              />
            </div>
            <div className="relative border-dashed border border-slate-200 rounded-xl p-2.5">
              <Image
                src="/home/test6.png"
                alt="hero template"
                width={1000}
                height={1000}
                className="rounded-xl  object-contain h-auto  md:h-auto lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              />
              <BorderBeam
                anchor={20}
                colorFrom="#0BBB8A"
                colorTo="#FFA500"
                delay={10}
                borderWidth={1}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t("Process.steps.2.number"),
      content: (
        <div className="">
          <p className="text-gray-600 dark:text-neutral-300 lg:text-xl md:text-xl text-md font-normal mb-4">
          {t("Process.steps.2.description")}
          </p>
        
          <div className="grid relative border-dashed border border-slate-200 grid-cols-1 gap-4 p-2.5 rounded-xl">
            <Image
              src="/home/test.gif"
              alt="hero template"
              width={1000}
              height={1000}
              className="rounded-xl object-fill  h-auto  md:h-auto lg:h-auto w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <BorderBeam
              anchor={20}
              colorFrom="#0BBB8A"
              colorTo="#FFA500"
              delay={10}
              borderWidth={1}
            />
            <BorderBeam
              anchor={20}
              colorFrom="#0BBB8A"
              colorTo="#FFA500"
              delay={10}
              borderWidth={1}
            />
            <BorderBeam
              anchor={20}
              colorFrom="#0BBB8A"
              colorTo="#FFA500"
              delay={10}
              borderWidth={1}
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full  ">
      <Timeline data={data} />
    </div>
  );
}
