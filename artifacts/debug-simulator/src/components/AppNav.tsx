import { AuRenMascot } from "@/components/AuRenMascot";

const LINKS = [
  { label: "Home",      href: "/home",              active: false },
  { label: "Dashboard", href: "/",                  active: false },
  { label: "Simulator", href: "/simulator/",        active: true  },
  { label: "Slides",    href: "/ai-platforms-slides/", active: false },
];

export default function AppNav() {
  return (
    <nav className="w-full flex items-center justify-between px-4 h-9 border-b border-border bg-background/80 backdrop-blur-sm shrink-0">
      <div className="flex items-center gap-1.5">
        <AuRenMascot size={24} />
        <span className="text-[13px] font-bold tracking-tight text-foreground" style={{ letterSpacing: "-0.02em" }}>
          AuRen
        </span>
      </div>

      <div className="flex items-center gap-0.5">
        {LINKS.map(({ label, href, active }) => (
          <a
            key={href}
            href={href}
            className={[
              "px-2 py-0.5 text-[11px] font-mono uppercase tracking-widest transition-colors no-underline",
              active
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
            style={{ textDecoration: "none", borderRadius: 3 }}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
