import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updateUser } from '../redux/userSlice';

function ChatPage () {

const dispatch = useDispatch()
const [loginUser,setLoginUser]=useState()
   
    useEffect(()=>{
      let localUser = JSON.parse(localStorage.getItem('userInfo'))
      console.log('localuser ' ,localUser)

      if(localUser){
        dispatch(updateUser(localUser))
        setLoginUser(localUser)
        console.log('done')
      }
    },[dispatch])

  return (

    <>
    <h1>ChatPage</h1>
    {loginUser && (
      <>
        <h1>{loginUser.name}</h1>
        <p>{loginUser.email}</p>
      </>
    )}
  </>
   
  )
}

export default ChatPage
