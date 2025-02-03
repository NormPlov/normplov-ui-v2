"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useGetUserQuery } from "@/redux/service/user";
import { useTranslations } from "next-intl";
import useHandleResultUuid from "@/components/General/Hook/useHandleResultUuid";

interface NavbarTranslationKeys {
  navLinks: {
    home: string;
    test: string;
    university: string;
    jobs: string;
    privacyPolicy: string;
    aboutUs: string;
  };
  buttons: {
    signIn: string;
    khmerLanguage: string;
    englishLanguage: string;
  };
}

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & string]: ObjectType[Key] extends object
  ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
  : Key;
}[keyof ObjectType & string];

// function getRandomColor(username: string) {
//   // Generate a random color based on the username
//   const colors = [
//     "bg-orange-500",
//     "bg-blue-500",
//     "bg-green-500",
//     "bg-yellow-500",
//     "bg-purple-500",
//     "bg-pink-500",
//     "bg-amber-500",
//     "bg-lime-500",
//     "bg-emerald-500",
//     "bg-teal-500",
//     "bg-cyan-500",
//     "bg-sky-500",
//     "bg-indigo-500",
//     "bg-violet-500",
//     "bg-fuchsia-500",
//     "bg-rose-500",
//   ];
//   const index = username.charCodeAt(0) % colors.length;
//   return colors[index];
// }

