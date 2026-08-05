import React, { useRef, useState } from 'react'
import HeroTitle from './HeroTitle'
import HeroIcon from './HeroIcon'

const Hero = () => {
    return (
        <>
        <div className='flex justify-between mb-9 cursor-default'>
            <div>
                <p className='font-mono text-amber-47 text-sm pb-4'>safe | fast | efficient</p>
                <HeroTitle />
                <p className='font-body text-md pt-4'>Quick edits are supposed to be quick.</p>
            </div>
            <div>
                <HeroIcon />
            </div>
        </div>
        <div className='border-b border-neutral-400 w-full mb-9' />
        </>
    )
}

export default Hero