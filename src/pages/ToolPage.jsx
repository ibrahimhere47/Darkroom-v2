import { Suspense, useState, useRef, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getTool } from '../tools/toolsRegistry.js'
import Layout from '../components/Layout.jsx'
import ToolPageEmptyLook from '../components/tool-page-comps/ToolPageEmptyLook.jsx'
import ToolPageNotFound from '../components/tool-page-comps/ToolPageNotFound.jsx'
import ToolPageHeader from '../components/tool-page-comps/ToolPageHeader.jsx'
import Loader from '../components/Loader.jsx'
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
            <ToolPageEmptyLook />
        )
    }

    return (
        <Suspense fallback={<Loader/>}>
            <Layout>
                <ToolPageHeader />
                <Tool />
            </Layout>
        </Suspense>
    )
}

export default ToolPage