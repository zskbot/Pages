import { useLocation } from "wouter";

export default function NotFound() {
  const [, navigate] = useLocation();
  return (
    <div style={{ minHeight: "100dvh", backgroundColor: "#090a10", color: "#dce2f0", fontFamily: "'Inter',system-ui,sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "#00cfab", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>404 — Not Found</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", margin: "0 0 12px" }}>Page not found</h1>
        <p style={{ color: "#8892a4", marginBottom: 24 }}>The page you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/")} style={{ padding: "10px 22px", borderRadius: 8, border: "none", backgroundColor: "#00cfab", color: "#090a10", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          Go home
        </button>
      </div>
    </div>
  );
}
