import React from 'react'

function Users({message, username}) {
    const noUser = username || ''
    const allUsers = [...new Set(message.map(item => item.message.username))];
    const users = allUsers.filter(user => user !== noUser.displayName)
    return (
        <div>
            {users.map((user, index) => <p key={index} 
            
            // onClick={() => handleChatWith(user)}
            >{user}</p> )}
        </div>
    )
}

export default Users
