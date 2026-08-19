import React, { useRef, useEffect } from 'react'
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
        <>
        <div className='flex justify-center items-center mt-6.5 -mb-2.5 gap-3'>
            <div className='flex justify-center items-center'>
                <Search color='#777777' />
            </div>
            <div className='flex justify-center items-center w-3/4'>
                <MagneticWrapper strength={0.02} className='w-full'>
                    <div 
                        className='flex justify-center items-center gap-2'
                        onMouseEnter={handleHover}
                        onMouseLeave={handleHoverLeave}
                    >
                        <div
                            ref={borderRef}
                            className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none border border-amber-dim"
                        />
                        <input 
                            type='text'
                            className='bg-neutral-800 rounded-2xl py-2.75 px-6 w-full placeholder-amber-dim font-mono focus:border-none focus:outline-none'
                            placeholder='Search through your tools...'
                            maxLength={32}
                            value={searchInput}
                            onInput={(e) => setSearchInput(e.target.value.toLowerCase())}
                        />
                    </div>
                </MagneticWrapper>
            </div>
        </div>
        </>
    )
}

export default HomeToolSearchBar