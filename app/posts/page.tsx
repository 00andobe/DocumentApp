"use client";
import { Post } from "@/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../../styles/posts.css";


export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const result = await fetch("/api/posts");
      const postsFromApi = await result.json();
      setPosts(postsFromApi);
    };
    getPosts();
  }, []);

  return (
    <div className="post-list">
      {posts.map((post: Post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <div className="post">
            <h2 className="post-title">{post.title + " by " + post.author}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
