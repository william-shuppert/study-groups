import React, { useEffect, useState } from 'react'
import Header from '../../components/header/header'
import { getGroups } from '../../services/groups'
import GroupCard from '../../components/group-card/group-card'
import './style.css'

const SearchGroups = () => {
  const [groups, setGroups] = useState([])
  const [displayedGroups, setDisplayedGroups] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const groups = getGroups()
    setGroups(groups)
    // setDisplayedGroups(groups.sort((a, b) => a.name > b.name))
  }, [])

  useEffect(() => {
    const matches = groups.filter(group => group.name.toLowerCase().includes(search.toLowerCase()))
    setDisplayedGroups(matches)
  }, [search, groups])

  const onDelete = groupId => {
    setGroups(groups.filter(group => group.id != groupId))
  }

  return (
    <div>
      <Header title="Find A Group" />

      <div className='search'>
        <input type='text' value={search} onChange={e => setSearch(e.target.value)} placeholder='Search for a class here!'/>
      </div>

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