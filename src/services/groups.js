import { v4 as uuid } from 'uuid';

const defaultGroups = [
    {
        id: '42c38512-af6d-46a5-8e14-0cc5af16d1d6',
        name: 'Looking for someone to help study ENG313',
        ownerId: '5f620a3b-16bf-40cf-94b6-da3850f3f7e7',
        description: "I'm going to be in Armstrong, study room 231, for the next two hours if anyone wants to stop by and study with me for ENG313.",
        members: [],
        course: 'ENG 313',
        professor: 'Prof. Chesher',
        days: ['sunday'],
        time: '13:30'
    },
    {
        id: '5383919f-6722-44a8-a828-eb0fa4dcbdea',
        name: "Need help with studying for CSE278",
        ownerId: '5f620a3b-16bf-40cf-94b6-da3850f3f7e7',
        description: "Hello! I'm very confused about the current material in CSE278, if anyone wants to meet up and go over it, message me!",
        members: [],
        course: 'CSE 278',
        professor: 'Prof. Bob',
        days: ['monday', 'tuesday'],
        time: '14:30'
    },
    {
        id: '00ebfae8-368e-4ac8-96c0-4081f6796789',
        name: "Can't figure out this STA301 homework",
        ownerId: '5f620a3b-16bf-40cf-94b6-da3850f3f7e7',
        description: "Is anyone else stuck on this STA301 homework!? I can't seem to figure it out. Someone please help me!",
        members: [],
        course: 'STA 301',
        professor: 'Prof. Steve',
        days: ['wednesday'],
        time: '15:00'
    }
]

export const createGroup = ({ name, ownerId, description, course, professor, days, time }) => {
    const groups = JSON.parse(localStorage.getItem('groups')) ?? defaultGroups

    const id = uuid()
    const group = { id, name, description, ownerId, members: [], course, professor, days, time }

    groups.push(group)
    localStorage.setItem('groups', JSON.stringify(groups))

    return group
}

export const getGroups = () => {
    return JSON.parse(localStorage.getItem('groups')) ?? defaultGroups
}

export const deleteGroup = (id) => {
    let groups = JSON.parse(localStorage.getItem('groups')) ?? defaultGroups
    groups = groups.filter(group => group.id != id)
    localStorage.setItem('groups', JSON.stringify(groups))
}

export const editGroup = (editedGroup) => {
    let groups = JSON.parse(localStorage.getItem('groups')) ?? defaultGroups
    let len = groups.length
    groups = groups.filter(group => group.id != editedGroup.id)
    if (len == groups.length) return false

    groups.push(editedGroup)
    localStorage.setItem('groups', JSON.stringify(groups))
    return true
}