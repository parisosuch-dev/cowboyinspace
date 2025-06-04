"use client";

import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";

import { useState, useEffect } from "react";

import { useTheme } from "next-themes";

export default function DarkModeStars() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (resolvedTheme !== "dark") return null;

  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none">
      <ShootingStars starWidth={50} minDelay={5000} maxDelay={10000} />
      <StarsBackground starDensity={0.001} />
    </div>
  );
}
