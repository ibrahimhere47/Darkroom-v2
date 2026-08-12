import React from 'react'
import { Crown, Gem } from 'lucide-react'

const HomePremiumAd = () => {
    return (
        <div className='w-13/14 bg-linear-to-r from-amber-dim/90 to-amber-47/90 text-neutral-900 rounded-xl mt-6 md:mt-10 mb-6 md:mb-10 overflow-hidden'>
        <div className='w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 lg:gap-8 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-16 lg:py-14 xl:px-24 xl:py-16'>

                <div className='w-full md:w-auto text-white flex flex-col justify-center gap-6 md:gap-7'>
                    
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-zilla text-4xl sm:text-5xl md:text-5xl lg:text-6xl'>
                            Premium
                        </h1>

                        <p className='font-mono font-semibold text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed'>
                            Upgrade to Premium to work faster
                            <br className='hidden sm:block' />
                            with all features and unlimited usage.
                        </p>

                        <p className='text-white/85 font-mono font-semibold text-sm sm:text-base md:text-lg lg:text-xl'>
                            10x more productivity
                        </p>
                    </div>

                    <button className='w-full sm:w-fit flex items-center gap-2 justify-center bg-black rounded-lg text-white font-bold font-body text-base sm:text-lg md:text-xl py-3.5 px-5 sm:py-4 sm:px-6 hover:bg-gray-800 transition-colors'>
                        <Crown
                            size={20}
                            className='sm:w-5.5 sm:h-5.5 md:w-6 md:h-6'
                        />
                        Upgrade Now
                    </button>
                </div>

                <div className='hidden sm:flex md:flex items-center justify-center shrink-0 md:pr-2 lg:pr-0'>
                    <Gem
                        size={140}
                        strokeWidth={1}
                        className='-rotate-12 text-amber-200/90 -mr-5 md:w-40 md:h-40 lg:w-52.5 lg:h-52.5 xl:w-62.5 xl:h-62.5'
                    />

                    <Gem
                        size={140}
                        strokeWidth={1}
                        className='rotate-24 text-amber-200/90 md:w-40 md:h-40 lg:w-52.5 lg:h-52.5 xl:w-62.5 xl:h-62.5'
                    />
                </div>

            </div>
        </div>
    )
}

export default HomePremiumAd