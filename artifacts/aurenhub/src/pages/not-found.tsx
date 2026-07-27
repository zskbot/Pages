import { useLocation } from "wouter";
import { AuRenMascot } from "@/components/AuRenMascot";
const ACCENT = "#00cfab";
export default function NotFound() {
  const [, navigate] = useLocation();
  return (
    <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, backgroundColor: "#080809", color: "#e8eaf2", textAlign: "center", padding: 24 }}>
      <AuRenMascot size={72} />
      <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em" }}>404 — Not Found</h1>
      <p style={{ color: "#8892a4", maxWidth: 300 }}>This page doesn't exist in AuRenHub.</p>
      <button onClick={() => navigate("/")} style={{ padding: "11px 24px", borderRadius: 9, border: "none", backgroundColor: ACCENT, color: "#080809", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Go Home</button>
    </div>
  );
}
