import { useEffect, useState } from 'react'

export function HeroPortrait({ name, src, className }: Readonly<{ name: string; src?: string; className: string }>) {
  const [failed, setFailed] = useState(false)
  useEffect(() => setFailed(false), [src])
  if (!src || failed) {
    const initials = name.split(' ').map((part) => part[0]).join('').slice(-2).toUpperCase()
    return <span className={`${className} portrait-fallback`} aria-label={`Chân dung dự phòng ${name}`}>{initials}</span>
  }
  return <img className={className} src={src} alt={`Chân dung ${name}`} onError={() => setFailed(true)} />
}
