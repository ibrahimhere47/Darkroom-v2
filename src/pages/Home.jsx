import React from 'react'
import Layout from '../components/Layout'
import ToolCard from '../components/ToolCard'
import Hero from '../components/Hero'
import { tools } from '../tools/toolsRegistry'

const Home = () => {
    return (
        <Layout>
            <Hero />
            <ToolCard tool={tools.at(0)} />
        </Layout>
    )
}

export default Home