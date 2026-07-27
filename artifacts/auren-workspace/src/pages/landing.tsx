import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { AuRenMascot, AuRenMark } from "@/components/AuRenMascot";

const BG = "#0d0e14";
const CARD = "#16171e";
const CARD2 = "#1c1d25";
const BORDER = "rgba(255,255,255,0.07)";
const ACCENT = "#00cfab";
const ACCENT2 = "#00a88a";
const TEXT = "#e8eaf2";
const MUTED = "#8892a4";
const DIM = "#3a4155";
const ORANGE = "#00cfab";


const TESTIMONIALS = [
  { text: '"Đến lúc này tôi thậm chí không biết nên gọi @auren là gì. Nó là một cái gì đó hoàn toàn mới. Sau vài tuần sử dụng..."', handle: "@davemorin", avatar: "D" },
  { text: '"@auren chính là Jarvis. Nó đã tồn tại rồi."', handle: "@nofil_ai", avatar: "N" },
  { text: '"AuRen là một trợ lý 24/7 với quyền truy cập vào máy tính riêng của nó. Sẽ ra sao nếu có mười, hoặc một trăm..."', handle: "@nickvasiles", avatar: "K" },
  { text: '"Các bản cập nhật từ @auren thực sự tuyệt vời"', handle: "@theysayheygreg", avatar: "G" },
  { text: '"AuRen đã xử lý lịch trình của tôi, viết email và đặt vé máy bay — tất cả trong khi tôi ngủ."', handle: "@techfounder", avatar: "T" },
  { text: '"Không thể tưởng tượng làm việc mà không có AuRen nữa. Năng suất tăng 3 lần."', handle: "@productlead", avatar: "P" },
];

const FEATURES = [
  { icon: "🏠", title: "Chạy trên máy của bạn", desc: "Mac, Windows hoặc Linux. Sử dụng mô hình Anthropic, OpenAI hoặc mô hình cục bộ. Mặc định là riêng tư — dữ liệu của bạn luôn thuộc về bạn." },
  { icon: "💬", title: "Bất kỳ ứng dụng trò chuyện nào", desc: "Trò chuyện với nó qua WhatsApp, Telegram, Discord, Slack, Signal hoặc iMessage. Hoạt động tốt trong tin nhắn riêng và các nhóm chat." },
  { icon: "🧠", title: "Bộ nhớ bền vững", desc: "Ghi nhớ bạn và trở nên độc nhất vô nhị. Sở thích của bạn, bối cảnh của bạn, AI của riêng bạn." },
  { icon: "🌐", title: "Kiểm soát trình duyệt", desc: "Nó có thể duyệt web, điền biểu mẫu và trích xuất dữ liệu từ bất kỳ trang web nào." },
  { icon: ">_", title: "Truy cập toàn hệ thống", desc: "Đọc và ghi tệp, chạy lệnh shell, thực thi tập lệnh. Truy cập đầy đủ hoặc trong môi trường biệt lập — tùy bạn lựa chọn." },
  { icon: "⚡", title: "Kỹ năng & Plugin", desc: "Mở rộng bằng các kỹ năng cộng đồng hoặc tự xây dựng kỹ năng của riêng bạn. Nó thậm chí có thể tự viết ra các kỹ năng đó." },
];

const INTEGRATIONS = [
  { name: "WhatsApp", color: "#25d366", icon: "💬" },
  { name: "Telegram", color: "#2aabee", icon: "✈️" },
  { name: "Discord", color: "#5865f2", icon: "🎮" },
  { name: "Slack", color: "#e01e5a", icon: "#" },
  { name: "Signal", color: "#3a76f0", icon: "📡" },
  { name: "iMessage", color: "#34c759", icon: "🍎" },
  { name: "Claude", color: "#d97706", icon: "A" },
  { name: "GPT", color: "#10a37f", icon: "⊕" },
  { name: "Spotify", color: "#1db954", icon: "🎵" },
  { name: "Obsidian", color: "#7c3aed", icon: "💎" },
  { name: "Twitter", color: "#ffffff", icon: "𝕏" },
  { name: "Gmail", color: "#ea4335", icon: "M" },
  { name: "GitHub", color: "#ffffff", icon: "⌀" },
  { name: "Notion", color: "#ffffff", icon: "N" },
  { name: "Trình duyệt", color: "#4285f4", icon: "🌐" },
];

