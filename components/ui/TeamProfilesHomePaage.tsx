import React from "react";
import { Phone, Mail } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChatModal } from "./chat-modal";

// Button component
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline";
  }
>(({ className, variant = "default", ...props }, ref) => (
  <button
    className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      variant === "default"
        ? "bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500"
        : "bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500"
    } ${className}`}
    ref={ref}
    {...props}
  />
));
Button.displayName = "Button";

// Card component
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`bg-white rounded-xl  border shadow-slate-50 overflow-hidden ${className}`}
    {...props}
  />
));
Card.displayName = "Card";

// CardContent component
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 ${className}`} {...props} />
));
CardContent.displayName = "CardContent";

// Main TeamProfiles component
export default function TeamProfilesHomePage() {
  const t = useTranslations("HomePage"); // Hook to access translations
  const profiles = [
    {
      name: t("Consult_with_our_team.Chen_Phirum"),
      role: t("Consult_with_our_team.role-director"),
      description:
        "I have over 4 years of experience as a Software Engineer across various industries.",
      image: "/home/derector.png",
      phone:"+85512998919",
      email:"phirum.iti@gmail.com"
    },
    {
      name: t("Consult_with_our_team.Reksmey-Mom"),
      role: t("Consult_with_our_team.role-Office"),
      description:
        "As an experienced Cybersecurity professional, I'm more than happy to guide you on the right path.",
      image: "/home/cher-smey.jpg",
      phone:"+85595990910",
      email:""
    },
    {
      name: t("Consult_with_our_team.Chhaya-Chan"),
      role: t("Consult_with_our_team.role-instructor"),
      description:
        "In addition to being a Data Analyst, I'm open to answering any questions related to data science.",
      image: "/home/cher-chhaya-chan.png",
      phone:"",
      email:""
    },
    {
      name: t("Consult_with_our_team.Keo-KAY"),
      role: t("Consult_with_our_team.role-instructor"),
      description:
        "With my 5 years of experience in this field, I'm confident that I can guide you to the best roadmap.",
      image: "/home/cher-kavkeo.jpg",
      phone:"",
      email:""
    },
  ];

  return (
    <div className="px-4  max-w-7xl mx-auto  md:my-6 mb-6 md:mb-0 lg:mb-0">
      <div className="max-w-7xl   mx-auto my-4 md:my-6 flex  justify-start items-center">
        <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold text-center mb-2 text-textprimary">
          {t("ExpertConsultation.title")}
          <span className="text-primary">
            {t("ExpertConsultation.highlight")}
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:py-6 md:py-6 py-0 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {profiles.map((profile, index) => (
          <Card key={index}>
            <div className="relative w-full h-[250px] ">
              <Image
                src={profile.image}
                alt={`${profile.name} - ${profile.role}`}
                width={200}
                height={200}
                className="object-cover w-full h-full "
              />
            </div>
            <CardContent className="">
              <div>
                <h2 className="font-semibold text-gray-700 text-xl">{profile.name}</h2>
                <p className="text-gray-600 py-2">{profile.role}</p>
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <div className="flex gap-4">
                  <a href={`tel:${profile.phone}`}
                    className="text-gray-600 "
                    aria-label="Call"
                  >
                    <Phone className="w-5 h-5 text-primary" />
                  </a>
                  <a  href={`mailto:${profile.email}`}
                    className="text-gray-600 "
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5 text-primary " />
                  </a>
                </div>
                <ChatModal />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
