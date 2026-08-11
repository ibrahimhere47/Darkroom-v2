import React from 'react'
import { Crown, Gem } from 'lucide-react'

const HomePremiumAd = () => {
    return (
        <div className='w-13/14 bg-linear-to-r from-amber-dim/90 to-amber-47/90 text-neutral-900 rounded-xl mt-6 md:mt-10 mb-6 md:mb-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8'>
            <div className='w-full flex justify-between gap-2 md:gap-4 py-41 px-24'>
                <div className='text-white flex flex-col justify-center gap-6'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='font-zilla text-5xl'>Premium</h1>
                        <p className='font-mono font-semibold text-2xl'>Upgrade to Premium to work faster<br />with all features and unlimited usage.</p>
                        <p className='text-white/85 font-mono font-semibold text-xl'>10x more productivity</p>
                    </div>
                    <button className='flex items-center gap-2 justify-center bg-black rounded-lg text-white font-bold font-body text-xl py-5 px-6 hover:bg-gray-800'>
                        <Crown />
                        Upgrade Now
                    </button>
                </div>
                <div className='hidden md:flex items-center justify-center -mr-2.5'>
                    <Gem size={250} strokeWidth={1} className='-rotate-12 text-amber-200/90 -mr-4' />
                    <Gem size={250} strokeWidth={1} className='rotate-24 text-amber-200/90' />
                </div>
            </div>
        </div>
    )
}

export default HomePremiumAd