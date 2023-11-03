import React, { useState } from 'react'
import Header from '../../components/header/header'
import { createGroup } from '../../services/groups'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router'
import './style.css'

const ManageGroup = ({ state }) => {
  const auth = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    createGroup({ name, ownerId: auth.user.id, description })
    navigate('/groups')
  }

  return (
    <div>
      <Header title={state + ' group'} />

      <form className='manage-group-form'>
        <div className="input-groups">
          <div className="input-group">
            <label>Name</label>
            <input type='text' onChange={e => setName(e.target.value)} value={name} required/>
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea onChange={e => setDescription(e.target.value)} value={description}></textarea>
          </div>
        </div>

        <input type='submit' value='Submit' onClick={e => handleSubmit(e)} />
      </form>
    </div>
  )
}

export default ManageGroup