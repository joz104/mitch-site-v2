export function SoccerBall({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      className={`${className}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
      <path d="M50 5 L65 15 L65 35 L50 45 L35 35 L35 15 Z" fill="currentColor" opacity="0.5"/>
      <path d="M20 25 L35 15 L35 35 L20 45 L5 35 L5 15 Z" fill="currentColor" opacity="0.3"/>
      <path d="M80 25 L95 15 L95 35 L80 45 L65 35 L65 15 Z" fill="currentColor" opacity="0.3"/>
      <path d="M50 55 L65 65 L65 85 L50 95 L35 85 L35 65 Z" fill="currentColor" opacity="0.3"/>
      <path d="M20 55 L35 65 L35 85 L20 95 L5 85 L5 65 Z" fill="currentColor" opacity="0.3"/>
      <path d="M80 55 L95 65 L95 85 L80 95 L65 85 L65 65 Z" fill="currentColor" opacity="0.3"/>
    </svg>
  )
}

export function GoalPost({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 150"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="30" width="5" height="120" fill="currentColor" />
      <rect x="185" y="30" width="5" height="120" fill="currentColor" />
      <rect x="10" y="30" width="180" height="5" fill="currentColor" />
      <line x1="10" y1="45" x2="190" y2="45" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="10" y1="60" x2="190" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="10" y1="75" x2="190" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="10" y1="90" x2="190" y2="90" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="10" y1="105" x2="190" y2="105" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="10" y1="120" x2="190" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="10" y1="135" x2="190" y2="135" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}

export function FieldLines({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {/* Field outline */}
      <rect x="20" y="20" width="360" height="260" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2"/>

      {/* Center line */}
      <line x1="200" y1="20" x2="200" y2="280" stroke="currentColor" strokeWidth="2" opacity="0.2"/>

      {/* Center circle */}
      <circle cx="200" cy="150" r="40" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
      <circle cx="200" cy="150" r="3" fill="currentColor" opacity="0.3"/>

      {/* Left penalty area */}
      <rect x="20" y="90" width="60" height="120" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2"/>
      <rect x="20" y="110" width="30" height="80" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.15"/>

      {/* Right penalty area */}
      <rect x="320" y="90" width="60" height="120" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2"/>
      <rect x="350" y="110" width="30" height="80" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.15"/>

      {/* Corner arcs */}
      <path d="M20,25 Q25,20 30,20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
      <path d="M370,20 Q375,20 380,25" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
      <path d="M20,275 Q25,280 30,280" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
      <path d="M370,280 Q375,280 380,275" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
    </svg>
  )
}

export function FloatingSoccerBalls() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 left-10 animate-float">
        <SoccerBall className="text-neon-green opacity-20" size={60} />
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <SoccerBall className="text-neon-purple opacity-15" size={80} />
      </div>
      <div className="absolute bottom-20 left-1/3 animate-float" style={{ animationDelay: '2s' }}>
        <SoccerBall className="text-electric-blue opacity-10" size={100} />
      </div>
      <div className="absolute top-1/2 right-1/4 animate-float" style={{ animationDelay: '0.5s' }}>
        <SoccerBall className="text-neon-green opacity-15" size={70} />
      </div>
      <div className="absolute bottom-40 right-10 animate-float" style={{ animationDelay: '1.5s' }}>
        <SoccerBall className="text-neon-purple opacity-20" size={50} />
      </div>
    </div>
  )
}

export function TrophyIcon({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm3 8l-3-1.73L9 14l1.12-3.45L7.5 9h3.16L12 5.5 13.34 9h3.16l-2.62 1.55L15 14z"/>
    </svg>
  )
}