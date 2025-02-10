import React from "react";
import Button from "../AuthComponents/ButtonComponentForAuth";
import { useTranslations } from "next-intl"; // Import the translation hook

type LogoutComponentProps = {
  onClose: () => void;
  onConfirm: () => void;
};

const LogoutComponent: React.FC<LogoutComponentProps> = ({ onClose, onConfirm }) => {
  const t = useTranslations(); // Specify the translation namespace
  return (
    <section className="w-full mx-5 lg:mx-0 lg:w-2/6  bg-white  rounded-xl">
      <div className="p-6">
        {/* <button className="text-3xl"><IoMdClose /></button> */}
        <h1 className="text-2xl lg:text-2xl text-primary font-bold ">{t("SideBarProfile.modalLogout.title")}</h1>
        <p className="text-lg pt-3 text-textprimary">{t("SideBarProfile.modalLogout.description")}</p>
        <div className="flex  gap-5 mt-5 flex-row-reverse ">
          <Button
            type="button"
            text={t("SideBarProfile.modalLogout.confirm")}
            onClick={onConfirm} // Confirm the logout
            className=" bg-primary hover:bg-primary-dark text-white font-medium border-collapse"
          />
            <Button
              type="button"
              text={t("SideBarProfile.modalLogout.cancel")}
              onClick={onClose} // Close the modal
              className=" border  text-red-500 font-medium border-collapse flex items-center justify-center" // Center the icon
            />
        </div>
      </div>
      
    </section>
  );
};

export default LogoutComponent;