// useHandleResultUuid.ts (Custom Hook)
import { useEffect } from "react";
import { usePathname } from "next/navigation"; // To get the current route path

const useHandleResultUuid = () => {
  const pathname = usePathname(); // Get the current route path

  useEffect(() => {
    // Check if we are on /test-result or /chat-with-ai route with a uuid parameter
    const matchTestResult = pathname.match(/\/(en|km)?\/test-result\/([^/]+)/);
    const matchChatWithAi = pathname.match(/\/(en|km)?\/chat-with-ai\/([^/]+)/);
    const matchAllTest = pathname.match(/\/(en|km)?\/test\/all/);

    if (!(matchTestResult || matchChatWithAi)) {
      localStorage.removeItem("resultUuid");
    }

    if(!(matchAllTest)) {
      localStorage.removeItem("personality");
      localStorage.removeItem("interest");
      localStorage.removeItem("skill");
      localStorage.removeItem("value");
      localStorage.removeItem("learningStyle");
    }
  }, [pathname]);
};

export default useHandleResultUuid;
