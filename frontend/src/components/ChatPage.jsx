import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ChatPage () {
    const [data,setData]=useState([])

   async function fetchChats(){
    try {
        let chats =  await axios.get('http://localhost:5001/api/chats')
        console.log(chats.data)
        setData(chats.data)

    } catch (error) {
        console.log(error)
    }
      
    }

    useEffect(()=>{
        fetchChats()
    },[])

  return (
    <>
      <h1>ChatPage</h1>
      {data?.map((chat,index)=>(<div key={index}>{chat.chatName}</div>))}

    </>
  )
}

export default ChatPage
