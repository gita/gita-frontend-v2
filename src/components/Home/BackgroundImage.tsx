"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
    <>
      <div className="absolute top-[204px] z-0 h-[460px] w-full">
        <Image src="/main-background.png" alt="background image" fill />
      </div>
      <Image
        src="/flower.svg"
        alt="flower"
        width={365}
        height={150}
        className="absolute left-[50%] top-[54%] -translate-x-2/4"
      />
    </>
  );
};

export default BackgroundImage;
