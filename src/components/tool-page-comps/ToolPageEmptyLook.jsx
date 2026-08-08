import React, { Suspense, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../Layout'
import { getTool } from '../../tools/toolsRegistry'
import ToolPageNotFound from './ToolPageNotFound'
import ToolPageHeader from './ToolPageHeader'
import ToolPageDropZone from './ToolPageDropZone'

const FirstToolAppearance = (props) => {
    const { toolId } = useParams()
    const tool = getTool(toolId)

    if (!tool) return <ToolPageNotFound/>

    return (
        <Layout>
        <ToolPageHeader />
        <Suspense fallback={<p className="mono">Loading tool…</p>}>
            <div className='flex w-full h-[80vh] justify-center my-16'>
                <div className='w-1/2 h-full flex flex-col justify-center'>
                    <video src={props.video}></video>
                    <h1>Drag or Browse Files to compress</h1>
                </div>
                <ToolPageDropZone />
            </div>
        </Suspense>
        </Layout>
    )
}

export default FirstToolAppearance