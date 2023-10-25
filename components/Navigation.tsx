"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav>
      <div>
        <Link
          className={`link ${pathname === "/posts" ? "active" : ""}`}
          href="/posts"
        >
          All posts!
        </Link>
        <Link
          className={`link ${pathname === "/create" ? "active" : ""}`}
          href="/create"
        >
          Create Post
        </Link>
      </div>
    </nav>
  );
}
