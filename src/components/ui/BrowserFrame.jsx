import { useState } from 'react'
import { cx } from '../../lib/cx'

// Fenêtre de navigateur autour d'une capture, avec repli si l'image ne charge pas
export function BrowserFrame({ src, alt, url, className, imgClassName, eager = false, fallback }) {
  const [failed, setFailed] = useState(false)
  const host = url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : ''

  return (
    <div
      className={cx(
        'overflow-hidden rounded-[18px] border border-white/10 bg-night-2 shadow-lift',
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        {host && (
          <span className="mx-auto max-w-[70%] truncate rounded-md bg-white/5 px-3 py-0.5 font-mono text-[11px] text-white/45">
            {host}
          </span>
        )}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-night">
        {failed || !src ? (
          (fallback ?? <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(254_70_25/0.35),transparent_60%)]" />)
        ) : (
          <img
            src={src}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setFailed(true)}
            className={cx('size-full object-cover object-top', imgClassName)}
          />
        )}
      </div>
    </div>
  )
}
