import React from 'react'
import { useParams } from 'react-router-dom'
import { getTool } from '../tools/toolsRegistry'
import ToolPageNotFound from '../components/tool-page-comps/ToolPageNotFound'
import Layout from '../components/Layout'

const GuidePage = () => {
    const { guideId } = useParams()
    const tool = getTool(guideId)
    console.log(guideId, tool)
    const Tool = tool.component
    const Guide = tool.guide

    return (
        <Layout>
            <div className='mt-12' />
            <Guide Tool={Tool} />
        </Layout>
    )
}

export default GuidePage