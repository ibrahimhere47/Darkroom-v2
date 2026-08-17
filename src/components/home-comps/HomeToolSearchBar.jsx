import React, { useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import MagneticWrapper from '../MagneticWrapper'
import gsap from 'gsap'

const HomeToolSearchBar = (props) => {
    const { searchInput, setSearchInput, isSearching, setIsSearching } = props
    useEffect(() => {    
        if (searchInput != '') {
            setIsSearching(true)
        }
        else {
            setIsSearching(false)
        }
    }, [searchInput])

    const borderRef = useRef(null)

    const handleHover = () => {
        gsap.to(borderRef.current, {
            autoAlpha: 1,
            boxShadow: `0 0 8px #e8a33d`,
            duration: 0.4,
        })
    }

    const handleHoverLeave = () => {
        gsap.to(borderRef.current, {
            autoAlpha: 0,
            boxShadow: 'none',
            duration: 0.4,
        })
    }

    return (
        <div className='flex justify-center items-center mt-6 -mb-3 w-full'>
            <MagneticWrapper strength={0.02} className='w-5/6'>
                <div 
                    className='flex justify-center items-center gap-2'
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHoverLeave}
                >
                    <div
                        ref={borderRef}
                        className="absolute inset-0 rounded-xl opacity-0 pointer-events-none border border-amber-dim"
                    />
                    <input 
                        type='text'
                        className='bg-neutral-800 rounded-lg py-1.5 px-5 w-full placeholder-amber-dim font-mono'
                        placeholder='Search through our tools...'
                        value={searchInput}
                        onInput={(e) => setSearchInput(e.target.value.toLowerCase())}
                    />
                </div>
            </MagneticWrapper>
        </div>
    )
}

export default HomeToolSearchBar