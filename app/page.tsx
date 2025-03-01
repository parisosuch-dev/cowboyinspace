import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { getLatestPosts } from "@/lib/post-meta";
import Link from "next/link";

export default function Home() {
  const post = getLatestPosts(1)[0];

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
          <h2 className="font-mono text-lg md:text-3xl">Latest Blog Post</h2>
          <Link
            key={post.title}
            href={`/blog/${post.slug}`}
            className="flex flex-col sm:flex-row w-full justify-between font-mono group mt-2"
          >
            <p className="text-base md:text-2xl group-hover:text-black/50">
              {post.title}
            </p>
            <div className="flex flex-row space-x-4 text-black/50 text-sm md:text-lg">
              <p>{post.topic}</p>
              <p>
                {post.date
                  .toLocaleString("default", { month: "long" })
                  .slice(0, 3)}{" "}
                {post.date.getDate()}
              </p>
            </div>
          </Link>
          <div className="mt-2">
            <Link href="/blog" className="underline">
              More posts &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
