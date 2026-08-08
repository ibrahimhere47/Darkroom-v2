import { Suspense, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getTool } from '../tools/toolsRegistry.js'
import Layout from '../components/Layout.jsx'
import FirstToolAppearance from '../components/tool-page-comps/ToolPageFirstLook.jsx'
import ToolPageNotFound from '../components/tool-page-comps/ToolPageNotFound.jsx'
import ToolPageHeader from '../components/tool-page-comps/ToolPageHeader.jsx'
import { CornerUpLeft, Frown } from 'lucide-react'

const ToolPage = () => {
    const { toolId } = useParams()
    const tool = getTool(toolId)
    const [firstAppearance, setFirstAppearance] = useState(true)

    if (!tool || tool.comingSoon || !tool.component) {
        return (
            <ToolPageNotFound />
        )
    }
    const Tool = tool.component

    if (firstAppearance) {
        return (
            <FirstToolAppearance />
        )
    }

    return (
        <Layout>
        <ToolPageHeader />
        <Suspense fallback={<p className="mono">Loading tool…</p>}>
            <Tool />
        </Suspense>
        </Layout>
    )
}

export default ToolPage