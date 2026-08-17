import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTool } from '../tools/toolsRegistry'
import ToolPageNotFound from '../components/tool-page-comps/ToolPageNotFound'
import Layout from '../components/Layout'
import { ArrowLeft } from 'lucide-react'

const GuidePage = () => {
    const { guideId } = useParams()
    const tool = getTool(guideId)
    console.log(guideId, tool)
    const Tool = tool.component
    const Guide = tool.guide

    return (
        <Layout>
            <div className='mt-12' />
            <Link to={`/tools/${guideId}`} className='flex gap-1 items-center text-amber-47 w-fit'><ArrowLeft size={20} strokeWidth={1.5} />Back to {guideId}</Link>
            <Guide Tool={Tool} />
        </Layout>
    )
}

export default GuidePage