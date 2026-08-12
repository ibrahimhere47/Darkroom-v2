import React, { useState } from 'react'
import MagneticWrapper from '../MagneticWrapper'
import { CATEGORIES } from '../../tools/toolsRegistry'

const HomeCategoryBtns = (props) => {
    const { activeCategory, setActiveCategory } = props

    const [hoveredCategory, setHoveredCategory] = useState(null)

    const categoryStyles = {
        All: {
            icon: 'text-amber-400',
            active: 'bg-amber-400 text-neutral-950 border-amber-400',
            shadow: 'shadow-[0_0_20px_rgba(251,191,36,0.18)]',
        },

        Optimize: {
            icon: 'text-[#FF4D6D]',
            active: 'bg-[#FF4D6D] text-white border-[#FF4D6D]',
            shadow: 'shadow-[0_0_20px_rgba(255,77,109,0.18)]',
        },

        Edit: {
            icon: 'text-[#FF9F1C]',
            active: 'bg-[#FF9F1C] text-neutral-950 border-[#FF9F1C]',
            shadow: 'shadow-[0_0_20px_rgba(255,159,28,0.18)]',
        },

        Properties: {
            icon: 'text-[#2EC4B6]',
            active: 'bg-[#2EC4B6] text-neutral-950 border-[#2EC4B6]',
            shadow: 'shadow-[0_0_20px_rgba(46,196,182,0.18)]',
        },

        Effects: {
            icon: 'text-[#7B8CDE]',
            active: 'bg-[#7B8CDE] text-white border-[#7B8CDE]',
            shadow: 'shadow-[0_0_20px_rgba(123,140,222,0.18)]',
        },

        Security: {
            icon: 'text-[#9B5DE5]',
            active: 'bg-[#9B5DE5] text-white border-[#9B5DE5]',
            shadow: 'shadow-[0_0_20px_rgba(155,93,229,0.18)]',
        },
    }

    return (
        <div className="flex flex-wrap justify-center gap-3 mt-7 mb-4">
            {CATEGORIES.map((category) => {
                const Icon = category.icon

                const isActive = activeCategory === category.name
                const isHovered = hoveredCategory === category.name
                const hasHover = hoveredCategory !== null

                // Hover takes priority over the selected state.
                // When nothing is hovered, the selected button is highlighted.
                const isHighlighted = isHovered || (isActive && !hasHover)

                const styles =
                    categoryStyles[category.name] || categoryStyles.All

                return (
                    <MagneticWrapper
                        key={category.name}
                        strength={isHighlighted ? 0.12 : 0.18}
                    >
                        <button
                            onClick={() => setActiveCategory(category.name)}
                            onMouseEnter={() =>
                                setHoveredCategory(category.name)
                            }
                            onMouseLeave={() =>
                                setHoveredCategory(null)
                            }
                            className={`
                                group
                                flex items-center gap-2
                                py-2.25
                                px-9
                                rounded-full
                                border
                                text-sm
                                font-medium
                                transition-all duration-200
                                cursor-pointer

                                ${
                                    isHighlighted
                                        ? `${styles.active} ${styles.shadow}`
                                        : 'bg-neutral-900/60 text-neutral-300 border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/80'
                                }
                            `}
                        >
                            {Icon && (
                                <Icon
                                    size={17}
                                    strokeWidth={1.8}
                                    className={`
                                        transition-transform duration-200
                                        ${
                                            isHighlighted
                                                ? 'text-current'
                                                : styles.icon
                                        }
                                        group-hover:scale-110
                                    `}
                                />
                            )}

                            <span>{category.name}</span>
                        </button>
                    </MagneticWrapper>
                )
            })}
        </div>
    )
}

export default HomeCategoryBtns