import React from 'react';
import './message.css'

function Message({username, message, formatDate}) {
    const isUser = username && username.displayName === message.username ;
    return (
        <div className={isUser ? "message__align" : ' '}>
            <button className={isUser ? "message__text card" : 'card '}>{!isUser && `${message.username || 'unknown user'}: `} {message.message}
            <br/>
           </button>
           {/* <p style={{fontSize: '10px'}}>{formatDate(new Date(message.timestamp.seconds * 1000))}</p> */}
        </div>
    )
}

export default Message
