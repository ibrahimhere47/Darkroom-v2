import React from 'react'
import Layout from '../components/Layout'
import ToolCard from '../components/ToolCard'
import Hero from '../components/Hero'
import { tools } from '../tools/toolsRegistry'

const Home = () => {
    return (
        <Layout>
            <div className='py-10 w-full'>
                <Hero />
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {tools.map((tool, idx) => (
                        <ToolCard key={idx} tool={tool} />
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Home