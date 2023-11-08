import React from 'react'
import './style.css'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { deleteGroup } from '../../services/groups'

const militaryToRegular = (time) => {
    time = time.split(':'); // convert to array

    // fetch
    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var seconds = Number(time[2]);
    
    // calculate
    var timeValue;
    
    if (hours > 0 && hours <= 12) {
      timeValue= "" + hours;
    } else if (hours > 12) {
      timeValue= "" + (hours - 12);
    } else if (hours == 0) {
      timeValue= "12";
    }
     
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

    return timeValue
}

const GroupCard = ({ group: {id, name, ownerId, description, course, professor, days, time}, onDelete }) => {
    const auth = useAuth()

    const handleDelete = () => {
        deleteGroup(id)
        onDelete(id)
    }

    return (
        <div className='group-card'>
            {auth?.user?.id === ownerId ? <div className='options'>
                <Link to='/groups/edit' className='edit' state={{id, name, ownerId, description, course, professor, days, time}}>Edit</Link>
                <button onClick={handleDelete} className='delete'>Delete</button>
            </div>: ''}
            <h2>{name}</h2>
            <div className="info">
                <div className="time">
                    {days.join(', ')} @ {militaryToRegular(time)}
                </div>
                <div>
                    {course}
                    {professor ? ' with ' + professor : ''}
                </div>
            </div>
            <p>{description}</p>
        </div>
    )
}

export default GroupCard