const BUILDS = [
  { tag: "X LUỒNG", tagColor: ACCENT, title: "Hơn 15 đặc vụ đang chạy trốn khỏi 3 cỗ máy.", desc: "Một hệ thống AuRen hoàn chỉnh xử lý 10.000 email, xem xét các bộ tài liệu, xây dựng công cụ CLI, tối ưu hóa Google Ads, soạn thảo bài đăng và điều phối các tác vụ Codex trên một hệ thống tổng đài ảo dựa trên Discord.", labels: ["đa tác nhân", "discord", "tự động hóa"] },
  { tag: "X LUỒNG", tagColor: ACCENT, title: "Hệ điều hành cá nhân với thông tin tóm tắt hàng ngày", desc: "AuRen phân bổ thời gian cho các nhiệm vụ, chạy các cuộc đánh giá hàng tuần dựa trên ghi chú cuộc họp, tóm tắt trước cuộc họp, theo dõi thời hạn học tập của gia đình, nghiên cứu dự án, giải quyết xung đột lịch và tạo hóa đơn.", labels: ["lịch", "các cuộc họp báo", "năng suất"] },
  { tag: "X LUỒNG", tagColor: ACCENT, title: "Khắc phục sự cố sản xuất bằng giọng nói trong khi dắt chó đi dạo.", desc: "Một quy trình làm việc trực tiếp của AuRen đã kiểm tra các bản dựng Railway bị lỗi, chẩn đoán nguyên nhân gốc, thay đổi cấu hình triển khai, triển khai lại, khắc phục sự cố thiết kế và gửi yêu cầu kéo (PR) qua giọng nói.", labels: ["tiếng nói", "triển khai", "lập trình"] },
  { tag: "X LUỒNG", tagColor: ACCENT, title: "Một ứng dụng trò chuyện duy nhất kiểm soát thư từ, tin nhắn, đơn đặt hàng, cuộc gọi và kho lưu trữ.", desc: "Một trợ lý ảo AuRen duy nhất có thể kiểm tra thư, đọc tin nhắn Beeper, đặt hàng, gửi lời nhắc, tạo vấn đề trên GitHub, thảo luận về dấu trang, xử lý cuộc gọi thoại, và đọc/ghi dữ liệu vào kho lưu trữ 1Password chuyên dụng.", labels: ["thư", "máy nhắn tin", "trí tuệ nhân tạo"] },
];

const SPONSORS = [
  { name: "OpenAI", icon: "⊕", color: "#10a37f" },
  { name: "GitHub", icon: "⌀", color: "#ffffff" },
  { name: "NVIDIA", icon: "◼", color: "#76b900", wide: true },
  { name: "Vercel", icon: "▲", color: "#ffffff", wide: true },
  { name: "Convex", icon: "C", color: "#f97316", wide: true },
];

const PRESS = [
  { source: "TECHCRUNCH", date: "Ngày 30 tháng 1 năm 2026", title: "Các trợ lý AI của AuRen hiện đang xây dựng mạng xã hội riêng của chúng.", desc: "Một bài viết đầu tay xuất sắc về sự khởi đầu của AuRen: đổi thương hiệu, tăng trưởng lan truyền, Moltbook và lý do dự án thu hút được cộng đồng AI mã nguồn mở.", author: "Anna Heim" },
  { source: "THE VERGE", date: "Ngày 15 tháng 2 năm 2026", title: "Peter Steinberger, người sáng lập AuRen, gia nhập OpenAI.", desc: "Một tiêu đề tích cực, rõ ràng về chương trình tiếp theo của AuRen: động lực từ người sáng lập, sự hậu thuẫn từ OpenAI và con đường phát triển lâu dài của tổ chức.", author: "Anthony Ha" },
  { source: "THE VERGE", date: "Ngày 7 tháng 3 năm 2026", title: "Buổi gặp mặt của những người hâm mộ cuồng nhiệt AuRen mang đến sự lạc quan và tôm hùm.", desc: "Một câu chuyện cộng đồng đầy sức mạnh về ClawCon, về những người đang xây dựng AuRen, và về cảm giác rằng các trợ lý ảo cá nhân đã thoát khỏi phòng thí nghiệm.", author: "The Verge" },
];

