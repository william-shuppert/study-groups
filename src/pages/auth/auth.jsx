import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router'
import Header from '../../components/header/header'
import { createUser, login } from '../../services/users'
import './style.css'

const Auth = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const [state, setState] = useState('login')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
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

            <form onSubmit={e => handleSubmit(e)} className='auth-form'>

                <div className="input-groups">
                    <div className="input-group">
                        <label>Username</label>
                        <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                </div>

                <p>
                    {state == 'login' ? 
                        'Don\'t have an account? Click ' : 
                        'Already have an account? Click '}
                    <span onClick={() => setState(prev => prev == 'login' ? 'register' : 'login')}>
                        here
                    </span>
                    .
                </p>

                <input type='submit' onClick={handleSubmit} value={state} />
            </form>

        </>
    )
}

export default Auth