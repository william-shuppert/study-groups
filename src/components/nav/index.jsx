import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './style.css'

const Nav = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.setUser(null)
        navigate('/auth')
    }

    return (
        <nav>
            <div className="wrapper">
                <Link to='/' className="logo">Miami Social</Link>

                <div className="NavLinks">
                    <NavLink to=''>Home</NavLink>
                    <NavLink to='groups' end>Search</NavLink>
                    {auth.user ? (
                        <>
                            <NavLink to='groups/create' end>Create</NavLink>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <NavLink to='auth'>Login</NavLink>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Nav