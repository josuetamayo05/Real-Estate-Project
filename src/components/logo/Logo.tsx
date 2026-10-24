interface LogoProps {
  className?: string;
  src?: string;
}

export function Logo({ 
  className = "h-10 sm:h-14 w-auto", 
  src = '/logo.png' // Apunta directamente a public/
}: LogoProps) {
  return (
    <div className="flex items-center">
      <img
        src={src}
        alt="Marianne Houses"
        className={`object-contain transition-transform duration-300 hover:scale-105 ${className}`}
      />
    </div>
  );
}

