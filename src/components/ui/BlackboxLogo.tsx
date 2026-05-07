interface BlackboxLogoProps {
  className?: string;
  size?: number;
  invert?: boolean;
}

export function BlackboxLogo({ className = '', size = 48, invert = false }: BlackboxLogoProps) {
  const panel = invert ? 'black' : 'white';
  const letter = invert ? 'white' : 'black';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* ── B face: rounded card, front-left of open isometric box ── */}
      <path
        d="
          M 44,19
          Q 62,15 63,28
          L 64,63
          Q 64,71 56,72
          L 33,69
          Q 25,68 26,60
          L 26,29
          Q 26,20 35,19
          Z
        "
        fill={panel}
      />

      {/* B letter */}
      <text
        x="42" y="57"
        fontFamily="'Arial Black', Arial, sans-serif"
        fontWeight="900"
        fontSize="30"
        fill={letter}
        dominantBaseline="alphabetic"
      >B</text>

      {/* ── O face: flat diamond at base of box ── */}
      <path
        d="M 33,69 L 64,64 L 76,83 L 45,88 Z"
        fill={panel}
      />

      {/* O concentric rings */}
      <ellipse cx="54" cy="76" rx="15" ry="8"  fill="none" stroke={letter} strokeWidth="3.5" />
      <ellipse cx="54" cy="76" rx="7"  ry="3.8" fill="none" stroke={letter} strokeWidth="2.5" />

      {/* ── x: two crossing strokes, floating upper-right ── */}
      <line x1="70" y1="19" x2="84" y2="36" stroke={panel} strokeWidth="5.5" strokeLinecap="round" />
      <line x1="84" y1="19" x2="70" y2="36" stroke={panel} strokeWidth="5.5" strokeLinecap="round" />
    </svg>
  );
}
