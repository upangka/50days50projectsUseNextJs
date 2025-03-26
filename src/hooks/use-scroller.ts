import { useEffect } from 'react'

export function useScrollEffect(effect: (this: Window, ev: Event) => void) {
  useEffect(() => {
    window.addEventListener('scroll', effect)
    return () => window.removeEventListener('scroll', effect)
  }, [effect])
}
