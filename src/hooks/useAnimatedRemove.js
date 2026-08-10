import { useCallback } from 'react'
import gsap from 'gsap'

/**
 * Wraps a tool's removeFile(idx) so clicking remove plays a fade/scale-out
 * on the tile before it actually leaves state.
 *
 * const handleRemove = useAnimatedRemove(removeFile)
 * <ImageTile onRemove={(e) => handleRemove(e, idx)} />
 */
const useAnimatedRemove = (removeFile) => {
    return useCallback((e, idx) => {
        const frame = e.currentTarget.closest('.result-frame')
        if (!frame) {
            removeFile(idx)
            return
        }
        gsap.to(frame, {
            opacity: 0,
            scale: 0.9,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => removeFile(idx),
        })
    }, [removeFile])
}

export default useAnimatedRemove