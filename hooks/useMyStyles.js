import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function useMyStyles() {
  const [styles, setStyles] = useState({
    heading: "text-3xl",
    subHeading1: "text-2xl",
    subHeading2: "text-xl",
    para: "text-md",
  });
  const { fontSize } = useSelector((state) => state.settings);

  useEffect(() => {
    if (fontSize === "large") {
      setStyles({
        heading: "text-3xl",
        subHeading1: "text-2xl",
        subHeading2: "text-xl",
        para: "text-md",
      });
    }
    if (fontSize == "small") {
      setStyles({
        heading: "text-2xl",
        subHeading1: "text-xl",
        subHeading2: "text-md",
        para: "text-sm",
      });
    }
  }, [fontSize]);

  return styles;
}
export default useMyStyles;
