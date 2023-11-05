import React, { useEffect, useState } from 'react'
import Header from '../../components/header/header'
import { createGroup, editGroup } from '../../services/groups'
import useAuth from '../../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router'
import './style.css'

const ManageGroup = ({ state }) => {
  const location = useLocation()
  const auth = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (state != 'edit') return

    if (!location.state)
      return navigate('search')

    setName(location.state.name)
    setDescription(location.state.description)
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    if (state == 'create') handleCreate()
    else handleEdit()
  }

  const handleCreate = () => {
    createGroup({ name, ownerId: auth.user.id, description })
    navigate('/search')
  }

  const handleEdit = () => {
    if (!editGroup({ id: location.state.id, name, ownerId: location.state.ownerId, description }))
      alert("Edit failed")

    navigate('/search')
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
            <textarea onChange={e => setDescription(e.target.value)} value={description} required></textarea>
          </div>


                  
          {/* <div className="input-group">
            <label>Location</label>
            <input type='text' required/>
          </div>
          
          <div className="input-group">
            <label>Time</label>
            <input type='text' required/>
          </div>

          <div className="input-group">
            <label>Personality</label>
            <input type='text' required/>
          </div>

          <div className="input-group">
            <label>Group Goal</label>
            <input type='text' placeholder='serious or relaxed' required/>
          </div> */}
        </div>

        <input type='submit' value='Submit' onClick={e => handleSubmit(e)} />
      </form>
    </div>
  )
}

export default ManageGroup