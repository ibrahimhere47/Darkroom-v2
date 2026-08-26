import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserRound, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const AccountMenu = () => {
    const { user, loading, isAuthenticated, logout } = useAuth()
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        if (!menuOpen) return
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [menuOpen])

    if (loading) {
        return <div className='w-8 h-8' />
    }

    if (!isAuthenticated) {
        return (
            <Link
                to='/login'
                className='font-mono text-sm md:text-base font-semibold text-neutral-200 hover:text-amber-47 transition-colors whitespace-nowrap'
            >
                Log in / Sign up
            </Link>
        )
    }

    return (
        <div className='relative' ref={menuRef}>
            <button
                onClick={() => setMenuOpen((v) => !v)}
                className='flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/60 pl-2 pr-3 py-1.5 hover:border-amber-47 transition-colors'
            >
                <span className='flex items-center justify-center w-6 h-6 rounded-full bg-amber-47 text-neutral-900'>
                    <UserRound size={14} />
                </span>
                <span className='font-mono text-sm text-neutral-200 max-w-[10rem] truncate'>{user.email}</span>
            </button>

            {menuOpen && (
                <div className='absolute right-0 top-full mt-2 w-48 rounded-xl border border-neutral-700 bg-neutral-900 p-2 shadow-2xl shadow-neutral-950 z-50'>
                    <div className='px-2 py-1.5 font-mono text-xs uppercase tracking-widest text-neutral-500'>
                        {user.plan ?? 'free'} plan
                    </div>
                    <button
                        onClick={() => {
                            setMenuOpen(false)
                            logout()
                        }}
                        className='flex w-full items-center gap-2 rounded-lg px-2 py-2 font-body text-sm text-neutral-200 hover:bg-neutral-800 transition-colors'
                    >
                        <LogOut size={16} />
                        Log out
                    </button>
                </div>
            )}
        </div>
    )
}

export default AccountMenu
