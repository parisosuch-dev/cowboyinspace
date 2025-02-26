import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function Home() {
  return (
    <div className="flex w-full flex-col justify-center items-center">
      <div className="w-5/6 sm:w-1/3">
        <div className="h-[7rem] sm:h-[10rem]  rounded-md bg-neutral-900 flex flex-col text-left p-4 justify-center relative font-mono">
          <h1 className="relative z-10 text-xl md:text-5xl text-white font-semibold">
            Paris Osuch
          </h1>
          <p className="text-white text-xs sm:text-sm mt-1 sm:mt-2">
            My spot in cyberspace to share my interests - mostly in the realm of
            software, space, and politics.
          </p>
          <ShootingStars />
          <StarsBackground />
        </div>
        <div className="mt-2 sm:mt-8">
          <h2 className="font-mono text-lg md:text-3xl">Latest Blog Posts</h2>
        </div>
      </div>
    </div>
  );
}
