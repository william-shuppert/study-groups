import React from 'react'
import './style.css'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { deleteGroup } from '../../services/groups'

const GroupCard = ({ group: {id, name, ownerId, description}, onDelete }) => {
    const auth = useAuth()

    const handleDelete = () => {
        deleteGroup(id)
        onDelete(id)
    }

    return (
        <div className='group-card'>
            {auth.user.id === ownerId ? <div className='options'>
                <Link to='/groups/edit' className='edit'>Edit</Link>
                <button onClick={handleDelete} className='delete'>Delete</button>
            </div>: ''}
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
    )
}

export default GroupCard