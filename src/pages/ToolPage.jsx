import { Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getTool } from '../tools/toolsRegistry.js'

const ToolPage = () => {
    const { toolId } = useParams()
    const tool = getTool(toolId)

    if (!tool || tool.comingSoon || !tool.component) {
        return (
        <div className="tool-page tool-page-missing">
            <h1>Tool not found</h1>
            <p>That tool doesn't exist yet.</p>
            <Link to="/" className="ct-btn ct-btn-amber">
            Back to all tools
            </Link>
        </div>
        )
    }

    const Tool = tool.component

    return (
        <div className="tool-page">
        <div className="tool-page-header">
            <Link to="/" className="back-link mono">
            ← All tools
            </Link>
            <h1>{tool.name}</h1>
            <p>{tool.tagline}</p>
        </div>
        <Suspense fallback={<p className="mono">Loading tool…</p>}>
            <Tool />
        </Suspense>
        </div>
    )
}

export default ToolPage