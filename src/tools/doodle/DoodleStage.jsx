import React from 'react'
import { ImagePlus, Paintbrush } from 'lucide-react'

const DoodleStage = ({ imageUrl, children }) => {

    return (
        <div className='flex-1 rounded-2xl border border-neutral-800 bg-neutral-950/20 overflow-hidden'>
            <div className='p-4 flex items-center justify-center bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size[16px_16px]'>
                <div className='w-full max-w-full'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DoodleStage