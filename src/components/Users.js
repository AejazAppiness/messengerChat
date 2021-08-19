import React from 'react';
import './users.css'

function Users({users, username, handleChatWith}) {
    const noUser = username || ''
    const usersList = users.filter(user => user.user !== noUser.displayName);
    const allUsers = [...new Set(usersList.map(item => item.user))];
    return (
        <div>
            {allUsers.map((user, index) => {
                return <p className="user" key={index} onClick={() => {
                    handleChatWith(user)
                }}>{user}</p>
            })}
        </div>
    )
}

export default Users
