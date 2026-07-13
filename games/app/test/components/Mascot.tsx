type MascotProps = {
  className?: string;
};

export default function Mascot({ className }: MascotProps) {
  return (
    <div className={className}>
      <svg width="80" height="80" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="#58cc02" />
        <circle cx="35" cy="40" r="12" fill="white" />
        <circle cx="65" cy="40" r="12" fill="white" />
        <circle cx="35" cy="42" r="5" fill="black" />
        <circle cx="65" cy="42" r="5" fill="black" />
        <path d="M40 65 Q50 75 60 65" stroke="white" strokeWidth="4" fill="none" />
        <path d="M45 50 L55 50 L50 60 Z" fill="#ffc800" />
      </svg>
    </div>
  );
}
