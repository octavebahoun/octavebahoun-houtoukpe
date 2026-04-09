import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnim(variants = 'fadeUp', triggerRef = null) {
  const defaultRef = useRef(null)
  const elRef = triggerRef || defaultRef
  const [animReady, setAnimReady] = useState(false)

  useEffect(() => {
    if (!elRef?.current) return
    setAnimReady(true)

    const animations = {
      fadeUp: gsap.fromTo(elRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: elRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      ),
      fadeLeft: gsap.fromTo(elRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: elRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      ),
      fadeRight: gsap.fromTo(elRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: elRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      ),
      scaleIn: gsap.fromTo(elRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: elRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      ),
    }

    const anim = animations[variants] || animations.fadeUp

    return () => {
      anim?.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === elRef.current) st.kill()
      })
    }
  }, [variants, elRef])

  return { ref: defaultRef, animReady }
}
