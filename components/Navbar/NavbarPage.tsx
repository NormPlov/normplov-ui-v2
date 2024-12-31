"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useGetUserQuery } from "@/redux/service/user";
const navLinks = [
  { href: "/", label: "ទំព័រដើម" },
  { href: "/test", label: "តេស្ត" },
  { href: "/university", label: "គ្រឹះស្ថានសិក្សា" },
  { href: "/jobs", label: "ការងារ" },
  { href: "/privacy-policy", label: "ឯកជនភាព" },
  { href: "/about-us", label: "អំពីយើង" },
];

function getRandomColor(username: string) {
  // Generate a random color based on the username
  const colors = [
    "bg-orange-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-pink-300",
    "bg-amber-300",
    "bg-lime-300",
    "bg-emerald-300",
    "bg-teal-300",
    "bg-cyan-300",
    "bg-sky-300",
    "bg-indigo-300",
    "bg-violet-300",
    "bg-fuchsia-300",
    "bg-rose-300",
  ];
  const index = username.charCodeAt(0) % colors.length;
  return colors[index];
}


export default function NavbarPage() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    // Fetch user data
  const { data:user} = useGetUserQuery();
  console.log("user data",user)
  const userData=user?.payload
  const avatarUrl = userData?.avatar
  ? `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${userData.avatar}`
  : null;

  return (
    <div className="w-full bg-slate-50">
      <header className="flex items-center justify-between py-4 px-4 md:px-6 lg:px-8  mx-auto">
        {/* Logo and Navigation Links */}
        <div className="flex items-center space-x-6 lg:space-x-8">
          {/* Logo */}
            <Link
              href="/"
              className="text-lg lg:text-xl text-green-700 font-bold"
            >
             <Image
                src="/assets/logo.jpg"
                alt="Logo"
                width={200}
                height={200}
                className="object-contain lg:w-[50px] md:w-[50px] w-[40px]  "
              />
            </Link>
          

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base lg:text-lg ${
                  pathname === link.href
                    ? "text-green-700 font-bold  border-green-700"
                    : "text-gray-800 hover:text-green-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Language Selector and Sign-in */}
        <div className="hidden md:block lg:flex items-center space-x-6">
          {/* LanguageSelector hidden on md (iPad) */}
          <LanguageSelector />
          {/* Sign in button */}
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="border-2 border-primary bg-[#fdfdfd] rounded-full p-1">
              <Link href="/profile-quiz-history">
              {
                avatarUrl ?(
                  <Image
                  src={avatarUrl}
                  alt="User Avatar"
                  width={2000}
                  height={2000}
                  className="w-[35px] h-[35px] object-cover rounded-full"
                />
                ):(
                  <div
                      className={`w-12 h-12 flex items-center justify-center rounded-full text-white ${getRandomColor(
                        userData?.username || "U"
                      )}`}
                    >
                      {userData?.username.charAt(0).toUpperCase() || "U"}
                    </div>
                )
              }
                  {/* <Image
                    src={avatarUrl || "/default-avatar.png"} // Fallback to default avatar if null
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="w-12 h-12 object-cover rounded-full"
                  /> */}
              </Link>
              </div>
              
             
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-emerald-500 text-white text-base lg:text-lg rounded-xl px-5 py-2"
            >
              Sign in
            </Link>
          )}
          {/* <Link
            href="/login"
            className="bg-emerald-500 text-white text-base lg:text-lg rounded-xl px-5 py-2"
          >
            Sign in
          </Link> */}
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
                href={link.href}
                className={`text-base ${
                  pathname === link.href
                    ? "text-green-700 font-bold"
                    : "text-gray-800 hover:text-green-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between">
            <LanguageSelector />
            {user ? (
            <div className="flex items-center space-x-4">
              <div className="border-2 border-primary bg-[#fdfdfd] rounded-full p-1">
              <Link href="/profile-quiz-history">
                  <Image
                    src={avatarUrl || "/default-avatar.png"} // Fallback to default avatar if null
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
              href="/login"
              className="bg-emerald-500 text-white text-base lg:text-lg rounded-xl px-5 py-2"
            >
              Sign in
            </Link>
          )}
          </div>
        </div>
      )}
    </div>
  );
}

function LanguageSelector() {
  return (
    <div className="flex md:hidden lg:flex items-center space-x-4">
      <Link href="/">
      <LanguageOption flag="/assets/khmer-flag.png" label="Khmer" />
      </Link>
      <div className="h-6 border-l border-slate-400"></div>
      <Link href="/"><LanguageOption flag="/assets/english-flag.png" label="English" /></Link>
    </div>
  );
}

function LanguageOption({ flag, label }: { flag: string; label: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src={flag}
        alt={`${label} flag`}
        width={24}
        height={24}
        className="w-6 h-6 object-cover rounded-full"
      />
      <span className="text-base lg:text-lg text-gray-800">{label}</span>
    </div>
  );
}