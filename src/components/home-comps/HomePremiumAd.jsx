import React from 'react'
import { Crown, Gem } from 'lucide-react'
import MagneticWrapper from '../MagneticWrapper'

const HomePremiumAd = (props) => {
    const { isPopup = false } = props

    return (
        <div
            className={`
                bg-linear-to-r from-amber-dim/90 to-amber-47/90
                text-neutral-900 rounded-xl overflow-hidden
                ${isPopup
                    ? 'w-full'
                    : 'w-13/14 mt-6 md:mt-10 mb-6 md:mb-10'
                }
            `}
        >
            <div
                className={`
                    w-full flex items-center justify-between
                    ${isPopup
                        ? 'flex-col sm:flex-row gap-5 px-5 py-6 sm:px-6 sm:py-7'
                        : 'flex-col md:flex-row gap-8 md:gap-4 lg:gap-8 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-16 lg:py-14 xl:px-24 xl:py-16'
                    }
                `}
            >

                <div
                    className={`
                        text-white flex flex-col justify-center
                        ${isPopup
                            ? 'w-full sm:w-auto gap-4'
                            : 'w-full md:w-auto gap-6 md:gap-7'
                        }
                    `}
                >

                    <div className='flex flex-col gap-2'>

                        <h1
                            className={`
                                font-body font-black
                                ${isPopup
                                    ? 'text-3xl sm:text-4xl'
                                    : 'text-4xl sm:text-5xl md:text-5xl lg:text-6xl'
                                }
                            `}
                        >
                            Premium
                        </h1>

                        <p
                            className={`
                                font-mono font-semibold leading-relaxed
                                ${isPopup
                                    ? 'text-sm sm:text-base'
                                    : 'text-base sm:text-lg md:text-xl lg:text-2xl'
                                }
                            `}
                        >
                            Upgrade to Premium to work faster
                            <br />
                            with all features and unlimited usage.
                        </p>

                        <p
                            className={`
                                text-white/85 font-mono font-semibold
                                ${isPopup
                                    ? 'text-xs sm:text-sm'
                                    : 'text-sm sm:text-base md:text-lg lg:text-xl'
                                }
                            `}
                        >
                            10x more productivity
                        </p>

                    </div>

                    <button
                        className={`
                            flex items-center gap-2 justify-center
                            bg-black rounded-lg text-white
                            font-bold font-body
                            hover:bg-gray-800 transition-colors
                            ${isPopup
                                ? 'w-full sm:w-fit text-sm sm:text-base py-2.5 px-4'
                                : 'w-full sm:w-fit text-base sm:text-lg md:text-xl py-3.5 px-5 sm:py-4 sm:px-6'
                            }
                        `}
                    >
                        <Crown
                            className={
                                isPopup
                                    ? 'w-4 h-4'
                                    : 'w-5 sm:w-5.5 md:w-6 md:h-6'
                            }
                        />

                        Upgrade Now
                    </button>

                </div>

                <div
                    className={`
                        flex items-center justify-center shrink-0
                        ${isPopup
                            ? 'hidden'
                            : 'hidden sm:flex md:pr-2 lg:pr-0'
                        }
                    `}
                >

                    <Gem
                        strokeWidth={1}
                        className={`
                            -rotate-12 text-amber-200/90
                            ${isPopup
                                ? 'w-24 h-24 -mr-4 sm:w-28 sm:h-28'
                                : 'w-35 h-35 md:w-40 md:h-40 lg:w-52.5 lg:h-52.5 xl:w-62.5 xl:h-62.5 -mr-5'
                            }
                        `}
                    />

                    <Gem
                        strokeWidth={1}
                        className={`
                            rotate-24 text-amber-200/90
                            ${isPopup
                                ? 'w-24 h-24 sm:w-28 sm:h-28'
                                : 'w-35 h-35 md:w-40 md:h-40 lg:w-52.5 lg:h-52.5 xl:w-62.5 xl:h-62.5'
                            }
                        `}
                    />

                </div>

            </div>
        </div>
    )
}

export default HomePremiumAd