import React, { useEffect, useState } from 'react'
import Header from '../../components/header/header'
import { getGroups } from '../../services/groups'
import GroupCard from '../../components/group-card/group-card'
import './style.css'
import DaySelection from '../../components/day-selection/day-selection'

const SearchGroups = () => {
  const [groups, setGroups] = useState([])
  const [displayedGroups, setDisplayedGroups] = useState([])
  const [search, setSearch] = useState('')

  const [courseFilter, setCourseFilter] = useState('')
  // const [professorFilter, setProfessorFilter] = useState('')
  const [dayFilter, setDayFilter] = useState([])
  const [timeFilter, setTimeFilter] = useState(['01:00','23:59'])


  useEffect(() => {
    const groups = getGroups()
    setGroups(groups)
    // setDisplayedGroups(groups.sort((a, b) => a.name > b.name))
  }, [])

  useEffect(() => {
    const matches = groups.filter(group => 
      (group.name.toLowerCase().includes(search.toLowerCase()) ||
      group.course.toLowerCase().includes(search.toLowerCase()) ||
      group.professor.toLowerCase().includes(search.toLowerCase()) ||
      group.description.toLowerCase().includes(search.toLowerCase()) ||
      group.days.includes(search.toLowerCase())) // keyword filter
      && (group.time >= timeFilter[0] && group.time <= timeFilter[1]) // time filter
      && (courseFilter == '' || group.course.toLowerCase().replace(/\s/g, '').includes(courseFilter.toLowerCase().replace(/\s/g, ''))) // course filter
      && (dayFilter.length == 0 || dayFilter.some(day=>group.days.includes(day.value))) // day filter
    )

    console.log(matches[0]?.time > timeFilter[0])
    setDisplayedGroups(matches)
  }, [search, courseFilter, dayFilter, timeFilter, groups])

  const onDelete = groupId => {
    setGroups(groups.filter(group => group.id != groupId))
  }

  return (
    <div>
      <Header title="Find A Group" />

      <div className='input-groups search'>

        <div className="input-group">
          <label>Keyword Search</label>
          <input type='text' className='main-search' value={search} onChange={e => setSearch(e.target.value)} placeholder='Ex: homework'/>
        </div>

        <div className="input-group">
          <label>Course Name</label>
          <input type='text' placeholder='Ex: ENG 313' value={courseFilter} onChange={e=>setCourseFilter(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Meeting Days</label>
          <DaySelection value={dayFilter} onChange={selected => setDayFilter(selected)} />
        </div>

        <div className="input-group">
          <label>Time</label>
          <div className='time-filter'>
            <span>Between</span>
            <input type='time' value={timeFilter[0]} onChange={e=>setTimeFilter(p => [e.target.value, p[1]])} />
            <span>and</span>
            <input type='time' value={timeFilter[1]} onChange={e=>setTimeFilter(p => [p[0], e.target.value])} />
          </div>
        </div>

      </div>

      <h2>Search Results:</h2>

      <div className="groups">
        {displayedGroups.map(group => 
          <GroupCard key={group.id} group={group} onDelete={onDelete} />
          // <div key={group.id}>{group.name}</div>
        )}
      </div>

    </div>
  )
}

export default SearchGroups