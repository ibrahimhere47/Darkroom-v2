import React from 'react'
import { Link } from 'react-router-dom'

const ToolCard = (props) => {
    
    const tool = props.tool
    const Icon = tool.icon
    const content = (
        <div className='flex flex-col gap-2'>
            <div className='flex justify-between items-baseline'>
                <div>
                    <Icon />
                </div>
                <span className={`tool-card-badge ${tool.comingSoon ? 'is-soon' : 'is-ready'}`}>
                    {tool.comingSoon ? 'Soon' : 'Ready'}
                </span>
            </div>
            <div className="tool-card-body">
                <h3>{tool.name}</h3>
                <p>{tool.tagline}</p>
            </div>
        </div>
    )

    if (tool.comingSoon == true) {
        return (
            <div>
                {content}
            </div>
        )
    }

    return (
        <Link to={`/tools/${tool.id}`}>
            {content}
        </Link>
    )
}

export default ToolCard