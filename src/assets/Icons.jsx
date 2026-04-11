export function WelcomeIllustration({ className }) {
  return (
    <svg viewBox="0 0 280 260" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="140" cy="240" rx="100" ry="15" fill="#e0f0f0" />
      <path d="M80 140 Q60 140 60 180 L60 220 Q60 235 75 235 L90 235 L90 180 Q90 160 100 150 Z" fill="#2a7a7a" />
      <path d="M90 150 L200 150 Q210 150 210 165 L210 220 Q210 235 195 235 L90 235 L90 150 Z" fill="#3a9a9a" />
      <path d="M75 235 L75 255" stroke="#2a7a7a" strokeWidth="6" strokeLinecap="round" />
      <path d="M195 235 L195 255" stroke="#2a7a7a" strokeWidth="6" strokeLinecap="round" />
      <circle cx="145" cy="95" r="28" fill="#f5c6a0" />
      <path d="M130 75 Q125 60 145 55 Q165 50 168 70 Q170 80 165 88" fill="#1a3c4a" />
      <path d="M120 120 Q110 140 105 180 L105 210 Q105 220 115 220 L140 220 L140 160 Q140 140 150 130 Z" fill="#1a3c4a" />
      <path d="M150 130 Q170 120 180 140 L185 180 L175 185 L160 150 Z" fill="#f5c6a0" />
      <rect x="170" y="165" width="18" height="28" rx="3" fill="#1a3c4a" stroke="#f5f5f5" strokeWidth="1" />
      <rect x="172" y="169" width="14" height="20" rx="1" fill="#4ecdc4" />
      <path d="M115 220 L100 250" stroke="#1a3c4a" strokeWidth="8" strokeLinecap="round" />
      <path d="M135 220 L150 250" stroke="#1a3c4a" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

export function BellIcon({ width = 80, height = 80 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="#1a3c4a" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C10.9 2 10 2.9 10 4C10 4.1 10 4.19 10.02 4.29C7.12 5.14 5 7.82 5 11V17L3 19V20H21V19L19 17V11C19 7.82 16.88 5.14 13.98 4.29C14 4.19 14 4.1 14 4C14 2.9 13.1 2 12 2ZM12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z" />
    </svg>
  );
}

export function HamburgerIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  );
}

export function ProgressRing({ percentage, radius = 70 }) {
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-ring-container position-relative">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r={radius} fill="none" stroke="#e6f2f2" strokeWidth="14" />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#4ecdc4"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 100 100)"
        />
      </svg>
      <div className="progress-ring-text position-absolute top-50 start-50 translate-middle text-center">
        <span className="progress-pct">{percentage}%</span>
      </div>
    </div>
  );
}
