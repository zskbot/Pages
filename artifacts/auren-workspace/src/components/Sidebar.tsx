import { useLocation } from "wouter";
import { AuRenMark } from "./AuRenMascot";
import { useClerk, useUser } from "@clerk/react";

const BG_SIDEBAR = "#07080e";
const BORDER = "#1a1f2e";
const ACCENT = "#00cfab";
const DIMMED = "#3a4155";
const MUTED = "#8892a4";

const NAV_ITEMS = [
  {
    id: "home", href: "/build", label: "Build",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  },
  {
    id: "projects", href: "/projects", label: "Projects",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
  {
    id: "tools", href: "/tools", label: "Tools",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  },
  {
    id: "library", href: "/library", label: "Library",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  },
  {
    id: "extensions", href: "/extensions", label: "Extensions",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.1 11.9 1 10.5 1S8 2.1 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7S4.99 16.2 3.5 16.2H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.4 0 2.5-1.1 2.5-2.5S21.9 11 20.5 11z"/></svg>,
  },
];

const BOTTOM_ITEMS = [
  {
    id: "settings", label: "Settings",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  },
];

export default function Sidebar({ active }: { active: string }) {
  const [, navigate] = useLocation();
  const { signOut } = useClerk();
  const { user } = useUser();

  async function handleLogout() {
    await signOut();
    navigate("/");
  }

  return (
    <aside className="desktop-sidebar" style={{ width: 56, flexShrink: 0, backgroundColor: BG_SIDEBAR, borderRight: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0", position: "sticky", top: 0, height: "100dvh", zIndex: 60 }}>
      {/* Logo */}
      <div onClick={() => navigate("/")} style={{ marginBottom: 16, cursor: "pointer", padding: 4 }} title="AuRen">
        <AuRenMark size={30} />
      </div>
      <div style={{ width: 28, height: 1, backgroundColor: BORDER, marginBottom: 10 }} />

      {/* Nav */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, width: "100%", alignItems: "center" }}>
        {NAV_ITEMS.map(item => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => navigate(item.href)} title={item.label}
              style={{ width: 40, height: 40, borderRadius: 9, border: "none", backgroundColor: isActive ? `${ACCENT}18` : "transparent", color: isActive ? ACCENT : DIMMED, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", position: "relative" }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = MUTED; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; }}}
              onMouseLeave={e => { e.currentTarget.style.color = isActive ? ACCENT : DIMMED; e.currentTarget.style.backgroundColor = isActive ? `${ACCENT}18` : "transparent"; }}>
              {item.icon}
              {isActive && <div style={{ position: "absolute", left: -1, top: "50%", transform: "translateY(-50%)", width: 3, height: 20, backgroundColor: ACCENT, borderRadius: "0 2px 2px 0" }} />}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
        {BOTTOM_ITEMS.map(item => (
          <button key={item.id} title={item.label} onClick={() => navigate("/profile")}
            style={{ width: 40, height: 40, borderRadius: 9, border: "none", backgroundColor: active === "profile" ? `${ACCENT}18` : "transparent", color: active === "profile" ? ACCENT : DIMMED, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
            onMouseEnter={e => { if (active !== "profile") { e.currentTarget.style.color = MUTED; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; }}}
            onMouseLeave={e => { e.currentTarget.style.color = active === "profile" ? ACCENT : DIMMED; e.currentTarget.style.backgroundColor = active === "profile" ? `${ACCENT}18` : "transparent"; }}>
            {item.icon}
          </button>
        ))}
        {/* Logout */}
        <button onClick={handleLogout} title="Đăng xuất"
          style={{ width: 40, height: 40, borderRadius: 9, border: "none", backgroundColor: "transparent", color: DIMMED, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", marginTop: 2 }}
          onMouseEnter={e => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.backgroundColor = "rgba(248,113,113,0.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = DIMMED; e.currentTarget.style.backgroundColor = "transparent"; }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </button>
        {/* Avatar — click to go to profile */}
        <div onClick={() => navigate("/profile")} style={{ width: 30, height: 30, borderRadius: "50%", overflow: "hidden", marginTop: 4, cursor: "pointer", border: active === "profile" ? `1.5px solid ${ACCENT}` : "1.5px solid transparent", transition: "border-color 0.15s" }} title={user?.firstName ?? "My Profile"}>
          {user?.imageUrl ? (
            <img src={user.imageUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <AuRenMark size={30} />
          )}
        </div>
      </div>
    </aside>
  );
}
