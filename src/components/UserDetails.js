import React from 'react'
import {FaUserAlt} from 'react-icons/fa'
import './userDetails.css'

function UserDetails({username}) {
    return (
        <div className='userDetail__section'>
            <div className='userDetail__userIcon'>
                <FaUserAlt />
            </div>
            {username && username.displayName}
        </div>
    )
}

export default UserDetails
