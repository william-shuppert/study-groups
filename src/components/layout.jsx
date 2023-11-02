import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './nav'
import Header from './header/header'

const Layout = () => {
  return (
    <div>
        <Nav />
        <div className="wrapper">
            <Outlet />
        </div>
    </div>
  )
}

export default Layout