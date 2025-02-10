"use client";

import { useEffect, useState } from "react";
import { ArrowUp, MessageSquareText } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const FloatingButtons = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<string>('km');


  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLocale(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavigation = () => {
    const newPath = `/${currentLocale}/chat-with-ai`;

    // Ensure the new path does not contain the duplicate locale part
    if (!pathname.startsWith(`/${currentLocale}`)) {
      // If the pathname doesn't include the current locale, add it
      router.push(newPath);
    } else {
      // If the pathname already includes the locale, navigate to the result directly
      router.push(newPath);
    }
  };

  const isResultTestRoute = pathname.includes("/test-result/");

  return (
    <div className="fixed right-4 flex flex-col items-end space-y-4 ">
      {/* Back to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-4 bg-green-500 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Navigation Button */}
      {isResultTestRoute && (
        <button
          onClick={handleNavigation}
          className={`bg-secondary text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition ${isVisible ? "bottom-20" : "bottom-4"
            }`}
          style={{
            position: "fixed",
          }}
          aria-label="Chat"
          title="Chat"
        >
          <MessageSquareText className="w-6 h-6" />
        </button>
      )

      }

    </div>
  );
};

export default FloatingButtons;
