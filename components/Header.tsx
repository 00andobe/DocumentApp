//import Link from "next/link";
import Link from "next/link";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header

    >
      <Link href="/">
        <h1 >Documents</h1>
      </Link>
      <Navigation />
    </header>
  );
}