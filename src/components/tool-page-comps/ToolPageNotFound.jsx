import React from 'react'
import Layout from '../Layout'
import { Frown, CornerUpLeft } from 'lucide-react'
import { Link } from 'react-router'

const ToolPageNotFound = () => {
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

export default ToolPageNotFound