export default function LandingPage() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [osTab, setOsTab] = useState<"mac" | "win" | "android" | "ios">("mac");
  const [copiedWsl, setCopiedWsl] = useState(false);

  function copyInstall() {
    navigator.clipboard.writeText("curl -fsSL https://auren.ai/install.sh | bash");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.classList.add("visible");
            const delay = el.dataset.delay ? Number(el.dataset.delay) : 0;
            if (delay) el.style.transitionDelay = `${delay}ms`;
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
    );
    document.querySelectorAll("[data-reveal],[data-reveal-left]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ backgroundColor: BG, color: TEXT, fontFamily: "'Inter',system-ui,sans-serif", minHeight: "100dvh", overflowX: "hidden" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes glow{0%,100%{filter:drop-shadow(0 0 16px rgba(0,207,171,0.4))}50%{filter:drop-shadow(0 0 32px rgba(0,207,171,0.8))}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes marquee-left{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes marquee-right{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
        @keyframes reveal-up{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes reveal-left{from{opacity:0;transform:translateX(-28px)}to{opacity:1;transform:translateX(0)}}
        @keyframes counter-glow{0%,100%{box-shadow:0 0 0 0 rgba(0,207,171,0)}50%{box-shadow:0 0 24px 4px rgba(0,207,171,0.18)}}
        .marquee-wrap{overflow:hidden;width:100%;-webkit-mask:linear-gradient(90deg,transparent,black 8%,black 92%,transparent);mask:linear-gradient(90deg,transparent,black 8%,black 92%,transparent)}
        .marquee-track{display:flex;width:max-content;gap:12px}
        .marquee-left{animation:marquee-left 38s linear infinite}
        .marquee-right{animation:marquee-right 42s linear infinite}
        .marquee-wrap:hover .marquee-left,.marquee-wrap:hover .marquee-right{animation-play-state:paused}
        [data-reveal]{opacity:0;transform:translateY(32px);transition:opacity 0.65s cubic-bezier(.22,1,.36,1),transform 0.65s cubic-bezier(.22,1,.36,1)}
        [data-reveal].visible{opacity:1;transform:translateY(0)}
        [data-reveal-left]{opacity:0;transform:translateX(-24px);transition:opacity 0.6s cubic-bezier(.22,1,.36,1),transform 0.6s cubic-bezier(.22,1,.36,1)}
        [data-reveal-left].visible{opacity:1;transform:translateX(0)}
        .stagger-child{opacity:0;transform:translateY(18px);transition:opacity 0.5s ease,transform 0.5s ease}
        .stagger-child.visible{opacity:1;transform:translateY(0)}
        .pill:hover{border-color:rgba(0,207,171,0.5)!important;background:rgba(0,207,171,0.08)!important}
        .press-card:hover{border-color:rgba(0,207,171,0.3)!important;transform:translateY(-2px)}
        .press-card{transition:all 0.2s}
        .build-card:hover{border-color:rgba(0,207,171,0.3)!important}
        .build-card{transition:border-color 0.2s}
        .feat-card:hover{border-color:rgba(0,207,171,0.25)!important;background:rgba(0,207,171,0.04)!important;transform:translateY(-2px)}
        .feat-card{transition:all 0.22s cubic-bezier(.22,1,.36,1)}
        .nav-link:hover{color:${TEXT}!important}
        a{text-decoration:none}
        input{outline:none}
        .star-field{position:fixed;top:0;left:0;right:0;height:100%;pointer-events:none;overflow:hidden;z-index:0}
        .star{position:absolute;border-radius:50%;background:white;animation:pulse 3s ease-in-out infinite}
        .install-card-hover:hover{border-color:rgba(0,207,171,0.5)!important;transform:translateY(-1px);transition:all 0.2s}
        .install-card-hover{transition:all 0.2s}
      `}</style>

      {/* Star field background */}
      <div className="star-field">
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className="star" style={{
            width: Math.random() > 0.8 ? 2 : 1,
            height: Math.random() > 0.8 ? 2 : 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.1,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${2 + Math.random() * 4}s`,
          }} />
        ))}
      </div>

      {/* Top nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, borderBottom: `1px solid ${BORDER}`, backgroundColor: "rgba(13,14,20,0.85)", backdropFilter: "blur(16px)", padding: "0 20px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <AuRenMascot size={28} />
          <span style={{ fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
            Au<span style={{ color: ACCENT }}>Ren</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button onClick={() => navigate("/build")} style={{ padding: "7px 14px", borderRadius: 7, border: `1px solid ${BORDER}`, background: "transparent", color: MUTED, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Workspace</button>
          <button onClick={() => navigate("/login")} style={{ padding: "7px 16px", borderRadius: 7, border: "none", background: ACCENT, color: BG, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Đăng nhập</button>
        </div>
      </nav>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ─── HERO ─── */}
        <section style={{ textAlign: "center", padding: "72px 20px 56px", maxWidth: 600, margin: "0 auto" }}>
          {/* Mascot */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24, animation: "float 4s ease-in-out infinite, glow 3s ease-in-out infinite" }}>
            <AuRenMascot size={110} />
          </div>
          {/* Logo wordmark */}
          <h1 style={{ fontSize: "clamp(2.8rem,12vw,5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 14 }}>
            Au<span style={{ color: ACCENT }}>Ren</span>
          </h1>
          <p style={{ fontSize: "clamp(1rem,4vw,1.3rem)", fontWeight: 700, color: TEXT, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 20, lineHeight: 1.4 }}>
            AI AGENT THỰC SỰ CÓ KHẢ NĂNG<br />THỰC HIỆN CÔNG VIỆC.
          </p>
          <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 28px" }}>
            Hệ điều hành AI chạy trực tiếp trên thiết bị của bạn — không cloud, không rò rỉ dữ liệu. Kiểm soát máy tính, nghiên cứu nền tảng AI và tự động hóa công việc qua bất kỳ ứng dụng nhắn tin nào bạn đang dùng.
          </p>
          {/* News pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, backgroundColor: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, borderRadius: 30, padding: "8px 16px 8px 10px", cursor: "pointer", marginBottom: 28 }}
            onClick={() => {}}>
            <span style={{ fontSize: 10, fontWeight: 700, backgroundColor: ACCENT, color: BG, borderRadius: 20, padding: "2px 8px" }}>MỚI</span>
            <span style={{ fontSize: 13, color: TEXT }}>AuRen đã có một tuần khó khăn.</span>
            <span style={{ color: ACCENT, fontSize: 13 }}>→</span>
          </div>
          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/build")} style={{ padding: "12px 28px", borderRadius: 8, border: "none", background: ACCENT, color: BG, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.01em" }}>
              Bắt đầu miễn phí →
            </button>
            <button onClick={() => navigate("/login")} style={{ padding: "12px 28px", borderRadius: 8, border: `1px solid ${BORDER}`, background: "transparent", color: TEXT, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
              Đăng nhập
            </button>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section style={{ padding: "0 0 64px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px 20px" }}>
            <div data-reveal style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ fontSize: "clamp(1.4rem,5vw,2rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>Những gì mọi người nói</h2>
              <span style={{ color: ACCENT, fontSize: 13, cursor: "pointer" }}>Xem tất cả →</span>
            </div>
          </div>

          {/* Marquee Row 1 — scrolls left */}
          <div className="marquee-wrap" style={{ marginBottom: 12 }}>
            <div className="marquee-track marquee-left">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div key={i} style={{ width: 300, flexShrink: 0, backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "18px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: `${ACCENT}20`, border: `1px solid ${ACCENT}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 700, color: ACCENT }}>{t.avatar}</div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 12, color: TEXT, lineHeight: 1.6, marginBottom: 6 }}>{t.text}</p>
                    <span style={{ fontSize: 11, color: ACCENT, fontWeight: 600 }}>{t.handle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2 — scrolls right */}
          <div className="marquee-wrap">
            <div className="marquee-track marquee-right">
              {[...[...TESTIMONIALS].reverse(), ...[...TESTIMONIALS].reverse()].map((t, i) => (
                <div key={i} style={{ width: 300, flexShrink: 0, backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "18px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: `${ACCENT}20`, border: `1px solid ${ACCENT}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 700, color: ACCENT }}>{t.avatar}</div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 12, color: TEXT, lineHeight: 1.6, marginBottom: 6 }}>{t.text}</p>
                    <span style={{ fontSize: 11, color: ACCENT, fontWeight: 600 }}>{t.handle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── QUICK INSTALL ─── */}
        <section style={{ padding: "0 20px 64px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ color: ACCENT, fontSize: 20, fontWeight: 900 }}>›</span>
              <h2 style={{ fontSize: "clamp(1.4rem,5vw,2rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>Hướng dẫn nhanh</h2>
            </div>
            <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, marginBottom: 20 }}>
              Chọn nền tảng của bạn để bắt đầu — AuRen hoạt động trên máy tính để bàn và thiết bị di động.
            </p>

            {/* OS Tab bar */}
            <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
              {([
                { key: "mac", label: "macOS & Linux", icon: "🍎" },
                { key: "win", label: "Windows", icon: "🪟" },
                { key: "android", label: "Android", icon: "🤖" },
                { key: "ios", label: "iOS", icon: "📱" },
              ] as const).map(({ key, label, icon }) => (
                <button key={key} onClick={() => setOsTab(key)}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, border: `1px solid ${osTab === key ? ACCENT : BORDER}`, backgroundColor: osTab === key ? `${ACCENT}18` : "rgba(255,255,255,0.03)", color: osTab === key ? ACCENT : MUTED, fontSize: 12, fontWeight: osTab === key ? 700 : 400, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
                  <span>{icon}</span> {label}
                  {key === "win" && <span style={{ fontSize: 9, backgroundColor: "#f97316", color: "#fff", padding: "1px 5px", borderRadius: 4, fontWeight: 700, marginLeft: 2 }}>BETA</span>}
                  {(key === "android" || key === "ios") && <span style={{ fontSize: 9, backgroundColor: ACCENT, color: BG, padding: "1px 5px", borderRadius: 4, fontWeight: 700, marginLeft: 2 }}>MỚI</span>}
                </button>
              ))}
            </div>

            {/* macOS / Linux */}
            {osTab === "mac" && (
              <div style={{ backgroundColor: "#0a0b10", border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28c840" }} />
                  </div>
                  <span style={{ fontSize: 11, color: MUTED, fontFamily: "'JetBrains Mono',monospace", marginLeft: 4 }}>Terminal</span>
                </div>
                <div style={{ padding: "16px 18px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 12 }}>
                    <AuRenMark size={18} />
                    <p style={{ fontSize: 11, color: MUTED, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.6 }}># Cài đặt một dòng — tự động cấu hình Node.js và mọi thứ</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "12px 14px", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, overflow: "hidden" }}>
                      <span style={{ color: ACCENT, fontFamily: "'JetBrains Mono',monospace", fontSize: 14, flexShrink: 0 }}>$</span>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: TEXT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>curl -fsSL https://auren.ai/install.sh | bash</span>
                    </div>
                    <button onClick={copyInstall} style={{ padding: "4px 10px", borderRadius: 5, border: `1px solid ${BORDER}`, background: "transparent", color: copied ? ACCENT : MUTED, fontSize: 11, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0 }}>
                      {copied ? "✓ Đã sao" : "Sao chép"}
                    </button>
                  </div>
                  <p style={{ fontSize: 11, color: MUTED, marginTop: 12, lineHeight: 1.7 }}>
                    Hỗ trợ đầy đủ macOS 12+ và các bản phân phối Linux chính. Yêu cầu kết nối internet lần đầu.
                  </p>
                </div>
              </div>
            )}

            {/* Windows */}
            {osTab === "win" && (
              <div style={{ backgroundColor: "#0a0b10", border: `1px solid rgba(249,115,22,0.35)`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "14px 18px", borderBottom: `1px solid rgba(249,115,22,0.2)`, display: "flex", alignItems: "center", gap: 10, backgroundColor: "rgba(249,115,22,0.06)" }}>
                  <span style={{ fontSize: 18 }}>🪟</span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#f97316" }}>Windows — Hỗ trợ qua WSL2</p>
                    <p style={{ fontSize: 11, color: MUTED }}>Windows gốc đang trong giai đoạn phát triển</p>
                  </div>
                </div>
                <div style={{ padding: "18px 18px" }}>
                  {/* Explanation card */}
                  <div style={{ backgroundColor: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#f97316", marginBottom: 6 }}>⚠️ Tại sao không click được trực tiếp trên Windows?</p>
                    <p style={{ fontSize: 11, color: MUTED, lineHeight: 1.75 }}>
                      AuRen sử dụng các API hệ thống cấp thấp (file system, process control, shell execution) chưa được chuẩn hóa hoàn toàn trên Windows native. Phiên bản Windows EXE đang được xây dựng — dự kiến ra mắt <strong style={{ color: TEXT }}>Q3 2026</strong>. Hiện tại, dùng <strong style={{ color: "#f97316" }}>WSL2</strong> để có trải nghiệm đầy đủ.
                    </p>
                  </div>
                  {/* Step 1 */}
                  <div style={{ marginBottom: 12 }}>
                    <p style={{ fontSize: 11, color: "#f97316", fontWeight: 700, marginBottom: 6 }}>Bước 1 — Bật WSL2 (chạy PowerShell với quyền Admin):</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "10px 14px", gap: 8 }}>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: TEXT }}>wsl --install</span>
                      <button onClick={() => { navigator.clipboard.writeText("wsl --install"); setCopiedWsl(true); setTimeout(() => setCopiedWsl(false), 2000); }}
                        style={{ padding: "3px 9px", borderRadius: 5, border: `1px solid ${BORDER}`, background: "transparent", color: copiedWsl ? ACCENT : MUTED, fontSize: 11, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0 }}>
                        {copiedWsl ? "✓" : "Sao chép"}
                      </button>
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div>
                    <p style={{ fontSize: 11, color: "#f97316", fontWeight: 700, marginBottom: 6 }}>Bước 2 — Khởi động lại máy, mở Ubuntu, chạy:</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "10px 14px", gap: 8 }}>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: TEXT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>curl -fsSL https://auren.ai/install.sh | bash</span>
                      <button onClick={copyInstall} style={{ padding: "3px 9px", borderRadius: 5, border: `1px solid ${BORDER}`, background: "transparent", color: copied ? ACCENT : MUTED, fontSize: 11, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0 }}>
                        {copied ? "✓" : "Sao chép"}
                      </button>
                    </div>
                  </div>
                  <p style={{ fontSize: 11, color: MUTED, marginTop: 12, lineHeight: 1.7 }}>
                    💡 Muốn nhận thông báo khi Windows native ra mắt? <span style={{ color: ACCENT, cursor: "pointer" }}>Đăng ký nhận tin →</span>
                  </p>
                </div>
              </div>
            )}

            {/* Android */}
            {osTab === "android" && (
              <div style={{ backgroundColor: "#0a0b10", border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "14px 18px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 10, backgroundColor: "rgba(0,207,171,0.05)" }}>
                  <span style={{ fontSize: 20 }}>🤖</span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>AuRen cho Android</p>
                    <p style={{ fontSize: 11, color: MUTED }}>Android 10+ • 45 MB</p>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <AuRenMark size={26} />
                  </div>
                </div>
                <div style={{ padding: "18px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {/* Play Store */}
                    <a href="#" style={{ display: "flex", alignItems: "center", gap: 14, backgroundColor: "rgba(255,255,255,0.04)", border: `1px solid ${ACCENT}33`, borderRadius: 10, padding: "14px 16px", textDecoration: "none" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: `${ACCENT}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>▶</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 2 }}>Google Play Store</p>
                        <p style={{ fontSize: 11, color: MUTED }}>Tải xuống chính thức — tự động cập nhật</p>
                      </div>
                      <span style={{ fontSize: 12, color: ACCENT, flexShrink: 0 }}>→</span>
                    </a>
                    {/* APK */}
                    <a href="#" style={{ display: "flex", alignItems: "center", gap: 14, backgroundColor: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "14px 16px", textDecoration: "none" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📦</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 2 }}>Tải APK trực tiếp</p>
                        <p style={{ fontSize: 11, color: MUTED }}>Dành cho thiết bị không có Play Store</p>
                      </div>
                      <span style={{ fontSize: 12, color: MUTED, flexShrink: 0 }}>→</span>
                    </a>
                  </div>
                  <div style={{ marginTop: 14, padding: "10px 12px", backgroundColor: `${ACCENT}0a`, border: `1px solid ${ACCENT}1a`, borderRadius: 8 }}>
                    <p style={{ fontSize: 11, color: MUTED, lineHeight: 1.7 }}>
                      📌 Sau khi cài đặt, kết nối AuRen với Telegram hoặc WhatsApp để bắt đầu sử dụng ngay — không cần cấu hình thêm.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* iOS */}
            {osTab === "ios" && (
              <div style={{ backgroundColor: "#0a0b10", border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "14px 18px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 10, backgroundColor: "rgba(0,207,171,0.05)" }}>
                  <span style={{ fontSize: 20 }}>📱</span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>AuRen cho iOS</p>
                    <p style={{ fontSize: 11, color: MUTED }}>iPhone & iPad • iOS 16+</p>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <AuRenMark size={26} />
                  </div>
                </div>
                <div style={{ padding: "18px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {/* App Store */}
                    <a href="#" style={{ display: "flex", alignItems: "center", gap: 14, backgroundColor: "rgba(255,255,255,0.04)", border: `1px solid ${ACCENT}33`, borderRadius: 10, padding: "14px 16px", textDecoration: "none" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: `${ACCENT}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🍎</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 2 }}>App Store</p>
                        <p style={{ fontSize: 11, color: MUTED }}>Tải xuống chính thức — iPhone & iPad</p>
                      </div>
                      <span style={{ fontSize: 12, color: ACCENT, flexShrink: 0 }}>→</span>
                    </a>
                    {/* TestFlight */}
                    <a href="#" style={{ display: "flex", alignItems: "center", gap: 14, backgroundColor: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "14px 16px", textDecoration: "none" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🧪</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 2 }}>TestFlight Beta</p>
                        <p style={{ fontSize: 11, color: MUTED }}>Thử tính năng mới trước khi ra mắt</p>
                      </div>
                      <span style={{ fontSize: 12, color: MUTED, flexShrink: 0 }}>→</span>
                    </a>
                  </div>
                  <div style={{ marginTop: 14, padding: "10px 12px", backgroundColor: `${ACCENT}0a`, border: `1px solid ${ACCENT}1a`, borderRadius: 8 }}>
                    <p style={{ fontSize: 11, color: MUTED, lineHeight: 1.7 }}>
                      📌 Ứng dụng iOS hoạt động như một trình điều khiển lệnh — kết nối tới máy Mac/Linux chạy AuRen server để xử lý tác vụ nặng.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <section style={{ padding: "0 20px 64px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div data-reveal style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <span style={{ color: ACCENT, fontSize: 20, fontWeight: 900 }}>›</span>
              <h2 style={{ fontSize: "clamp(1.4rem,5vw,2rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>Chức năng của nó</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {FEATURES.map((f, i) => (
                <div key={i} data-reveal data-delay={String(i * 80)} className="feat-card" style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "22px 18px" }}>
                  <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon === ">_" ? <span style={{ fontSize: 22, color: ACCENT, fontFamily: "monospace" }}>&gt;_</span> : f.icon}</div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 8, lineHeight: 1.3 }}>{f.title}</h3>
                  <p style={{ fontSize: 11, color: MUTED, lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── COMPATIBILITY ─── */}
        <section style={{ padding: "0 20px 64px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div data-reveal style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <span style={{ color: ACCENT, fontSize: 20, fontWeight: 900 }}>›</span>
              <h2 style={{ fontSize: "clamp(1.4rem,5vw,2rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>Tương thích với mọi thứ</h2>
            </div>
            <div data-reveal data-delay="100" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
              {INTEGRATIONS.map((ig, i) => (
                <button key={i} className="pill" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 30, border: `1px solid ${BORDER}`, backgroundColor: "rgba(255,255,255,0.03)", color: TEXT, fontSize: 13, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
                  <span style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: ig.color + "22", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: ig.color, fontWeight: 700 }}>{ig.icon}</span>
                  <span translate="no">{ig.name}</span>
                </button>
              ))}
            </div>
            <div data-reveal data-delay="180" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ color: ACCENT, fontSize: 14, cursor: "pointer" }}>Xem tất cả hơn 50 tích hợp →</span>
              <span style={{ color: ACCENT, fontSize: 14, cursor: "pointer" }}>Xem những gì mọi người đã xây dựng →</span>
            </div>
          </div>
        </section>

        {/* ─── WHAT PEOPLE ARE BUILDING ─── */}
        <section style={{ padding: "0 20px 64px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div data-reveal style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: ACCENT, fontSize: 20, fontWeight: 900 }}>›</span>
                <h2 style={{ fontSize: "clamp(1.3rem,4vw,1.8rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>Những gì mọi người đang xây dựng</h2>
              </div>
              <span style={{ color: ACCENT, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", marginLeft: 10 }}>Xem tài liệu giới thiệu →</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {BUILDS.map((b, i) => (
                <div key={i} data-reveal data-delay={String(i * 90)} className="build-card" style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "18px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, backgroundColor: "rgba(0,207,171,0.12)", color: ACCENT, borderRadius: 6, padding: "3px 10px", letterSpacing: "0.05em" }}>{b.tag}</span>
                    <span style={{ fontSize: 12, color: ACCENT, cursor: "pointer" }}>Mở →</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: TEXT, lineHeight: 1.45, marginBottom: 10 }}>{b.title}</h3>
                  <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.7, marginBottom: 12 }}>{b.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {b.labels.map(l => (
                      <span key={l} style={{ fontSize: 11, color: MUTED, backgroundColor: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, padding: "2px 9px", borderRadius: 5 }}>{l}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
              <span style={{ color: ACCENT, fontSize: 14, cursor: "pointer" }}>Thảo luận cộng đồng → · </span>
              <span style={{ color: ACCENT, fontSize: 14, cursor: "pointer" }}>Xem thêm các ví dụ dự án khác →</span>
            </div>
          </div>
        </section>

        {/* ─── PRESS ─── */}
        <section style={{ padding: "0 20px 64px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: ACCENT, fontSize: 20, fontWeight: 900 }}>›</span>
                <h2 style={{ fontSize: "clamp(1.3rem,4vw,1.8rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>Được giới thiệu trong</h2>
              </div>
              <span style={{ color: ACCENT, fontSize: 13, cursor: "pointer" }}>Xem tất cả →</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {PRESS.map((p, i) => (
                <div key={i} className="press-card" style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "18px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: ACCENT, letterSpacing: "0.1em" }}>{p.source}</span>
                    <span style={{ fontSize: 11, color: MUTED }}>{p.date}</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: TEXT, lineHeight: 1.5, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.65, marginBottom: 8 }}>{p.desc}</p>
                  <span style={{ fontSize: 11, color: DIM }}>{p.author}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── COMMUNITY LINKS ─── */}
        <section style={{ padding: "0 20px 64px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div data-reveal style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { icon: <span style={{ fontSize: 30 }}>🎮</span>, name: "Discord", desc: "Hãy tham gia cộng đồng", color: "#5865f2" },
                { icon: <span style={{ fontSize: 30 }}>📚</span>, name: "Tài liệu", desc: "Học cách làm quen với công việc", color: ACCENT },
                { icon: <AuRenMark size={36} />, name: "AuRenHub", desc: "Khám phá & tải kỹ năng", color: ACCENT },
                { icon: <span style={{ fontSize: 30, color: "#fbbf24" }}>⭐</span>, name: "ClawHub", desc: "Tải xuống kỹ năng", color: "#fbbf24" },
              ].map((item, i) => (
                <div key={i} className="feat-card" style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "24px 18px", cursor: "pointer", textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, color: item.color }}>{item.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 4 }} translate="no">{item.name}</div>
                  <div style={{ fontSize: 12, color: MUTED }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── NEWSLETTER ─── */}
        <section style={{ padding: "0 20px 64px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: "30px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ color: ACCENT, fontSize: 20, fontWeight: 900 }}>›</span>
                <h2 style={{ fontSize: "clamp(1.3rem,4vw,1.8rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>Luôn cập nhật thông tin</h2>
              </div>
              <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, marginBottom: 20 }}>
                Nhận thông tin cập nhật về các tính năng mới, tích hợp mới và những lời khuyên hữu ích từ AuRen. Không gửi thư rác, có thể hủy đăng ký bất cứ lúc nào.
              </p>
              {subscribed ? (
                <div style={{ textAlign: "center", padding: "20px", color: ACCENT, fontWeight: 600 }}>✓ Cảm ơn! Bạn đã đăng ký thành công.</div>
              ) : (
                <>
                  <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                    style={{ width: "100%", padding: "13px 16px", backgroundColor: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: 9, color: TEXT, fontSize: 14, fontFamily: "inherit", marginBottom: 10 }} />
                  <button onClick={() => email && setSubscribed(true)}
                    style={{ width: "100%", padding: "13px", borderRadius: 9, border: "none", backgroundColor: ACCENT, color: BG, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                    Đặt mua →
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ─── SPONSORS ─── */}
        <section style={{ padding: "0 20px 64px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div data-reveal style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <span style={{ color: ACCENT, fontSize: 20, fontWeight: 900 }}>›</span>
              <h2 style={{ fontSize: "clamp(1.2rem,4vw,1.6rem)", fontWeight: 800 }}>Nhà tài trợ</h2>
            </div>
            <div data-reveal data-delay="100" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {SPONSORS.map((s, i) => (
                <div key={i} style={{ gridColumn: s.wide ? "1 / -1" : undefined, backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, cursor: "pointer" }}>
                  <span style={{ fontSize: 24, color: s.color }} translate="no">{s.icon}</span>
                  <span style={{ fontSize: s.wide ? 20 : 16, fontWeight: 800, color: s.color, letterSpacing: "-0.01em" }} translate="no">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer style={{ padding: "24px 20px 40px", borderTop: `1px solid ${BORDER}`, maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 16px", marginBottom: 20 }}>
            {["Blog", "Trưng bày", "Nhân", "Lời chào", "Tích hợp", "Lòng tin"].map(link => (
              <span key={link} style={{ color: ACCENT, fontSize: 12, cursor: "pointer" }}>{link}</span>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 11, color: MUTED, lineHeight: 1.8 }}>
            · Được xây dựng bởi <span style={{ color: ACCENT, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4, verticalAlign: "middle" }}>AuRen <AuRenMark size={14} /></span>, một hệ điều hành AI cá nhân với một <span style={{ color: ACCENT }}>linh hồn</span>, qua <span style={{ color: ACCENT }}>OpenClaw&cộng đồng</span>.<br />
            <span style={{ color: DIM }}>Dự án độc lập, không liên kết với Anthropic.</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
