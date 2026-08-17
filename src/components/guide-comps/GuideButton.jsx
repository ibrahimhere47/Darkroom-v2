import React from 'react'
import { Link, useParams } from 'react-router-dom'

const GuideButton = () => {
    const { toolId } = useParams()
    
    return (
        <Link to={`/guides/${toolId}`}>
            <div className='p-4 rounded-2xl'>
                <h1>See how it works</h1>
            </div>
        </Link>
    )
}

export default GuideButton