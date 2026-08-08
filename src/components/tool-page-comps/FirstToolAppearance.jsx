import React, { Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../Layout'
import { getTool } from '../../tools/toolsRegistry'
import ToolPageNotFound from './ToolPageNotFound'

const FirstToolAppearance = () => {
    const { toolId } = useParams()
    const tool = getTool(toolId)

    if (!tool) return <ToolPageNotFound/>

    return (
        <Layout>
        <div className="tool-page-header">
            <Link to="/" className="back-link mono">
            ← All tools
            </Link>
            <h1>{tool.name}</h1>
            <p>{tool.tagline}</p>
        </div>
        <Suspense fallback={<p className="mono">Loading tool…</p>}>
            <div></div>
        </Suspense>
        </Layout>
    )
}

export default FirstToolAppearance