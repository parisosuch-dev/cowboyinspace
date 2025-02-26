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

export const generateStaticParams = async () => {
  const posts = getPostMeta();
  return posts.map((post) => {
    return { slug: post.slug };
  });
};

const postPage = async (props: any) => {
  const params = await props.params;
  const slug = params.slug;
  const post = getPostContent(slug);

  // TODO: styling for this shit
  return (
    <div className="p-4 sm:p-8 space-y-4 sm:space-y-8 sm:w-1/2 2xl:w-1/4 font-mono">
      <Link
        className="text-xs sm:text-sm hover:underline hover:cursor-pointer"
        href="/"
      >
        {"←"} back
      </Link>
      <div className="flex flex-row space-x-4 sm:space-x-8">
        <p>{post.data.topic.toUpperCase()}</p>
        <p>{post.data.date}</p>
      </div>
      <article className="prose text-xs sm:text-base">
        <Markdown>{post.content}</Markdown>
      </article>
    </div>
  );
};

export default postPage;
