import { useEffect, useState } from "react";

const useMediaQueries = (query: string) => {
  const media = window.matchMedia(query);
  const [isMediaMatches, setIsMediaMatches] = useState(media.matches);

  useEffect(() => {
    const resizeHandler = () => {
      setIsMediaMatches(media.matches);
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return isMediaMatches;
};

export default useMediaQueries;
