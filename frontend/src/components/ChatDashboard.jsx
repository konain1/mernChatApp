import React, { useEffect } from 'react'
import { addChatUserOneOnOne } from '../redux/OneOneChatSlice'
import { useSelector } from 'react-redux'
import { Box, Center } from '@chakra-ui/react'
import SingleChat from './SingleChat'


function ChatDashboard({fetchAgain,setFetchAgain}) {
  const selectedChat = useSelector(state=>state.ChatUser1on1Store.selectedChat)
  console.log(selectedChat)

  useEffect(()=>{
    console.log('rerender')
  },[selectedChat])
  return (
    
      <Box display={{base:selectedChat ? 'flex' : 'none' , md:'flex'}} 
      w={{base:'100%' , md:'60%'}}
      alignItems='center'
      flexDir="column"
      p={3}
      borderRadius='lg'
      borderWidth="1px"
       >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        
      </Box>
 
  )
}

export default ChatDashboard