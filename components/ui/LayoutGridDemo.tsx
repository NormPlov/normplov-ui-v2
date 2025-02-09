"use client";
import React from "react";
import { LayoutGrid } from "../ui/layout-grid";
import { useTranslations } from "next-intl";

export function LayoutGridDemo() {

  return (
    <div className="h-screen  lg:py-20 md:py-20 w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
    const t = useTranslations("Abbout"); // Hook to access translations
  return (
    <div>
      <p className="font-bold md:text-3xl text-xl text-white">
      {t("SkeletonOne.header")}
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      {t("SkeletonOne.description")}
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
    const t = useTranslations("Abbout"); // Hook to access translations
  return (
    <div>
      <p className="font-bold md:text-3xl text-xl text-white">
        {t("SkeletonTwo.header")}
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      {t("SkeletonTwo.description")}
      </p>
    </div>
  );
};
const SkeletonThree = () => {
    const t = useTranslations("Abbout"); // Hook to access translations
  return (
    <div>
      <p className="font-bold md:text-3xl text-xl text-white">
        {t("SkeletonThree.header")}
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      {t("SkeletonThree.description")}
      </p>
    </div>
  );
};
const SkeletonFour = () => {
    const t = useTranslations("Abbout"); // Hook to access translations
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
      {t("SkeletonFour.header")}
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      {t("SkeletonFour.description")}
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "/assets/about/istad_01.png",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "/assets/about/istad_03.png",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "/assets/about/istad_04.png",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "/assets/about/istad_02.png",
  },
];