export default function NavbarPage() {
  const router = useRouter(); // Using Next.js router
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState<string>("km");
  //const { i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Fetch user data
  const { data, isLoading } = useGetUserQuery(); // Include loading and error sta
  //console.log("data: " + data);
  //console.log("isLoading: " + isLoading);
  //console.log("isError: " + isError);
  //console.log("user data", data);
  //console.log("user avatar1", data?.payload.avatar);
  const userData = data?.payload;
  // const avatarUrl = userData?.avatar
  //   ? `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${userData.avatar}`
  //   : null;

  const avatarUrl = userData?.avatar
    ? userData.avatar.startsWith("http")
      ? userData.avatar // Use full URL as-is
      : `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${userData.avatar}` // Prepend base URL for relative path
    : "/auth/personplaceholder.png"; // Fallback to placeholder
   

  // const { locale } = useParams();
  // const currentLocale = locale || 'en'; // Default to 'en' if locale is not defined
  const t = useTranslations<NestedKeyOf<NavbarTranslationKeys>>();
  

  useEffect(() => {
    // Check if the route has /en or /km in the URL
    const languageFromUrl = pathname.split("/")[1];

    // If the route includes '/en' or '/km', proceed to check sessionStorage
    if (languageFromUrl === "en" || languageFromUrl === "km") {
      const language = sessionStorage.getItem("language");

      if (language) {
        setCurrentLocale(language);
      } else {
        // If no language in sessionStorage, set it to 'km' by default
        sessionStorage.setItem("language", languageFromUrl);
        setCurrentLocale(languageFromUrl);
      }
    } else {
      // Default to 'km' if no valid language prefix in the URL
      sessionStorage.setItem("language", "km");
      setCurrentLocale("km");
    }

    // Cleanup when component unmounts, which will be triggered when the page is closed or refreshed
    return () => {
      sessionStorage.removeItem("language");
    };
  }, [pathname]);

  const handleLanguageChange = (lang: string) => {
    localStorage.setItem("language", lang); // Save language to localStorage
    setCurrentLocale(lang); // Update state to reflect the selected language
    const updatedPathname = pathname.replace(`/${currentLocale}`, ""); // Remove old locale
    router.push(`/${lang}${updatedPathname}`); // Navigate to the new language
  };

  const navLinks = [
    { href: "/", label: t("Navbar.navLinks.home") },
    { href: "/test", label: t("Navbar.navLinks.test") },
    { href: "/university", label: t("Navbar.navLinks.university") },
    { href: "/jobs", label: t("Navbar.navLinks.jobs") },
    { href: "/privacy-policy", label: t("Navbar.navLinks.privacyPolicy") },
    { href: "/about-us", label: t("Navbar.navLinks.aboutUs") },
  ];

  useHandleResultUuid();
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://normplov-apistad.co/api/v1/user/me", {
  //         method: "GET",
  //         headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //         },
  //         credentials: "include", // Include cookies if needed
  //     });
  //     } catch (error) {
  //         console.error("Error fetching data:", error);
  //     }
  // };

  // If `locale` is not available, you can set a default value
  return (
    <div className="w-full sticky top-0 z-50 bg-slate-50 border-b border-b-slate-100">
      <header className="flex items-center justify-between py-3 px-2 md:px-6 lg:px-8  mx-auto">
        {/* Logo and Navigation Links */}
        <div className="flex items-center space-x-6 lg:space-x-8">
          {/* Logo */}
          <Link
            href={`/${currentLocale}`}
            className="text-lg lg:text-xl text-green-700 font-bold"
          >
            <Image
              src="/assets/logo.jpg"
              alt="Logo"
              width={200}
              height={200}
              className="object-contain lg:w-[50px] md:w-[50px] w-[40px] lg:block md:block hidden "
            />
            <Image
              src="/assets/logo-text.jpg"
              alt="Logo"
              width={1000}
              height={1000}
              className="w-[140px] lg:hidden md:hidden block "
            ></Image>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8 ">
            {navLinks.map((link) => {
              const isActive = pathname === `/${currentLocale}${link.href}`;
              return (
                <Link
                  key={link.href}
                  href={`/${currentLocale}${link.href}`}
                  className={`text-base lg:text-lg ${
                    isActive
                      ? "text-green-700    "
                      : "text-textprimary hover:text-green-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Language Selector and Sign-in */}
        <div className="hidden md:flex lg:flex items-center space-x-6">
          {/* LanguageSelector hidden on md (iPad) */}
          <LanguageSelector handleLanguageChange={handleLanguageChange} />
          {/* Sign in button */}
          {/* {
            isLoading ?(
              <Link
              href={`/${currentLocale}/login`}
              className="bg-emerald-500 text-white text-base lg:text-lg rounded-xl px-5 py-2"
            >
              {t("Navbar.buttons.signIn")}
            </Link>
            //   <Image
            //   src="/auth/personplaceholder.png"
            //   alt="Loading Avatar"
            //   width={40}
            //   height={40}
            //   className="w-[35px] h-[35px] object-cover rounded-full"
            // />
            ):data ? (
            <div className="flex items-center space-x-4">
              <div className="border-2 border-primary bg-[#fdfdfd] rounded-full p-1">
                <Link href={`/${currentLocale}/profile-about-user`}>
                
                    <Image
                      src={avatarUrl || "/auth/personplaceholder.png"}
                      alt="User Avatar"
                      width={2000}
                      height={2000}
                      className="w-[35px] h-[35px] object-cover rounded-full"
                    />
                </Link>
              </div>
            </div>
          ) : (
            <Link
              href={`/${currentLocale}/login`}
              className="bg-emerald-500 text-white text-base lg:text-lg rounded-xl px-5 py-2"
            >
              {t("Navbar.buttons.signIn")}
            </Link>
          )} */}
          {isLoading ? (
            // Show loading state while fetching user data
            <div className="flex items-center">
              {isLoading ? (
                <Link
                  href={`/${currentLocale}/login`}
                  className="bg-emerald-500 text-white rounded-xl px-5 py-2"
                >
                  {t("Navbar.buttons.signIn")}
                </Link>
              ) : (
                  
                <Image
                  src="/auth/personplaceholder.png"
                  alt="Loading"
                  width={35}
                  height={35}
                  className="w-full h-full rounded-full animate-pulse"
                />
              )}
            </div>
          ) : isLoading || !data ? (
            // If the user is not logged in or an error occurs, show the Login button
            <Link
              href={`/${currentLocale}/login`}
              className="bg-emerald-500 text-white rounded-xl lg:px-5 md:px-3 py-2"
            >
              {t("Navbar.buttons.signIn")}
            </Link>
          ) : (
            // If the user is logged in, show their profile
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 border-2 border-primary bg-[#fdfdfd] rounded-full p-1">
                <Link href={`/${currentLocale}/profile-about-user`}>
                  <Image
                    src={avatarUrl}
                    alt="User Avatar"
                    width={35}
                    height={35}
                    className="object-cover rounded-full w-full h-full"
                   
                  />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="w-full md:hidden px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${currentLocale}${link.href}`}
                className={`text-base ${pathname === link.href
                    ? "text-green-700 font-bold"
                    : "text-textprimary hover:text-green-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between">
            <LanguageSelector handleLanguageChange={handleLanguageChange} />
            {data ? (
              <div className="flex items-center space-x-4">
                <div className="border-2 border-primary bg-[#fdfdfd] rounded-full p-1">
                  <Link href={`/${currentLocale}/profile-about-user`}>
                  
                    <Image
                      src={avatarUrl || "/auth/personplaceholder.png"} // Fallback to default avatar if null
                      alt="User Avatar"
                      width={2000}
                      height={2000}
                      className="w-[35px] h-[35px] object-cover rounded-full"
                    />
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                href={`/${currentLocale}/login`}
                className="bg-emerald-500 text-white text-base lg:text-lg rounded-xl px-5 py-2"
              >
                {t("Navbar.buttons.signIn")}
              </Link>
                
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function LanguageSelector({
  handleLanguageChange,
}: {
  handleLanguageChange: (lang: string) => void;
}) {
  const t = useTranslations<NestedKeyOf<NavbarTranslationKeys>>();
  return (
    <div className="flex items-center lg:space-x-4 md:space-x-2 space-x-4">
      <button onClick={() => handleLanguageChange("km")}>
        <LanguageOption
          flag="/assets/khmer-flag.png"
          label={t("Navbar.buttons.khmerLanguage")}
        />
      </button>
      <div className="h-6 border-l border-slate-400 "></div>
      <button onClick={() => handleLanguageChange("en")}>
        <LanguageOption
          flag="/assets/english-flag.png"
          label={t("Navbar.buttons.englishLanguage")}
        />
      </button>
    </div>
  );
}

function LanguageOption({ flag, label }: { flag: string; label: string }) {
  return (
    <div className="flex items-center space-x-2  ">
      <Image
        src={flag}
        alt={`${label} flag`}
        width={24}
        height={24}
        className="w-6 h-6 object-cover rounded-full"
      />
      <span className="text-base lg:text-lg text-textprimary lg:block md:hidden block">
        {label}
      </span>
    </div>
  );
}
