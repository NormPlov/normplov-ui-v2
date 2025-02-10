"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function ChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("HomePage"); // Hook to access translations
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full border border-primary text-primary w-32 h-9"
        >
          {t("Consult_with_our_team.btn")}
        </Button>
      </DialogTrigger>
      <DialogContent className=" bg-white flex flex-col lg:w-full md:w-full w-[350px] items-center p-6 text-center">
        <div className="  ">
          <div className=" flex justify-center  mb-4    ">
            <Image
              src="/home/comingsoon.png"
              alt="Coming Soon"
              width={1000}
              height={1000}
              className=" w-[150px] h-auto"
            />
          </div>
          <div>
            <h2 className="lg:text-3xl md:text-3xl text-2xl font-bold text-primary">
              {t("Consult_with_our_team.Will be available soon")}
            </h2>
          </div>
        </div>
        <p className="text-gray-600 -mt-1 lg:text-xl md:text-xl text-lg">
          {t("Consult_with_our_team.description")}
        </p>
      </DialogContent>
    </Dialog>
  );
}
