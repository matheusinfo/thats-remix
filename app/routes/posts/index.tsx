import type { Post } from "@prisma/client";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  });
};

export default function Posts() {
    const { posts } = useLoaderData();
    
    return (
      <main className="min-w-screen min-h-screen flex flex-col justify-start items-center bg-slate-50">
        <h1 className="text-black-600 text-2xl font-bold m-5">Posts</h1>
        <ul>
          {posts.map((post: Post) => (
            <li key={post.slug}>
              <Link
                to={post.slug}
                className="text-blue-600 underline m-1"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    );
  }