import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { fetchCurrentUser, getToken, loginAccount, registerAccount, setToken as persistToken } from '../utils/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setTokenState] = useState(() => getToken())
    // Starts true so the header doesn't flash "logged out" while we check an existing token.
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const existingToken = getToken()
        if (!existingToken) {
            setLoading(false)
            return
        }

        fetchCurrentUser(existingToken)
            .then((data) => setUser(data.user))
            .catch(() => {
                // token expired/invalid — clear it silently
                persistToken(null)
                setTokenState(null)
            })
            .finally(() => setLoading(false))
    }, [])

    const register = useCallback(async ({ email, password }) => {
        const data = await registerAccount({ email, password })
        persistToken(data.token)
        setTokenState(data.token)
        setUser(data.user)
        return data.user
    }, [])

    const login = useCallback(async ({ email, password }) => {
        const data = await loginAccount({ email, password })
        persistToken(data.token)
        setTokenState(data.token)
        setUser(data.user)
        return data.user
    }, [])

    const logout = useCallback(() => {
        persistToken(null)
        setTokenState(null)
        setUser(null)
    }, [])

    const value = useMemo(
        () => ({ user, token, loading, isAuthenticated: !!user, register, login, logout }),
        [user, token, loading, register, login, logout]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
    return ctx
}
