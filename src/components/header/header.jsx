import React from 'react'
import './style.css'

const Header = ({ title }) => {
  return (
    <header>
        <div className="banner">
            <h1>{title}</h1>
        </div>
    </header>
  )
}

export default Header