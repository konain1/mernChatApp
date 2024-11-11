import React from 'react'
import { useSelector } from 'react-redux'
import ScrollableFeed from 'react-scrollable-feed'
import { isSameSender,isLastMessage, isSameSenderMargin, isSameUser } from './configChat/chatLogin'
import { Avatar, Tooltip } from '@chakra-ui/react'


function ScrollableChat({message}) {
    const user = useSelector(state=>state.userUpdateStore.users)
  return (
  <>
    <ScrollableFeed>{message && message.map((m,i)=>(
        <div style={{display:'flex'}} key={m._Id}>{
            (isSameSender(message,m,i,user.id)) || 
            (isLastMessage(message,i,user.id)) &&
            (<Tooltip label={m.sender.name} placement='bottom-start' hasArrow>
                <Avatar name={m.sender.name}  size='xs' cursor='pointer' src={m.sender.pic}></Avatar>
            </Tooltip>) }

            <span style={{backgroundColor:`${m.sender._id !== user.id ? "#BEE3F8" : "#B9F5D0" }`, padding:'5px 15px' , borderRadius:'20px', 
      maxWidth:'75%',
      marginLeft:isSameSenderMargin(message,m,i,user.id),

      }}>{m.content}</span>
        </div>
    ))}
  
    </ScrollableFeed>
  </>
  )
}

export default ScrollableChat