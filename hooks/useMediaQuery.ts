import { useEffect, useState } from "react";

export default function useMediaQuery(query: string) {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleViewPortWidthChange = () => setIsMatch(mediaQuery.matches);

    setIsMatch(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleViewPortWidthChange);

    return () =>
      mediaQuery.removeEventListener("change", handleViewPortWidthChange);
  }, [query]);

  return isMatch;
}
