import React from 'react'
import { Image } from 'lucide-react'

const Hero = () => {
    return (
        <>
        <div className='flex justify-between mb-9'>
            <div>
                <p className='font-mono text-amber-47 text-sm pb-4'>safe | fast | efficient</p>
                <h1 className='font-zilla text-6xl leading-14 tracking-wide'>Your Private<br />Image Editing Toolkit</h1>
                <p className='font-body text-md pt-4'>Quick edits are supposed to be quick.</p>
            </div>
            <div>
                <div className='relative flex items-center justify-center'>
                    <div className='absolute inset-0 bg-amber-47 opacity-0 blur-lg rounded-full' />
                    <Image color='e8a33d' />
                </div>
            </div>
        </div>
        <div className='border-b border-neutral-400 w-full mb-9' />
        </>
    )
}

export default Hero