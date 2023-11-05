import './App.css'
import { Routes, Route, HashRouter } from 'react-router-dom'
import Layout from './components/layout'
import Home from './pages/home'
import Auth from './pages/auth/auth'
import SearchGroups from './pages/group-search/group-search'
import EditGroup from './pages/group-manage/group-manage'
import AuthProvider from './contexts/authContext'

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="auth" element={<Auth />} />
            <Route path="search" element={<SearchGroups />} />
            <Route path="groups/edit" element={<EditGroup state='edit'/>} />
            <Route path="groups/create" element={<EditGroup state='create'/>} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  )
}

export default App
