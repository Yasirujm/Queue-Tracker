"use client";

import { usePathname } from "next/navigation";
import NextLink from "next/link"; // alias to avoid Link duplicate errors

const links = [
  { href: "/", label: "Home+Flight" },
  { href: "/activities", label: "Activities" },
  { href: "/hotels", label: "Hotels" },
  { href: "/guides", label: "Travel Guides" },
  
];

export default function MainNav({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={className}>
      <ul className="flex items-center gap-6">
        {links.map((l) => {
          const active =
            pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
          return (
            <li key={l.href}>
              <NextLink
                href={l.href}
                className={
                  "text-sm font-medium transition-colors hover:text-foreground" +
                  (active ? " text-foreground" : " text-muted-foreground")
                }
              >
                {l.label}
              </NextLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
