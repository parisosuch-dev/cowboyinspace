"use client";

import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Header({
  title,
  subtext,
}: {
  title: string;
  subtext?: string;
}) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (theme === "light") {
    return (
      <div className="h-[7rem] sm:h-[10rem]  rounded-md dark:bg-white bg-neutral-900 flex flex-col text-left p-4 justify-center relative font-mono">
        <h1 className="relative z-10 text-2xl md:text-5xl dark:text-neutral-900 text-white font-semibold">
          {title}
        </h1>
        {subtext ? (
          <p className="dark:text-neutral-900 text-white text-xs sm:text-sm mt-1 sm:mt-2">
            {subtext}
          </p>
        ) : null}
        <ShootingStars />
        <StarsBackground />
      </div>
    );
  }
  return (
    <div className="h-[7rem] sm:h-[10rem]  rounded-md dark:bg-white bg-neutral-900 flex flex-col text-left p-4 justify-center relative font-mono">
      <h1 className="relative z-10 text-2xl md:text-5xl dark:text-neutral-900 text-white font-semibold">
        {title}
      </h1>
      {subtext ? (
        <p className="dark:text-neutral-900 text-white text-xs sm:text-sm mt-1 sm:mt-2">
          {subtext}
        </p>
      ) : null}
    </div>
  );
}
