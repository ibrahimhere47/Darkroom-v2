import React from 'react'
import Layout from '../components/Layout'
import AuthForm from '../components/auth-comps/AuthForm'

const Login = () => {
    return (
        <Layout>
            <div className='mt-13' />
            <div className='flex justify-center py-10'>
                <AuthForm mode='login' />
            </div>
        </Layout>
    )
}

export default Login
