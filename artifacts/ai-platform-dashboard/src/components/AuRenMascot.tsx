export function AuRenMascot({ size = 80 }: { size?: number }) {
  const id = `m${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 120 128" fill="none" style={{ display: "block", flexShrink: 0 }}>
      <defs>
        <radialGradient id={`body-${id}`} cx="38%" cy="30%" r="68%">
          <stop offset="0%" stopColor="#00f2cc" />
          <stop offset="55%" stopColor="#00cfab" />
          <stop offset="100%" stopColor="#007560" />
        </radialGradient>
        <radialGradient id={`eye-${id}`} cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ccf5ee" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="96" rx="30" ry="22" fill={`url(#body-${id})`} />
      <circle cx="60" cy="58" r="40" fill={`url(#body-${id})`} />
      <ellipse cx="60" cy="80" rx="24" ry="17" fill="rgba(255,255,255,0.14)" />
      <path d="M43 22 Q30 7 23 4" stroke="#00e8c0" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <circle cx="22" cy="3.5" r="5.5" fill="#00f2cc" />
      <circle cx="22" cy="3.5" r="2.8" fill="white" opacity="0.65" />
      <path d="M77 22 Q90 7 97 4" stroke="#00e8c0" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <circle cx="98" cy="3.5" r="5.5" fill="#00f2cc" />
      <circle cx="98" cy="3.5" r="2.8" fill="white" opacity="0.65" />
      <circle cx="43" cy="52" r="13.5" fill={`url(#eye-${id})`} />
      <circle cx="44.5" cy="53.5" r="8" fill="#005a4a" />
      <circle cx="45.5" cy="54.5" r="4.8" fill="#001510" />
      <circle cx="41.5" cy="49.5" r="2.8" fill="white" />
      <circle cx="77" cy="52" r="13.5" fill={`url(#eye-${id})`} />
      <circle cx="78.5" cy="53.5" r="8" fill="#005a4a" />
      <circle cx="79.5" cy="54.5" r="4.8" fill="#001510" />
      <circle cx="75.5" cy="49.5" r="2.8" fill="white" />
      <ellipse cx="28" cy="66" rx="9" ry="5.5" fill="rgba(255,105,140,0.28)" />
      <ellipse cx="92" cy="66" rx="9" ry="5.5" fill="rgba(255,105,140,0.28)" />
      <path d="M44 70 Q60 86 76 70" stroke="#004d40" strokeWidth="3" strokeLinecap="round" fill="none" />
      <ellipse cx="22" cy="97" rx="12" ry="11" fill={`url(#body-${id})`} />
      <ellipse cx="13" cy="90" rx="7.5" ry="8.5" fill={`url(#body-${id})`} />
      <ellipse cx="98" cy="97" rx="12" ry="11" fill={`url(#body-${id})`} />
      <ellipse cx="107" cy="90" rx="7.5" ry="8.5" fill={`url(#body-${id})`} />
    </svg>
  );
}
