import React, { useState } from 'react'
import { Box, Tooltip, Button, Text ,Avatar} from '@chakra-ui/react'
import ProfileModal from './ProfileModal'
import UserListItems from './UserListItems'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
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



import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ChatLoading from './ChatLoading'
import {addChatUserOneOnOne} from '../redux/OneOneChatSlice'

function SideDrawer () {

  const [search,setSearch] = useState()
  const [searchResult,setSearchResult] = useState([])
  const [loading,setLoading] = useState(false)
  const [loadingChat,setLoadingChat] = useState()
  const navigate = useNavigate()


//  redux 
  const dispatch = useDispatch()
  const user = useSelector(state => state.userUpdateStore.users)


  // chakra ui
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const toast = useToast()


  const logoutFunction = ()=>{
    localStorage.removeItem('userInfo')

    navigate('/')
  }
  
  const handleSearch = async()=>{
    if(!search){
      toast({
        title: 'Enter something',
        position:"top-left",
        status: 'warning',
        duration: 2000,
        isClosable: true,
      })
    }

    try {

      setLoading(true);
      const config={
        headers:{
          Authorization: `Bearer ${user.token}`
        }
      }

      console.log(user)
      const {data} = await axios.get(`http://localhost:5001/api/user/search?search=${search}`, config)
      setLoading(false)
      setSearchResult(data)
      
    } catch (error) {
      console.log('searching user Error ',error)
      toast({
        title: 'Failed to load the search',
        position:"top-left",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const accessChat = async(userId)=>{
    
    setLoading(true)

    try {
      const config={
        headers:{
          'Content-type':'application/json',
          Authorization: `Bearer ${user.token}`
        }
      }
  
      const {data} = await axios.post("http://localhost:5001/api/chat",{userId},config)
      console.log('chat data ',data.users)
      dispatch(addChatUserOneOnOne(data.users))
      setLoading(false)
      onClose()
    } catch (error) {
      toast({
        title: 'Failed to chat',
        position:"top-left",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }

   

  }
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Tooltip abel='search user for chat' hasArrow placement='bottom-end'>
          <Button lcolorScheme='gray'>
            <Text ref={btnRef} colorScheme='teal' onClick={onOpen}> Search </Text>
          </Button>
        </Tooltip>
        <div>
          <Menu  >
            <MenuButton as={Button}>Menu</MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              
            </MenuList>
          </Menu>
        </div>
        <div style={{display:'flex' , marginRight:'10px'}}>
      
          <Menu>
            <MenuButton>
            <Avatar name={user.name} size='sm' cursor='pointer'  src={user.pic}/>
            </MenuButton>
            <MenuList>
            <ProfileModal >

              <MenuItem>profile</MenuItem>
            </ProfileModal>
              <MenuItem onClick={logoutFunction}>logout</MenuItem>

             
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
          <DrawerHeader>Search...</DrawerHeader>

          <DrawerBody>
          <Box display="flex" pb={2}>

            <Input placeholder='name or email.' value={search} onChange={ (e)=>setSearch(e.target.value)} />
            <Button onClick={handleSearch}>Search</Button>
          </Box>
          {loading ? <ChatLoading/> : (
            searchResult?.map(user=>(
              <UserListItems handleFunction={()=>accessChat(user._id)} key={user._id} user={user} />
            ))
          )}
          </DrawerBody>

          <DrawerFooter>
            {/* <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      
    </>
  )
}

export default SideDrawer
