"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavbarProps = {
  minimal?: boolean;
};

export default function Navbar({ minimal = false }: NavbarProps) {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const isAboutPage = pathname === "/about";

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background:
          "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 100%)",
        padding: "1rem 0 2rem",
        pointerEvents: "none",
        display: isLanding ? "none" : undefined,
      }}
    >
      <div
        style={{
          maxWidth: undefined,
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: minimal ? "center" : "space-between",
          pointerEvents: "auto",
        }}
      >
        {!minimal && (
          <Link href="/">
            <Image
              src="/homan.png"
              alt="homan"
              width={32}
              height={32}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          </Link>
        )}
        {!isAboutPage && (
          <Link href="/about" className="nav-link">
            about
          </Link>
        )}
      </div>
    </nav>
  );
}
