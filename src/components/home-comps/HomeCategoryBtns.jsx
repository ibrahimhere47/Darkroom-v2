import React from 'react'


const HomeCategoryBtns = (props) => {
    
    const {categories, activeCategory, setActiveCategory} = props

    return (
        <div className='flex flex-wrap gap-2 mb-6 md:mb-9 mt-5 justify-self-center'>
            {categories.map((category) => (
                <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={`px-2 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                        activeCategory === category.name
                            ? 'bg-amber-47 text-neutral-900 hover:bg-amber-400 border border-neutral-900'
                            : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-neutral-600'
                    }`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    )
}

export default HomeCategoryBtns