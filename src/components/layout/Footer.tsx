import Link from "next/link";
import { Zap } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20 py-10">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <Zap className="h-3 w-3 text-white" aria-hidden />
            </div>
            <span className="text-sm font-bold text-foreground">Remindly</span>
          </Link>

          {/* Nav links */}
          <nav
            className="flex items-center gap-6 text-sm text-muted-foreground"
            aria-label="Footer navigation"
          >
            {footerLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="transition-colors duration-150 hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Remindly
          </p>
        </div>
      </div>
    </footer>
  );
}
