import React, { useState, useMemo, useEffect } from 'react'
import personalChatHook from '../customeHook/personalChatHook'
import { useSelector } from 'react-redux'
import { Box, Button, Text, Stack, Avatar, Input } from '@chakra-ui/react'
import ChatLoading from './ChatLoading'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import getUserNameFn from './configChat/chatLogin'
import GroupChatModel from './GroupChatModel'
import { addChatUserOneOnOne,setSelectedChat } from '../redux/OneOneChatSlice'
import { useDispatch } from 'react-redux'

function MyChatBox ({ user ,fetchAgain}) {
  const chats = personalChatHook(user.id)
  const [selectedChat, setChoosedChat] = useState(null)
  const getChats = useSelector(state => state.ChatUser1on1Store.chats)
  const loggedUser = useSelector(state => state.userUpdateStore.users)
  const [isModelOPen,setIsModelOpen] = useState(false)
  const [loading,setLoading]=useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const dispatch = useDispatch()

  // Memoize the getUserName function to prevent unnecessary recalculations
  const getUserName = useMemo(
    () => users => {
      if (!users) return 'Chat'
      const chatUser = users.find(user => user._id !== loggedUser.id)

      return chatUser ? chatUser.name : 'Chat'
    },
    [loggedUser._id]
  )
  
  // Handle chat selection
  const handleChatSelect = chat => {
    const newuser = chat.users.find(user => user._id === loggedUser.id)
    console.log('chat', newuser)
    setChoosedChat(chat)
    dispatch(setSelectedChat(chat))
  }

  const hadleAddGroupChat = () => {
    onOpen()
  }
  

  return (

      <Box
        display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
        flexDir='column'
        alignItems='center'
        p={3}
        bg='white'
        w='100%'
        borderRadius='lg'
        borderWidth='2px'
      >
        {/* Chat Header */}
        <Box
          display='flex'
          alignItems='center'
          pb={3}
          px={3}
          fontFamily='Work Sans'
          w='100%'
          justifyContent='space-between'
          fontSize={{ base: '8px', md: '14px', lg: '17px' }}
        >
          My Chats
 
            <GroupChatModel >
            <Button
              fontSize={{ base: '12px', md: '14px', lg: '17px' }} // Adjust font size for different screens
              px={{ base: '10px', md: '20px', lg: '30px' }} // Responsive horizontal padding
              py={{ base: '8px', md: '10px', lg: '12px' }} // Responsive vertical padding
              width={{ base: '80px', md: '150px', lg: '200px' }} // Responsive width
              height={{ base: '35px', md: '45px', lg: '50px' }}
              // fontSize={{ base: '10px', md: '10px', lg: '17px' }}
              display='flex-wrap'
              colorScheme='teal'
              onClick={ hadleAddGroupChat}
            >
              NewGroup
            </Button>
          </GroupChatModel>
           
         
        </Box>

        {/* Chat List */}
        {getChats ? (
          <Stack overflowY='scroll' w='100%' h='100%' spacing={3}>
            {getChats.map(chat => (
              <Box
                onClick={() => handleChatSelect(chat)}
                cursor='pointer'
                bg={selectedChat?._id === chat._id ? '#38B2AC' : '#E8E8E8'}
                px={3}
                py={2}
                borderRadius='lg'
                key={chat._id}
                color={selectedChat?._id === chat._id ? 'white' : 'black'}
                _hover={{
                  background: '#38B2AC',
                  color: 'white'
                }}
                transition='all 0.3s'
              >
                <Text>
                  {!chat.isGroupChat ? (
                    <>
                      {getUserNameFn(chat.users)}
                      {chat.latestMessage && (
                        <Text
                          fontSize='xs'
                          color={
                            selectedChat?._id === chat._id
                              ? 'white'
                              : 'gray.500'
                          }
                        >
                          {chat.latestMessage.content.length > 50
                            ? chat.latestMessage.content.substring(0, 51) +
                              '...'
                            : chat.latestMessage.content}
                        </Text>
                      )}
                    </>
                  ) : (
                    <>
                      {chat.chatName}
                      {chat.latestMessage && (
                        <Text
                          fontSize='xs'
                          color={
                            selectedChat?._id === chat._id
                              ? 'white'
                              : 'gray.500'
                          }
                        >
                          {`${chat.latestMessage.sender.name}: ${
                            chat.latestMessage.content.length > 50
                              ? chat.latestMessage.content.substring(0, 51) +
                                '...'
                              : chat.latestMessage.content
                          }`}
                        </Text>
                      )}
                    </>
                  )}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>

  )
}

export default MyChatBox
