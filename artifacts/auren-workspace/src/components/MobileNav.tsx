import { useLocation } from "wouter";

const BG = "#07080e";
const BORDER = "#1a1f2e";
const ACCENT = "#00cfab";
const DIMMED = "#3a4155";

const NAV_ITEMS = [
  {
    id: "home", href: "/build", label: "Build",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  },
  {
    id: "projects", href: "/projects", label: "Projects",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
  {
    id: "tools", href: "/tools", label: "Tools",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  },
  {
    id: "library", href: "/library", label: "Library",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  },
  {
    id: "extensions", href: "/extensions", label: "Tiện ích",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.1 11.9 1 10.5 1S8 2.1 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7S4.99 16.2 3.5 16.2H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.4 0 2.5-1.1 2.5-2.5S21.9 11 20.5 11z"/></svg>,
  },
];

export default function MobileNav({ active }: { active: string }) {
  const [, navigate] = useLocation();

  return (
    <nav className="mobile-nav-bar" style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 60, backgroundColor: BG, borderTop: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-around", zIndex: 100, backdropFilter: "blur(12px)", paddingBottom: "env(safe-area-inset-bottom,0px)" }}>
      <style>{`@media(min-width:768px){.mobile-nav-bar{display:none!important}}`}</style>
      {NAV_ITEMS.map(item => {
        const isActive = active === item.id;
        return (
          <button key={item.id} onClick={() => navigate(item.href)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 10px", border: "none", backgroundColor: "transparent", color: isActive ? ACCENT : DIMMED, cursor: "pointer", transition: "color 0.15s", minWidth: 44, position: "relative" }}>
            {item.icon}
            <span style={{ fontSize: 9, letterSpacing: "0.02em", fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
            {isActive && <div style={{ position: "absolute", bottom: 0, width: 20, height: 2, backgroundColor: ACCENT, borderRadius: "2px 2px 0 0" }} />}
          </button>
        );
      })}
    </nav>
  );
}
