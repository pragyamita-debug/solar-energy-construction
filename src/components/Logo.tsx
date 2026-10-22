export function Logo() {
  return (
    <a className="logo" href="#home" aria-label="PureSolar home">
      <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden>
        <defs>
          <linearGradient id="logo-sun" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffd36b" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="logo-panel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#60a5fa" />
            <stop offset="1" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        <g stroke="url(#logo-sun)" strokeWidth="2" strokeLinecap="round" className="logo__rays">
          <path d="M22 3v4M33.5 8.5l-2.8 2.8M38 19h-4M10.5 8.5l2.8 2.8M6 19h4" />
        </g>
        <circle cx="22" cy="19" r="8" fill="url(#logo-sun)" />
        <path d="M6 33l6-11h22l-6 11z" fill="url(#logo-panel)" stroke="#0a1120" strokeWidth="1.2" />
        <path d="M13.5 22.5 9.5 33M20.5 22.5 17 33M27.5 22.5 24.5 33M8.5 27.5h23" stroke="#0a1120" strokeWidth="1" opacity="0.7" />
      </svg>
      <span>
        Pure<b>Solar</b>
      </span>
    </a>
  );
}
