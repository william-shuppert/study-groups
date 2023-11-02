import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router'
import Header from '../components/header/header'
import { createUser, login } from '../services/users'

const Auth = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const [state, setState] = useState('login')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        if (state == 'login') handleLogin()
        else handleRegister()
    }

    const handleLogin = () => {
        const user = login({username, password})
        
        if (!user) {
            alert('Incorrect Login')
            return
        }

        auth.setUser(user)
        navigate('/')
    }

    const handleRegister = () => {
        const user = createUser({ username, password })

        if (!user) {
            alert('Username already taken.')
            return
        }

        auth.setUser(user)
        navigate('/')
    }

    return (
        <>
            <Header title={state}/>

            <label>Username</label>
            <input type='text' value={username} onChange={e => setUsername(e.target.value)} />

            <br/>

            <label>Password</label>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

            <br/>

            <p>
                {state == 'login' ? 
                    'Don\'t have an account? Click ' : 
                    'Already have an account? Click '}
                <span onClick={() => setState(prev => prev == 'login' ? 'register' : 'login')}>
                    here.
                </span>
            </p>

            <button onClick={handleSubmit}>{state}</button>
        </>
    )
}

export default Auth