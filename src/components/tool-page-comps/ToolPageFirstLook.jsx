import React, { Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../Layout'
import { getTool } from '../../tools/toolsRegistry'
import ToolPageNotFound from './ToolPageNotFound'
import ToolPageHeader from './ToolPageHeader'

const FirstToolAppearance = () => {
    const { toolId } = useParams()
    const tool = getTool(toolId)

    if (!tool) return <ToolPageNotFound/>

    return (
        <Layout>
        <ToolPageHeader />
        <Suspense fallback={<p className="mono">Loading tool…</p>}>
            <div></div>
        </Suspense>
        </Layout>
    )
}

export default FirstToolAppearance