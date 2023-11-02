import React, { useState } from 'react'
import Header from '../components/header/header'
import { createGroup } from '../services/groups'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const ManageGroup = ({ state }) => {
  const auth = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    createGroup({ name, ownerId: auth.user.id, description })
    navigate('/groups')
  }

  return (
    <div>
      <Header title={state + ' group'} />
      <label>Name</label>
      <input type='text' onChange={e => setName(e.target.value)} value={name}/>

      <br/>

      <label>Description</label>
      <textarea onChange={e => setDescription(e.target.value)} value={description}></textarea>

      <input type='submit' value='Submit' onClick={handleSubmit} />
    </div>
  )
}

export default ManageGroup