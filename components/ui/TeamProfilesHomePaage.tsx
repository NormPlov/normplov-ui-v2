import React from "react";
import { Phone, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
    className={`bg-white rounded-lg  border shadow-slate-50 overflow-hidden ${className}`}
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
  const profiles = [
    {
      name: "Jocelyn Schleifer",
      role: "Software Engineer",
      description:
        "I have over 4 years of experience as a Software Engineer across various industries.",
      image: "/assets/team-test-01.png",
    },
    {
      name: "Jocelyn Schleifer",
      role: "Cyber Security",
      description:
        "As an experienced Cybersecurity professional, I'm more than happy to guide you on the right path.",
      image: "/assets/team-test-02.png",
    },
    {
      name: "Jocelyn Schleifer",
      role: "Data Analyst",
      description:
        "In addition to being a Data Analyst, I'm open to answering any questions related to data science.",
      image: "/assets/team-test-03.png",
    },
    {
      name: "Jocelyn Schleifer",
      role: "Software Engineer",
      description:
        "With my 5 years of experience in this field, I'm confident that I can guide you to the best roadmap.",
      image: "/assets/team-test-04.png",
    },
  ];

  return (
    <div className="px-4  max-w-7xl mx-auto  md:my-6 mb-6 md:mb-0 lg:mb-0">
      <div className="max-w-7xl   mx-auto my-4 md:my-6 flex  justify-center items-center">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-2 text-textprimary">
        ពិគ្រោះយោបល់ជាមួយក្រុមអ្នកជំនាញរបស់<span className="text-primary">នាំផ្លូវ</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:py-6 md:py-6 py-0 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {profiles.map((profile, index) => (
          <Card key={index}>
            <div className="relative ">
              <Image
                src={profile.image}
                alt={`${profile.name} - ${profile.role}`}
                width={200}
                height={200}
                className="object-cover w-full "
              />
            </div>
            <CardContent className="">
              <div>
                <h2 className="font-semibold text-xl">{profile.name}</h2>
                <p className="text-gray-600 py-2">{profile.role}</p>
              </div>
              <p className="text-sm text-gray-600">{profile.description}</p>
              <div className="flex items-center justify-between pt-4">
                <div className="flex gap-4">
                  <button
                    className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    aria-label="Call"
                  >
                    <Phone className="w-5 h-5 text-primary" />
                  </button>
                  <button
                    className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5 text-primary " />
                  </button>
                </div>
                <Link  href="/" className=" rounded-full border border-primary text-primary w-24 h-9 flex justify-center items-center">ណាត់ជួប</Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
