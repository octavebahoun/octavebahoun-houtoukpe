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

function Stroke({ className = 'size-5', strokeWidth = 2, children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`fill-none stroke-current ${className}`}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function Sun(props) {
  return (
    <Stroke {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </Stroke>
  )
}

export function Moon(props) {
  return (
    <Stroke {...props}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </Stroke>
  )
}

export function Search(props) {
  return (
    <Stroke {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Stroke>
  )
}

export function Copy(props) {
  return (
    <Stroke {...props}>
      <rect x="9" y="9" width="12" height="12" rx="2.5" />
      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
    </Stroke>
  )
}

export function Check(props) {
  return (
    <Stroke {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Stroke>
  )
}

export function ArrowRight(props) {
  return (
    <Stroke {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Stroke>
  )
}

export function ArrowLeft(props) {
  return (
    <Stroke {...props}>
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </Stroke>
  )
}

export function ArrowDown(props) {
  return (
    <Stroke {...props}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </Stroke>
  )
}

export function ArrowUp(props) {
  return (
    <Stroke {...props}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </Stroke>
  )
}

export function Plus(props) {
  return (
    <Stroke {...props}>
      <path d="M12 5v14M5 12h14" />
    </Stroke>
  )
}

export function Close(props) {
  return (
    <Stroke {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Stroke>
  )
}

export function Terminal(props) {
  return (
    <Stroke {...props}>
      <path d="m5 7 5 5-5 5M12 19h7" />
    </Stroke>
  )
}

export function GitBranch(props) {
  return (
    <Stroke {...props}>
      <circle cx="6" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="7" r="2" />
      <path d="M6 7v10M18 9c0 5-6 4-11 8" />
    </Stroke>
  )
}

export function GitMerge(props) {
  return (
    <Stroke {...props}>
      <circle cx="6" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="12" r="2" />
      <path d="M6 7v10M6 7c0 4 4 5 10 5" />
    </Stroke>
  )
}

export function GitPullRequest(props) {
  return (
    <Stroke {...props}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M6 8v8M18 16V9a2 2 0 0 0-2-2h-4M14 4l-3 3 3 3" />
    </Stroke>
  )
}

export function Star(props) {
  return (
    <Stroke {...props}>
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3z" />
    </Stroke>
  )
}

export function Code(props) {
  return (
    <Stroke {...props}>
      <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
    </Stroke>
  )
}

export function Globe(props) {
  return (
    <Stroke {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </Stroke>
  )
}

export function Clock(props) {
  return (
    <Stroke {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Stroke>
  )
}

export function Command(props) {
  return (
    <Stroke {...props}>
      <path d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6z" />
    </Stroke>
  )
}

export function Send(props) {
  return (
    <Stroke {...props}>
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </Stroke>
  )
}

export function Layers(props) {
  return (
    <Stroke {...props}>
      <path d="M12 3 21 8l-9 5-9-5 9-5zM3 13l9 5 9-5" />
    </Stroke>
  )
}

export function Cpu(props) {
  return (
    <Stroke {...props}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M10 10h4v4h-4zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </Stroke>
  )
}

export function Book(props) {
  return (
    <Stroke {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
    </Stroke>
  )
}

export function Link(props) {
  return (
    <Stroke {...props}>
      <path d="M10 14a4 4 0 0 0 5.66 0l2.83-2.83a4 4 0 0 0-5.66-5.66L11.5 6.9" />
      <path d="M14 10a4 4 0 0 0-5.66 0L5.5 12.83a4 4 0 0 0 5.66 5.66l1.34-1.39" />
    </Stroke>
  )
}

export function Play(props) {
  return (
    <Stroke {...props}>
      <path d="M7 4v16l13-8L7 4z" />
    </Stroke>
  )
}

export function Pause(props) {
  return (
    <Stroke {...props}>
      <path d="M8 5v14M16 5v14" />
    </Stroke>
  )
}

export function Bolt(props) {
  return (
    <Stroke {...props}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </Stroke>
  )
}

export function Heart(props) {
  return (
    <Stroke {...props}>
      <path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1.1L12 22l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
    </Stroke>
  )
}
