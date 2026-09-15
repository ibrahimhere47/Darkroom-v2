import { Suspense, useState, useRef, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getTool } from '../tools/toolsRegistry.js'
import Layout from '../components/Layout.jsx'
import ToolPageEmptyLook from '../components/tool-page-comps/ToolPageEmptyLook.jsx'
import ToolPageNotFound from '../components/tool-page-comps/ToolPageNotFound.jsx'
import GuideButton from '../components/guide-comps/GuideButton.jsx'
import Loader from '../components/Loader.jsx'
import ToolPageGuarantees from '../components/tool-page-comps/ToolPageGuarantees.jsx'
import ToolPageDataGuide from '../components/tool-page-comps/ToolPageDataGuide.jsx'
import gsap from 'gsap'
import GuideSnapshot from '../components/guide-comps/GuideSnapshot.jsx'

const ToolReadyChecker = ({ Tool, onReady, files, setFiles }) => {
    useEffect(() => {
        onReady()
    }, [])

    return <Tool files={files} setFiles={setFiles} />
}

const ToolPage = () => {
    const { toolId } = useParams()
    const location = useLocation()
    const tool = getTool(toolId)
    const [files, setFiles] = useState(location.state?.files || [])

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
            <div className='pt-2' />
            <Suspense fallback={null}>
                <ToolReadyChecker Tool={Tool} onReady={handleReady} files={files} setFiles={setFiles} />
            </Suspense>
            <div className='flex flex-col gap-7 mb-12 mt-9 bg-neutral-950 p-10 rounded-2xl border border-neutral-800 w-full'>
                <div className='w-full'>
                    <GuideSnapshot />
                </div>
                <div className='w-full'>
                    <GuideButton />
                </div>
                <div className='w-full'>
                    <ToolPageGuarantees />
                </div>
                <div className='w-full'>
                    <ToolPageDataGuide />
                </div>
            </div>
        </Layout>

        {loading && <Loader ref={loaderRef} />}
        </>
    )
}

export default ToolPage