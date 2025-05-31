"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function Nav() {
  interface Route {
    path: string;
    title: string;
  }
  interface Social {
    url: string;
    title: string;
  }

  const pathName = usePathname();

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const routes: Route[] = [
    { path: "/", title: "Home" },
    { path: "/blog", title: "Blog" },
    { path: "/setup", title: "My setup" },
    { path: "/books", title: "Readings" },
  ];
  const socials: Social[] = [
    { url: "https://github.com/parisosuch-dev", title: "Github" },
    { url: "https://linkedin.com/in/parisosuch", title: "LinkedIn" },
  ];

  const styling = "font-mono text-xs sm:text-base tracking-wider";
  const activeStyling = styling + " underline";

  const themeButtonStyling = "hover:cursor-pointer w-5 h-5 sm:h-6 sm:w-6";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeSwitch = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-2 sm:p-0 sm:py-4 sm:px-16 w-full flex flex-col space-y-1 sm:space-y-0 sm:flex-row justify-between items-center text-center sm:text-left dark:text-white">
      <div className="space-x-8">
        {routes.map((route) => (
          <Link
            href={route.path}
            className={pathName === route.path ? activeStyling : styling}
            key={route.path}
          >
            {route.title}
          </Link>
        ))}
      </div>
      <div className="flex flex-row space-x-8 items-center">
        <div className="space-x-8">
          {socials.map((social) => (
            <a
              key={social.url}
              href={social.url}
              target="_blank"
              className={styling}
            >
              {social.title}
            </a>
          ))}
        </div>
        <div className="flex">
          {theme === "dark" ? (
            <Sun className={themeButtonStyling} onClick={handleThemeSwitch} />
          ) : (
            <Moon className={themeButtonStyling} onClick={handleThemeSwitch} />
          )}
        </div>
      </div>
    </div>
  );
}
