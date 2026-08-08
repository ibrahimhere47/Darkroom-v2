import { Suspense, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getTool } from '../tools/toolsRegistry.js'
import Layout from '../components/Layout.jsx'
import FirstToolAppearance from '../components/tool-page-comps/FirstToolAppearance.jsx'
import { CornerUpLeft, Frown } from 'lucide-react'

const ToolPage = () => {
    const { toolId } = useParams()
    const tool = getTool(toolId)
    const [firstAppearance, setFirstAppearance] = useState(true)

    if (!tool || tool.comingSoon || !tool.component) {
        return (
            <Layout>
                <div className="my-64 flex justify-center items-center flex-col gap-4">
                    <h1 className='text-6xl font-mono font-bold flex items-center gap-2'>Tool not found <Frown size={50} /></h1>
                    <p className='mono text-4xl'>That tool doesn't exist yet.</p>
                    <Link to="/" className="bg-amber-47 p-6 text-4xl rounded-2xl font-mono flex gap-2 items-center">
                    <CornerUpLeft size={39} /> Back to all tools
                    </Link>
                </div>
            </Layout>
        )
    }
    const Tool = tool.component

    if (firstAppearance) {
        return (
            <Layout>
                <FirstToolAppearance />
            </Layout>
        )
    }

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
            <Tool />
        </Suspense>
        </Layout>
    )
}

export default ToolPage