// Base URL for the Adjusture backend. All auth requests go through here.
export const API_BASE_URL = 'https://adjusture-backend.vercel.app'

const TOKEN_KEY = 'darkroom_token'

export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
    if (token) {
        localStorage.setItem(TOKEN_KEY, token)
    } else {
        localStorage.removeItem(TOKEN_KEY)
    }
}

/**
 * Parses a backend JSON response, throwing a plain Error with the
 * server-provided message (from { error }) when the request failed.
 */
async function parseResponse(response) {
    let data = null
    try {
        data = await response.json()
    } catch {
        // no JSON body (e.g. network-level failure page)
    }

    if (!response.ok) {
        throw new Error(data?.error || 'Something went wrong. Please try again.')
    }

    return data
}

export async function registerAccount({ email, password }) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })
    return parseResponse(response)
}

export async function loginAccount({ email, password }) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })
    return parseResponse(response)
}

export async function fetchCurrentUser(token) {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return parseResponse(response)
}
