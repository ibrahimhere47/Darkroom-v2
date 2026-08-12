import React from 'react'
import {
    SidebarPanel,
    SidebarSection,
} from '../../components/tool-comps/ToolSidebar'

const AddFilterDevelopPanel = (props) => {
    const { filter, setFilter, isFiltering, FILTERS } = props

    return (
        <div className='flex flex-col gap-6 mb-10 md:mb-2'>
            <SidebarSection eyebrow='Develop' description='Select from only the best filters to make your image pop.' />
            
            <div>
                <div className='flex gap-2'>
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            disabled={isFiltering}
                            className={`flex-1 py-2 rounded-lg text-xs uppercase tracking-wider cursor-pointer transition-colors duration-200 disabled:opacity-40 ${
                                filter === f
                                    ? 'bg-amber-47 text-black font-semibold'
                                    : 'bg-neutral-900 border border-neutral-700 text-neutral-400 hover:border-amber-47 hover:text-amber-47'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AddFilterDevelopPanel