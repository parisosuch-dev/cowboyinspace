import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";

export default function Header({
  title,
  subtext,
}: {
  title: string;
  subtext?: string;
}) {
  return (
    <div className="h-[7rem] sm:h-[10rem]  rounded-md bg-neutral-900 flex flex-col text-left p-4 justify-center relative font-mono">
      <h1 className="relative z-10 text-2xl md:text-5xl text-white font-semibold">
        {title}
      </h1>
      {subtext ? (
        <p className="text-white text-xs sm:text-sm mt-1 sm:mt-2">
          My spot in cyberspace to share my interests - mostly in the realm of
          software, space, and politics.
        </p>
      ) : null}
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
