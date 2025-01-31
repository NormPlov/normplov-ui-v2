"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BouncingSplashScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited"); // ✅ sessionStorage resets when the browser closes

    if (!hasVisited) {
      setLoading(true); // ✅ Show splash screen only on first visit in the session
      sessionStorage.setItem("hasVisited", "true"); // ✅ Set session flag (prevents splash on refresh)
      setTimeout(() => {
        setTimeout(() => {
          setLoading(false); // ✅ Hide splash screen after animation
          //router.replace("/home"); // ✅ Redirect to homepage after splash
        }, 4000); // Adjust duration as needed
        router.replace("/");
      }, 4000);
    }
  }, [router]);

  // 🔥 If the splash screen has already been shown in this session, immediately return the main content
  if (!loading) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 4000 }}
      className="fixed inset-0 flex bg-[#0BBB8A] flex-col items-center justify-center text-white overflow-hidden"
    >
      {/* 🎥 Background GIF Animation */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/logo.gif"
          alt="Background Animation"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      </div>
    </motion.div>
  );
}
