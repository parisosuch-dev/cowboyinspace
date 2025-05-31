import Header from "@/components/header";
import { getLatestPosts } from "@/lib/post-meta";
import Link from "next/link";

export default function Home() {
  const post = getLatestPosts(1)[0];

  const sites = [
    {
      title: "My resume",
      url: "parisosuch.com",
    },
    {
      title: "I really like pizza",
      url: "parisloves.pizza",
    },
  ];

  return (
    <div className="flex w-full flex-col justify-center items-center">
      <div className="w-5/6 sm:w-3/6 2xl:w-1/3">
        <Header
          title="Paris Osuch"
          subtext="My spot in cyberspace to share my interests - mostly in the realm of
            software, space, and politics."
        />
        <div className="mt-2 sm:mt-8 border border-gray-100 rounded-md p-4">
          <h2 className="font-mono text-xl md:text-4xl font-semibold">
            Latest Blog Post
          </h2>
          <Link
            key={post.title}
            href={`/blog/${post.slug}`}
            className="flex flex-col sm:flex-row w-full justify-between font-mono group mt-2"
          >
            <p className="text-base md:text-2xl group-hover:text-black/50 dark:group-hover:text-white/50">
              {post.title}
            </p>
            <div className="flex flex-row space-x-4 text-black/50 dark:text-white/50 text-sm md:text-lg">
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
            <Link href="/blog" className="underline text-xs sm:text-sm">
              More posts &rarr;
            </Link>
          </div>
        </div>
        <div className="mt-2 sm:mt-8 border border-gray-100 rounded-md p-4">
          <h2 className="font-mono text-xl md:text-4xl font-semibold">
            Other Sites
          </h2>
          {sites.map((site) => (
            <Link
              key={site.title}
              href={"https://" + site.url}
              target="_blank"
              className="flex flex-col sm:flex-row w-full justify-between font-mono group mt-2"
            >
              <p className="text-base md:text-2xl group-hover:text-black/50 dark:group-hover:text-white/50">
                {site.title}
              </p>
              <p className="text-black/50 dark:text-white/50 text-sm md:text-lg">
                {site.url}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
