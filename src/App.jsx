import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout'
import Home from './pages/home'
import Auth from './pages/auth'
import SearchGroups from './pages/group-search/group-search'
import EditGroup from './pages/group-manage'
import AuthProvider from './contexts/authContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="auth" element={<Auth />} />
            <Route path="groups" element={<SearchGroups />} />
            <Route path="groups/edit" element={<EditGroup state='edit'/>} />
            <Route path="groups/create" element={<EditGroup state='create'/>} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App