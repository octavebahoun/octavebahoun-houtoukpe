export function Sparkle({ className = 'size-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className}`} aria-hidden="true">
      <path d="M12 2c1.25 4.7 3.55 7 8.25 8.25-4.7 1.25-7 3.55-8.25 8.25C10.75 13.8 8.45 11.5 3.75 10.25 8.45 9 10.75 6.7 12 2z" />
    </svg>
  )
}

export function ArrowUpRight({ className = 'size-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`fill-none stroke-current stroke-2 ${className}`}
      aria-hidden="true"
    >
      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function GitHub({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className}`} aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export function Malt({ className = 'size-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`fill-none stroke-current ${className}`}
      strokeWidth="2.4"
      aria-hidden="true"
    >
      <path
        d="M3.2 19.5v-6.2a4.4 4.4 0 0 1 8.8 0 4.4 4.4 0 0 1 8.8 0v6.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Rocket({ className = 'size-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`fill-none stroke-current stroke-2 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Eye({ className = 'size-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`fill-none stroke-current stroke-2 ${className}`}
      aria-hidden="true"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function Lightbulb({ className = 'size-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`fill-none stroke-current stroke-2 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 18h6" strokeLinecap="round" />
      <path d="M10 22h4" strokeLinecap="round" />
    </svg>
  )
}

export function Pencil({ className = 'size-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`fill-none stroke-current stroke-2 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m15 5 4 4" strokeLinecap="round" />
    </svg>
  )
}

export function ClipboardCheck({ className = 'size-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`fill-none stroke-current stroke-2 ${className}`}
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M8 2v4M16 2v4" strokeLinecap="round" />
      <path d="m9 14 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Calendar({ className = 'size-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`fill-none stroke-current stroke-2 ${className}`}
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M8 2v4M16 2v4M3 10h18" strokeLinecap="round" />
    </svg>
  )
}

export function Mail({ className = 'size-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`fill-none stroke-current stroke-2 ${className}`}
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MapPin({ className = 'size-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`fill-none stroke-current stroke-2 ${className}`}
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function Facebook({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className}`} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export function XIcon({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className}`} aria-hidden="true">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  )
}

export function LinkedIn({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className}`} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
}

export function Instagram({ className = 'size-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`fill-none stroke-current stroke-2 ${className}`}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" className="fill-current stroke-none" />
    </svg>
  )
}
