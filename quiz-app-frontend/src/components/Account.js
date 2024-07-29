import React, { useEffect, useState } from 'react'
import { getUser } from '../services/AuthService'

export const Account = () => {
    const user = JSON.parse(getUser());
  return (
    <div>
        <p>First name : {user.firstName}</p>
        <p>Last name : {user.lastName}</p>
        <p>Username : {user.username}</p>
        <p>Email : {user.email}</p>
        <p>Phone no : {user.phoneNo}</p>
    </div>
  )
}
