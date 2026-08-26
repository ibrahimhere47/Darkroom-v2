import React from 'react'
import Layout from '../components/Layout'
import AuthForm from '../components/auth-comps/AuthForm'

const Register = () => {
    return (
        <Layout>
            <div className='mt-13' />
            <div className='flex justify-center py-10'>
                <AuthForm mode='register' />
            </div>
        </Layout>
    )
}

export default Register
