import { useState, useEffect } from "react";

const mobileSetter = () => {
  const [windowWidth, setWindowWidth] = useState();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchWidth = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener("resize", searchWidth);
      searchWidth();
      return () => window.removeEventListener("resize", searchWidth);
    }
  }, []);
  useEffect(() => {
    if (windowWidth < 992) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [windowWidth]);
  return {
    isMobile,
  };
};

export default mobileSetter;