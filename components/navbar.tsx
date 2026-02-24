"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const CONSTRAINED_ROUTES = ["/", "/about"];

export default function Navbar() {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";
  const isConstrained = CONSTRAINED_ROUTES.includes(pathname);
  const isHome = pathname === "/";
  const [showPic, setShowPic] = useState(!isHome);

  const showIndex = !isHome && !isAboutPage;
  const showCta = isHome;

  useEffect(() => {
    const target = document.getElementById("profile-pic");
    if (!target) {
      setShowPic(true);
      return;
    }

    // Body profile pic exists — hide navbar pic while it's visible
    setShowPic(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowPic(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

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
        <Link
          href="/"
          style={{
            opacity: showPic ? 1 : 0,
            pointerEvents: showPic ? "auto" : "none",
            transition: "opacity 0.2s ease",
          }}
        >
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {showIndex && (
            <Link
              href="/about"
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
          {showCta && (
            <Link href="/how" className="nav-cta">
              how it works
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
