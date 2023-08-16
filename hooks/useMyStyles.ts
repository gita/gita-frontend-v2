import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers/rootReducer";
function useMyStyles() {
  const [styles, setStyles] = useState({
    fontSize: {
      heading: "text-4xl",
      subHeading1: "text-3xl",
      subHeading2: "text-2xl",
      para: "text-xl",
    },
    lineHeight: "leading-none",
    backgroundColor: "light-bg",
  });
  const { fontSize, spacing, bg } = useSelector(
    (state: RootState) => state.settings
  );

  useEffect(() => {
    if (fontSize === "large") {
      setStyles((prevStyles) => {
        return {
          ...prevStyles,
          fontSize: {
            heading: "text-4xl",
            subHeading1: "text-intro",
            subHeading2: "text-xl",
            para: "text-paragraph",
          },
        };
      });
    }
    if (fontSize == "small") {
      setStyles((prevStyles) => {
        return {
          ...prevStyles,
          fontSize: {
            heading: "text-3xl",
            subHeading1: "text-2xl",
            subHeading2: "text-paragraph",
            para: "text-base",
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
        return { ...prevStyles, backgroundColor: "dark-bg" };
      });
    }
    if (bg === "bg-light-bg") {
      setStyles((prevStyles) => {
        return { ...prevStyles, backgroundColor: "white" };
      });
    }
    if (bg === "bg-yellow-bg") {
      setStyles((prevStyles) => {
        return { ...prevStyles, backgroundColor: "yellow-bg" };
      });
    }
  }, [fontSize, spacing, bg]);

  return styles;
}
export default useMyStyles;
