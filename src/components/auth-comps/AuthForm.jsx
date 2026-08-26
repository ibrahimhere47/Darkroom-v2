import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const AuthForm = ({ mode }) => {
    const { login, register } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const isLogin = mode === 'login'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSubmitting(true)
        try {
            if (isLogin) {
                await login({ email, password })
            } else {
                await register({ email, password })
            }
            navigate('/')
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.')
            setSubmitting(false)
        }
    }

    return (
        <div className='w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950 p-8 shadow-2xl shadow-neutral-950'>
            <h1 className='font-zilla text-3xl text-white'>
                {isLogin ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className='mt-2 font-mono text-sm leading-relaxed text-neutral-400'>
                {isLogin
                    ? 'Log in to access your Darkroom account.'
                    : 'Sign up to save your preferences and unlock premium tools.'}
            </p>

            <form onSubmit={handleSubmit} className='mt-6 flex flex-col gap-4'>
                <label className='flex flex-col gap-1.5'>
                    <span className='font-mono text-xs uppercase tracking-widest text-neutral-500'>Email</span>
                    <input
                        type='email'
                        required
                        autoComplete='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='you@example.com'
                        className='rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 font-body text-white placeholder:text-neutral-600 outline-none focus:border-amber-47 transition-colors'
                    />
                </label>

                <label className='flex flex-col gap-1.5'>
                    <span className='font-mono text-xs uppercase tracking-widest text-neutral-500'>Password</span>
                    <input
                        type='password'
                        required
                        minLength={8}
                        autoComplete={isLogin ? 'current-password' : 'new-password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='At least 8 characters'
                        className='rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 font-body text-white placeholder:text-neutral-600 outline-none focus:border-amber-47 transition-colors'
                    />
                </label>

                {error && <p className='font-mono text-sm text-red-400'>{error}</p>}

                <button
                    type='submit'
                    disabled={submitting}
                    className='mt-2 flex items-center justify-center gap-2 rounded-lg bg-amber-47 py-2.5 font-body font-semibold text-neutral-900 transition-opacity hover:opacity-90 disabled:opacity-60'
                >
                    {submitting && <Loader2 size={18} className='animate-spin' />}
                    {isLogin ? 'Log in' : 'Sign up'}
                </button>

                <p className='text-center font-mono text-sm text-neutral-500'>
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <Link to={isLogin ? '/register' : '/login'} className='text-amber-47 hover:underline'>
                        {isLogin ? 'Sign up' : 'Log in'}
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default AuthForm
