import React from 'react'
import { useParams } from 'react-router-dom'

const ToolPage = () => {

    const { toolId } = useParams(null);

    return (
        <div>
            ToolPage
            <h1>{toolId}</h1>
        </div>
    )
}

export default ToolPage