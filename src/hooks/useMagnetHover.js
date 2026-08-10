import { useRef } from 'react'
import gsap from 'gsap'

/**
 * Gives a button/element a subtle "magnetic" hover + press feel.
 *
 * const { ref, handlers } = useMagnetHover()
 * <button ref={ref} {...handlers}>Click</button>
 *
 * @param {number} scale - how big the element grows on hover (default 1.03)
 */
const useMagnetHover = (scale = 1.03) => {
    const ref = useRef(null)

    const handlers = {
        onMouseEnter: () => gsap.to(ref.current, { scale, duration: 0.25, ease: 'power2.out' }),
        onMouseLeave: () => gsap.to(ref.current, { scale: 1, duration: 0.3, ease: 'power2.out' }),
        onMouseDown: () => gsap.to(ref.current, { scale: 0.96, duration: 0.1, ease: 'power2.out' }),
        onMouseUp: () => gsap.to(ref.current, { scale, duration: 0.15, ease: 'power2.out' }),
    }

    return { ref, handlers }
}

export default useMagnetHover