import { Suspense, useState, useRef, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getTool } from '../tools/toolsRegistry.js'
import Layout from '../components/Layout.jsx'
import ToolPageEmptyLook from '../components/tool-page-comps/ToolPageEmptyLook.jsx'
import ToolPageNotFound from '../components/tool-page-comps/ToolPageNotFound.jsx'
import ToolPageHeader from '../components/tool-page-comps/ToolPageHeader.jsx'
import Loader from '../components/Loader.jsx'
import gsap from 'gsap'

const ToolReadyChecker = ({ Tool, onReady, files, setFiles }) => {
    useEffect(() => {
        onReady()
    }, [])

    return <Tool files={files} setFiles={setFiles} />
}

const ToolPage = () => {
    const { toolId } = useParams()
    const tool = getTool(toolId)
    const [files, setFiles] = useState([])

    const [loading, setLoading] = useState(true)
    const loaderRef = useRef(null)

    if (!tool || tool.comingSoon || !tool.component) {
        return (
            <ToolPageNotFound />
        )
    }
    const Tool = tool.component

    if (files.length < 1) {
        return (
            <ToolPageEmptyLook setFiles={setFiles} />
        )
    }

    const handleReady = () => {
        gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => setLoading(false)
        })
    }

    return (
        <>
        <Layout>
            <ToolPageHeader />
            <Suspense fallback={null}>
                <ToolReadyChecker Tool={Tool} onReady={handleReady} files={files} setFiles={setFiles} />
            </Suspense>
        </Layout>

        {loading && <Loader ref={loaderRef} />}
        </>
    )
}

export default ToolPage