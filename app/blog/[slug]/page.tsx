import fs from "fs";
import path from "path";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import { getPostMeta } from "@/lib/post-meta";
import Link from "next/link";

const getPostContent = (slug: string) => {
  /* get post content from slug */
  const folder = path.join(process.cwd(), "posts/");
  // get the file via the path and slug name being passed in params
  const file = `${folder}${slug}.md`;
  // decode the file content to utf-8
  const content = fs.readFileSync(file, "utf-8");
  // get matter content
  const matterResult = matter(content);
  return matterResult;
};

// This will pre-generate static paths during build
export const generateStaticParams = async () => {
  const posts = getPostMeta(); // Fetch all post metadata (e.g., slug)

  // Generate an array of objects for dynamic routes
  return posts.map((post) => ({
    slug: post.slug, // Dynamic parameter for the path
  }));
};

const postPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = getPostContent(slug);

  // TODO: styling for this shit
  return (
    <div className="w-full flex flex-col items-center">
      <div className="space-y-2 sm:space-y-4 w-5/6 sm:w-3/6 2xl:w-1/3 font-mono">
        <Link
          className="text-xs sm:text-sm hover:underline hover:cursor-pointer dark:text-white"
          href="/blog"
        >
          {"←"} back
        </Link>
        <div className="flex flex-row space-x-4 sm:space-x-8 dark:text-white text-xs sm:text-base">
          <p>{post.data.topic.toUpperCase()}</p>
          <p>{post.data.date}</p>
        </div>
        <h1 className="dark:text-white font-bold text-xl sm:text-3xl">
          {post.data.title}
        </h1>
        <article className="prose dark:text-white text-xs sm:text-base">
          <Markdown>{post.content}</Markdown>
        </article>
      </div>
    </div>
  );
};

export default postPage;
