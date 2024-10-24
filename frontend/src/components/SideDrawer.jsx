import React, { useState, useEffect } from 'react'
import { Box, Tooltip, Button, Text, Avatar } from '@chakra-ui/react'
import ProfileModal from './ProfileModal'
import UserListItems from './UserListItems'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure
} from '@chakra-ui/react'

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  useToast 
} from '@chakra-ui/react'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ChatLoading from './ChatLoading'
import { addChatUserOneOnOne } from '../redux/OneOneChatSlice'

function SideDrawer() {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)
  const navigate = useNavigate()

  // Redux
  const dispatch = useDispatch()
  const user = useSelector(state => state.userUpdateStore.users)
  const chats = useSelector(state => state.ChatUser1on1Store.chats) // Updated selector
  const selectedChat = useSelector(state => state.ChatUser1on1Store.selectedChat)

  // Chakra UI hooks
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const toast = useToast()

  // Fetch existing chats on component mount
  useEffect(() => {
    fetchChats()
  }, [])

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.get("http://localhost:5001/api/chat", config)
      dispatch(addChatUserOneOnOne(data))
    } catch (error) {
      toast({
        title: 'Error fetching chats',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const logoutFunction = () => {
    localStorage.removeItem('userInfo')
    dispatch(addChatUserOneOnOne([])) // Clear chats on logout
    navigate('/')
  }
  
  const handleSearch = async () => {
    if(!search) {
      toast({
        title: 'Please enter something in search',
        position: "top-left",
        status: 'warning',
        duration: 2000,
        isClosable: true,
      })
      return
    }

    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.get(`http://localhost:5001/api/user/search?search=${search}`, config)
      setLoading(false)
      setSearchResult(data)
      
    } catch (error) {
      toast({
        title: 'Error occurred!',
        description: 'Failed to load search results',
        position: "top-left",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      setLoading(false)
    }
  }

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true)
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      }
  
      const { data } = await axios.post("http://localhost:5001/api/chat", { userId }, config)
      
      // Check if chat already exists, if not add it
      if (!chats.find((c) => c._id === data._id)) {
        dispatch(addChatUserOneOnOne([...chats, data]))
      }
      
      setLoadingChat(false)
      onClose()
      // Navigate to the chat or update UI as needed
      
    } catch (error) {
      toast({
        title: 'Failed to create chat',
        description: error.response?.data?.message || 'Something went wrong',
        position: "top-left",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      setLoadingChat(false)
    }
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px"
        borderWidth="5px"
      >
        <Tooltip label='Search users to chat' hasArrow placement='bottom-end'>
          <Button variant="ghost" onClick={onOpen}>
            <Text px={4}>Search User</Text>
          </Button>
        </Tooltip>

        <div style={{ display: 'flex', marginRight: '10px' }}>
          <Menu>
            <MenuButton as={Button}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>Profile</MenuItem>
              </ProfileModal>
              <MenuItem onClick={logoutFunction}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>

          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button 
                onClick={handleSearch}
                isLoading={loading}
              >
                Go
              </Button>
            </Box>

            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map(user => (
                <UserListItems
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <ChatLoading />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer