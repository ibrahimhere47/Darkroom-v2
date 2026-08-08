import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getTool } from '../../tools/toolsRegistry'

const ToolPageHeader = () => {
    const { toolId } = useParams()
    const tool = getTool(toolId)

    return (
        <div className="flex my-8 px-5 justify-between items-center">
            <Link to="/" className="mono">
            ← All tools
            </Link>
            <div className='flex gap-4 items-center'>
                <h1 className='font-mono'>{tool.name}</h1>
            </div>
        </div>
    )
}

export default ToolPageHeader