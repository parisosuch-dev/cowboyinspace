import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMetadata {
  title: string;
  date: string;
  subtitle: string;
  slug: string;
  topic: string;
}

export const getPostMeta = (): PostMetadata[] => {
  /* returns all post metadata */
  const folder = path.join(process.cwd(), "posts/");
  const files = fs.readdirSync(folder);
  // get all markdown posts through filter
  const mdPosts = files.filter((file) => file.endsWith(".md"));
  // get gray matter metadata from each file
  const posts = mdPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`posts/${fileName}`, "utf8");
    const matterResult = matter(fileContents);
    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      subtitle: matterResult.data.subtitle,
      slug: fileName.replace(".md", ""),
      topic: matterResult.data.topic,
    };
  });
  return posts;
};
