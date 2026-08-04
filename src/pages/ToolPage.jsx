import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout';

const ToolPage = () => {

    const { toolId } = useParams(null);

    return (
        <Layout>
            <div>
                ToolPage
                <h1>{toolId}</h1>
            </div>
        </Layout>
    )
}

export default ToolPage