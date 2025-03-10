import Header from "@/components/header";
import { getPosts } from "@/lib/post-meta";
import Link from "next/link";

export default function Page() {
  const posts = getPosts();

  interface Post {
    title: string;
    subtitle: string;
    slug: string;
    topic: string;
    date: Date;
  }

  interface GroupedPosts {
    [year: string]: Post[];
  }

  const groupedPosts: GroupedPosts = {};

  for (const post of posts) {
    const year = post.date.getFullYear();
    if (!groupedPosts[year]) {
      groupedPosts[year] = [];
    }
    groupedPosts[year].push(post);
  }
  const years = Object.keys(groupedPosts).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col w-5/6 sm:w-3/6 2xl:w-1/3">
        <Header
          title="Blog"
          subtext="Place to dump my thoughts and learnings."
        />
        <div className="mt-2 sm:mt-8 space-y-8">
          {years.map((year) => (
            <div key={year} className="space-y-4">
              <h2 className="text-base md:text-xl font-mono">{year}</h2>
              {groupedPosts[year].map((post) => (
                <Link
                  key={post.title}
                  href={`/blog/${post.slug}`}
                  className="flex flex-col sm:flex-row w-full justify-between font-mono border-b group"
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
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
