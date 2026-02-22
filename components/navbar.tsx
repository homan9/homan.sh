"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const CONSTRAINED_ROUTES = ["/", "/index"];

export default function Navbar() {
  const pathname = usePathname();
  const isAboutPage = pathname === "/index";
  const isConstrained = CONSTRAINED_ROUTES.includes(pathname);

  return (
    <nav
      className="navbar"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className={isConstrained ? "page-container" : undefined}
        style={{
          width: "100%",
          maxWidth: isConstrained ? 500 : undefined,
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
            href="/index"
            style={{
              fontSize: "0.9rem",
              fontWeight: 540,
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
            className="nav-link"
          >
            index
          </Link>
        )}
      </div>
    </nav>
  );
}
