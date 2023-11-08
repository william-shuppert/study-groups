import React, { useEffect, useState } from 'react'
import Header from '../../components/header/header'
import { createGroup, editGroup } from '../../services/groups'
import useAuth from '../../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router'
import Select from 'react-select';
import './style.css'
import DaySelection from '../../components/day-selection/day-selection'

const daysOptions = [
  { value: 'sunday', label: 'Sunday' },
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
]

const ManageGroup = ({ state }) => {
  const location = useLocation()
  const auth = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [course, setCourse] = useState('')
  const [professor, setProfessor] = useState('')
  const [days, setDays] = useState([])
  const [time, setTime] = useState('')

  useEffect(() => {
    console.log(state)
    if (state != 'edit') return

    if (!location.state)
      return navigate('search')

    setName(location.state.name)
    setDescription(location.state.description)
    setCourse(location.state.course)
    setProfessor(location.state.professor)
    setDays(location.state.days)
    setTime(location.state.time)
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    if (state == 'create') handleCreate()
    else handleEdit()
  }

  const handleCreate = () => {
    createGroup({ name, ownerId: auth.user.id, description, course, professor, days, time })
    navigate('/search')
  }

  const handleEdit = () => {
    if (!editGroup({
      id: location.state.id, name,
      ownerId: location.state.ownerId, description,
      course, professor, days, time }))
      alert("Edit failed")

    navigate('/search')
  }

  const daysOnChange = (selected) => {
    setDays(selected.map(option => option.value))
  }

  return (
    <div>
      <Header title={state + ' group'} />

      <form className='manage-group-form' onSubmit={e=>handleSubmit(e)}>
        <div className="input-groups">
          <div className="input-group">
            <label>Group Name</label>
            <input type='text' onChange={e => setName(e.target.value)} value={name} placeholder='Create a group name!' required/>
          </div>

          <div className="input-group">
            <label>Related Course</label>
            <input type='text' placeholder='Example: ENG 313' value={course} onChange={e=>setCourse(e.target.value)}/>
          </div>

          <div className="input-group">
            <label>Professor</label>
            <input type='text' placeholder='Example: Prof. Chesher' value={professor} onChange={e => setProfessor(e.target.value)}/>
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea onChange={e => setDescription(e.target.value)} value={description} placeholder='Write your description!' required></textarea>
          </div>

          <div className="input-group input-group-select">
            <label>Meeting Days</label>
            <DaySelection onChange={daysOnChange} value={days.map(day => ({label: day, value: day}))} required/>
          </div>

          {
            days.length > 0 ?
              <div className="input-group">
                <label>Time</label>
                <input type='time' value={time} onChange={e => setTime(e.target.value)} required/>
              </div> : ""
          }
        </div>

        <input type='submit' value={state == 'edit' ? 'save' : 'create'} />
      </form>
    </div>
  )
}

export default ManageGroup