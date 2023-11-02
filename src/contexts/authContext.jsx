import React from 'react'
import { useState, useEffect, createContext } from 'react'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

    useEffect(() => {
        if (user)
            localStorage.setItem('user', JSON.stringify(user))
        else
            localStorage.removeItem('user')
    }, [user])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider