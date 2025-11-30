"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const BackgroundImage = () => {
  const [renderImage, setRenderImage] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    setRenderImage(theme === "light");
  }, [theme]);

  if (!renderImage) {
    return null;
  }

  return (
    <div className="absolute top-[204px] z-0 h-[460px] w-full">
      <Image src="/main-background.png" alt="" fill aria-hidden="true" />
    </div>
  );
};

export default BackgroundImage;
