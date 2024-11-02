import { Box,Button,Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedChat,clearChats } from '../redux/OneOneChatSlice'
import getUserNameFn, { getuserProfile } from './configChat/chatLogin'
import ProfileModal from './ProfileModal'
import UpdateGroupChatModel from './UpdateGroupChatModel'

function SingleChat({fetchAgain,setFetchAgain}) {

    const selectedChat = useSelector(state=>state.ChatUser1on1Store.selectedChat)
    const dispatch = useDispatch()

    const handleBackButton = ()=>{
        dispatch(clearChats(" "))

    }
 
  return (
    <>
    {selectedChat ? (<>
        <Text 
        fontSize={{base:'20px',md:'25px'}}
        pb={3}
        px={2}
        w='100%'
        display='flex'
        justifyContent={{base:'space-between'}}
        alignItems='center'
        >
       <i class="fa-solid fa-arrow-left" onClick={handleBackButton}></i>
       {!selectedChat.isGroupChat ? (<>
        {getUserNameFn(selectedChat.users)}
        <ProfileModal user={getuserProfile(selectedChat.users)} />
       </>)
        : (<>
            {selectedChat.chatName.toUpperCase()}
            {< UpdateGroupChatModel setFetchAgain={setFetchAgain} fetchAgain={fetchAgain} />} 
        </>)
       }
        </Text>
        <Box
        pb={3}
        px={2}
        w='100%'
        h='100%'
        display='flex'
        justifyContent='flex-end'
        bg="#E8E8E8"
        borderRadius='lg'
        overflowY='hidden'
        >

        </Box>

    </>) :
    (<>
    <Box 
    display='flex'
    justifyContent='center' >

        <Text fontSize={{base:'25px'}}>Select the user to chat</Text>
    </Box>
    
    </>)}
    </>
  )
}

export default SingleChat