import { useLocation } from "wouter";
import { AuRenMascot } from "@/components/AuRenMascot";

const LINKS = [
  { label: "Home",      href: "/home" },
  { label: "Dashboard", href: "/" },
  { label: "Simulator", href: "/simulator/" },
  { label: "Slides",    href: "/ai-platforms-slides/" },
];

export default function AppNav({ isDark }: { isDark: boolean }) {
  const [location] = useLocation();

  const isActive = (href: string) => {
    if (href === "/home") return location === "/home";
    if (href === "/") return location === "/" || location.startsWith("/platform/");
    return location === href || location.startsWith(href);
  };

  const bg = isDark ? "rgba(10,11,20,0.6)" : "rgba(255,255,255,0.8)";
  const border = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const logoColor = "#7AA2F7";
  const textColor = isDark ? "#e4e4e7" : "#18181b";
  const mutedColor = "#71717a";
  const activeBg = isDark ? "rgba(122,162,247,0.12)" : "rgba(122,162,247,0.1)";
  const activeColor = isDark ? "#7AA2F7" : "#0079F2";

  return (
    <nav
      className="print:hidden w-full flex items-center justify-between px-3 sm:px-5 h-9 border-b mb-4 sm:mb-6"
      style={{ backgroundColor: bg, borderColor: border }}
    >
      <div className="flex items-center gap-1.5">
        <AuRenMascot size={22} />
        <span style={{ fontSize: 13, fontWeight: 700, color: textColor, letterSpacing: "-0.02em" }}>
          Au<span style={{ color: "#00cfab" }}>Ren</span>
        </span>
      </div>

      <div className="flex items-center gap-0.5">
        {LINKS.map(({ label, href }) => {
          const active = isActive(href);
          return (
            <a
              key={href}
              href={href}
              className="px-2 py-0.5 text-[12px] transition-colors"
              style={{
                borderRadius: 3,
                fontWeight: active ? 600 : 400,
                color: active ? activeColor : mutedColor,
                backgroundColor: active ? activeBg : "transparent",
                textDecoration: "none",
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = textColor; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = mutedColor; }}
            >
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
