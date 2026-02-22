"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";

  return (
    <nav
      className="navbar"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className="page-container"
        style={{
          width: "100%",
          maxWidth: 500,
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/">
          <Image
            src="/homan.png"
            alt="homan"
            width={32}
            height={32}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Link>

        {!isAboutPage && (
          <Link
            href="/about"
            style={{
              fontSize: 15,
              fontWeight: 500,
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
            className="nav-link"
          >
            about
          </Link>
        )}
      </div>
    </nav>
  );
}
