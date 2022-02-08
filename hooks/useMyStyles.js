import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function useMyStyles() {
  const [styles, setStyles] = useState({
    fontSize: {
      heading: "text-3xl",
      subHeading1: "text-2xl",
      subHeading2: "text-xl",
      para: "text-md",
    },
    lineHeight: "leading-none",
    backgroundColor: "bg-light-bg",
  });
  const { fontSize, spacing, bg } = useSelector((state) => state.settings);

  useEffect(() => {
    if (fontSize === "large") {
      setStyles((prevStyles) => {
        return {
          ...prevStyles,
          fontSize: {
            heading: "text-3xl",
            subHeading1: "text-2xl",
            subHeading2: "text-xl",
            para: "text-md",
          },
        };
      });
    }
    if (fontSize == "small") {
      setStyles((prevStyles) => {
        return {
          ...prevStyles,
          fontSize: {
            heading: "text-2xl",
            subHeading1: "text-xl",
            subHeading2: "text-md",
            para: "text-sm",
          },
        };
      });
    }
    if (spacing === "large") {
      setStyles((prevStyles) => {
        return { ...prevStyles, lineHeight: "leading-loose" };
      });
    }
    if (spacing === "medium") {
      setStyles((prevStyles) => {
        return { ...prevStyles, lineHeight: "leading-normal" };
      });
    }
    if (spacing === "small") {
      setStyles((prevStyles) => {
        return { ...prevStyles, lineHeight: "leading-none" };
      });
    }
    if (bg === "bg-dark-bg") {
      setStyles((prevStyles) => {
        return { ...prevStyles, backgroundColor: "bg-dark-bg" };
      });
    }
    if (bg === "bg-light-bg") {
      setStyles((prevStyles) => {
        return { ...prevStyles, backgroundColor: "bg-light-bg" };
      });
    }
    if (bg === "bg-yellow-bg") {
      setStyles((prevStyles) => {
        return { ...prevStyles, backgroundColor: "bg-yellow-bg" };
      });
    }
  }, [fontSize, spacing, bg]);

  return styles;
}
export default useMyStyles;
