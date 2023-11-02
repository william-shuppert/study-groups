import { v4 as uuid } from 'uuid';

const defaultUsers = [
    {
        id: '5f620a3b-16bf-40cf-94b6-da3850f3f7e7',
        username: 'user',
        password: 'pass'
    }
]

const getUsers = () => {
    return JSON.parse(localStorage.getItem('users')) ?? defaultUsers
}

export const createUser = ({ username, password }) => {
    const users = getUsers()
    
    const existingUser = users.find(user => user.username == username)
    if (existingUser) return false
    
    const id = uuid()
    users.push({ id, username, password })
    localStorage.setItem('users', JSON.stringify(users))

    return { id, username }
}

export const login = ({username, password}) => {
    const user = getUsers(username).find(user => user.username == username)
    if (!user || password != user.password) return false
    
    return {
        id: user.id,
        username: user.username
    }
}