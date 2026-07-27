export function AuRenMascot({ size = 80, animate = false }: { size?: number; animate?: boolean }) {
  const id = `hm${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 120 128"
      fill="none"
      style={animate ? { animation: "auren-float 3.6s ease-in-out infinite, auren-glow 3s ease-in-out infinite" } : undefined}
    >
      <defs>
        <radialGradient id={`body-${id}`} cx="38%" cy="30%" r="68%">
          <stop offset="0%" stopColor="#00f2cc" />
          <stop offset="55%" stopColor="#00cfab" />
          <stop offset="100%" stopColor="#007560" />
        </radialGradient>
        <radialGradient id={`belly-${id}`} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <radialGradient id={`eye-${id}`} cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ccf5ee" />
        </radialGradient>
        <radialGradient id={`iris-${id}`} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#00b899" />
          <stop offset="100%" stopColor="#005a4a" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="96" rx="30" ry="22" fill={`url(#body-${id})`} />
      <circle cx="60" cy="58" r="40" fill={`url(#body-${id})`} />
      <ellipse cx="60" cy="80" rx="24" ry="17" fill={`url(#belly-${id})`} />
      <path d="M43 22 Q30 7 23 4" stroke="#00e8c0" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <circle cx="22" cy="3.5" r="5.5" fill="#00f2cc" />
      <circle cx="22" cy="3.5" r="2.8" fill="white" opacity="0.65" />
      <path d="M77 22 Q90 7 97 4" stroke="#00e8c0" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <circle cx="98" cy="3.5" r="5.5" fill="#00f2cc" />
      <circle cx="98" cy="3.5" r="2.8" fill="white" opacity="0.65" />
      <circle cx="43" cy="52" r="13.5" fill={`url(#eye-${id})`} />
      <circle cx="44.5" cy="53.5" r="8.5" fill={`url(#iris-${id})`} />
      <circle cx="45.5" cy="54.5" r="5" fill="#001510" />
      <circle cx="41.5" cy="49.5" r="3" fill="white" />
      <circle cx="47.5" cy="57" r="1.4" fill="rgba(255,255,255,0.75)" />
      <circle cx="77" cy="52" r="13.5" fill={`url(#eye-${id})`} />
      <circle cx="78.5" cy="53.5" r="8.5" fill={`url(#iris-${id})`} />
      <circle cx="79.5" cy="54.5" r="5" fill="#001510" />
      <circle cx="75.5" cy="49.5" r="3" fill="white" />
      <circle cx="81.5" cy="57" r="1.4" fill="rgba(255,255,255,0.75)" />
      <ellipse cx="28" cy="66" rx="9" ry="5.5" fill="rgba(255,105,140,0.28)" />
      <ellipse cx="92" cy="66" rx="9" ry="5.5" fill="rgba(255,105,140,0.28)" />
      <path d="M44 70 Q60 86 76 70" stroke="#004d40" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M46 72 Q60 82 74 72" stroke="#003d32" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
      <ellipse cx="22" cy="97" rx="12" ry="11" fill={`url(#body-${id})`} />
      <ellipse cx="13" cy="90" rx="7.5" ry="8.5" fill={`url(#body-${id})`} />
      <ellipse cx="11" cy="103" rx="7.5" ry="8" fill={`url(#body-${id})`} />
      <ellipse cx="98" cy="97" rx="12" ry="11" fill={`url(#body-${id})`} />
      <ellipse cx="107" cy="90" rx="7.5" ry="8.5" fill={`url(#body-${id})`} />
      <ellipse cx="109" cy="103" rx="7.5" ry="8" fill={`url(#body-${id})`} />
      <g opacity="0.85">
        <path d="M14 44 L15.2 40.5 L16.4 44 L20 45.2 L16.4 46.4 L15.2 50 L14 46.4 L10.5 45.2Z" fill="#00f2cc" />
      </g>
      <g opacity="0.7">
        <path d="M105 44 L106.2 40.5 L107.4 44 L111 45.2 L107.4 46.4 L106.2 50 L105 46.4 L101.5 45.2Z" fill="#00f2cc" />
      </g>
      <g opacity="0.5">
        <path d="M8 62 L8.8 59.8 L9.6 62 L11.8 62.8 L9.6 63.6 L8.8 65.8 L8 63.6 L5.8 62.8Z" fill="#00cfab" />
      </g>
    </svg>
  );
}

export function AuRenMark({ size = 26 }: { size?: number }) {
  const id = `hmk${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 120 128" fill="none">
      <defs>
        <radialGradient id={`mbody-${id}`} cx="38%" cy="30%" r="68%">
          <stop offset="0%" stopColor="#00f2cc" />
          <stop offset="55%" stopColor="#00cfab" />
          <stop offset="100%" stopColor="#007560" />
        </radialGradient>
        <radialGradient id={`meye-${id}`} cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ccf5ee" />
        </radialGradient>
        <radialGradient id={`miris-${id}`} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#00b899" />
          <stop offset="100%" stopColor="#005a4a" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="96" rx="30" ry="22" fill={`url(#mbody-${id})`} />
      <circle cx="60" cy="58" r="40" fill={`url(#mbody-${id})`} />
      <ellipse cx="60" cy="80" rx="24" ry="17" fill="rgba(255,255,255,0.14)" />
      <circle cx="43" cy="52" r="13.5" fill={`url(#meye-${id})`} />
      <circle cx="44.5" cy="53.5" r="8" fill={`url(#miris-${id})`} />
      <circle cx="45.5" cy="54.5" r="4.8" fill="#001510" />
      <circle cx="41.5" cy="49.5" r="2.8" fill="white" />
      <circle cx="77" cy="52" r="13.5" fill={`url(#meye-${id})`} />
      <circle cx="78.5" cy="53.5" r="8" fill={`url(#miris-${id})`} />
      <circle cx="79.5" cy="54.5" r="4.8" fill="#001510" />
      <circle cx="75.5" cy="49.5" r="2.8" fill="white" />
      <ellipse cx="28" cy="66" rx="9" ry="5.5" fill="rgba(255,105,140,0.28)" />
      <ellipse cx="92" cy="66" rx="9" ry="5.5" fill="rgba(255,105,140,0.28)" />
      <path d="M44 70 Q60 86 76 70" stroke="#004d40" strokeWidth="3" strokeLinecap="round" fill="none" />
      <ellipse cx="22" cy="97" rx="12" ry="11" fill={`url(#mbody-${id})`} />
      <ellipse cx="13" cy="90" rx="7.5" ry="8.5" fill={`url(#mbody-${id})`} />
      <ellipse cx="98" cy="97" rx="12" ry="11" fill={`url(#mbody-${id})`} />
      <ellipse cx="107" cy="90" rx="7.5" ry="8.5" fill={`url(#mbody-${id})`} />
    </svg>
  );
}
