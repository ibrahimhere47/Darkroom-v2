import React from 'react'
import { ImagePlus, Paintbrush } from 'lucide-react'

const DoodleStage = ({ imageUrl, children }) => {
    if (!imageUrl) {
        return (
            <div className='flex-1 min-h-[420px] rounded-2xl border border-dashed border-neutral-800 bg-neutral-950/40 flex flex-col items-center justify-center gap-3 text-center px-6'>
                <div className='w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center'>
                    <ImagePlus size={20} className='text-neutral-600' />
                </div>
                <p className='text-sm text-neutral-400'>Upload an image to start doodling</p>
                <p className='text-[11px] text-neutral-600 max-w-[220px]'>
                    Drop a JPG or PNG onto the page, then sketch, erase and save right on top of it.
                </p>
            </div>
        )
    }

    return (
        <div className='flex-1 rounded-2xl border border-neutral-800 bg-neutral-950/40 overflow-hidden'>
            <div className='flex items-center gap-2 px-4 py-2.5 border-b border-neutral-800 bg-neutral-950/60'>
                <Paintbrush size={13} className='text-neutral-600' />
                <span className='text-[11px] text-neutral-500 tracking-wide'>Canvas</span>
            </div>
            <div className='p-4 flex items-center justify-center bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:16px_16px]'>
                <div className='w-full max-w-full'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DoodleStage