import React from 'react'
import { Link } from 'react-router-dom'

const ToolCard = (props) => {
    
    const tool = props.tool
    const Icon = tool.icon
    const content = (
        <div className='flex flex-col gap-2 bg-neutral-700 rounded-xl p-3 flex-1 min-h-40 hover:border border-amber-47 hover:shadow-[0_0_16px_rgba(232,163,61,0.6)] transition-shadow duration-300'>
            <div className='flex justify-between items-center'>
                <div>
                    <div className='relative flex items-center justify-center w-9 h-9'>
                        <div className='absolute inset-0 bg-amber-47 opacity-30 blur-lg rounded-full'></div>
                        <Icon color="#e8a33d" className="relative z-10" />
                    </div>
                </div>
                <span className={`tool-card-badge ${tool.comingSoon ? 'is-soon' : 'is-ready'}`}>
                    {tool.comingSoon ? 'Soon' : 'Ready'}
                </span>
            </div>
            <div className="flex flex-col gap-0.5">
                <h3 className='font-body bold'>{tool.name}</h3>
                <p className='line-clamp-2 font-body tracking-normal leading-5'>{tool.tagline}</p>
            </div>
        </div>
    )

    if (tool.comingSoon == true) {
        return (
            <div className='flex cursor-pointer'>
                {content}
            </div>
        )
    }

    return (
        <Link to={`/tools/${tool.id}`} className='flex cursor-pointer'>
            {content}
        </Link>
    )
}

export default ToolCard