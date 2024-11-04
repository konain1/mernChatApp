import React, { useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Image,
  Box,
  FormControl,
  Input,
  useToast
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import UserGroupedMembers from './UserGroupedMembers'
import axios from 'axios'
import { setSelectedChat, addChatUserOneOnOne } from '../redux/OneOneChatSlice'
import useSearchUser from '../customeHook/useSearchUser'
import UserListItems from './UserListItems'

function UpdateGroupChatModel ({fetAgain,setFetchAgain}) {

    const [groupChatName, setGroupChatName] = useState("")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
//   const [searchResult, setSearchResult] = useState()
  const [renameLoading, setRenameLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [show,setShow]=useState(false)


  const handleClear = ()=>{
    setGroupChatName('');
    setShow(false)
    onClose();
  }


  const selectedChat = useSelector(
    state => state.ChatUser1on1Store.selectedChat
  )
  const Chatdata = useSelector(state=>state.ChatUser1on1Store.chats);

  const user = useSelector(state=>state.userUpdateStore.users)
  const toast  = useToast()
  const dispatch = useDispatch()


  const  [searchResult, searchUsers] = useSearchUser(setLoading)

  useEffect(()=>{},[fetAgain])

  const handleDeleteMember = async userMember => {

    setLoading(true)
    if(selectedChat.groupAdmin._id !== user.id || userMember._id !== user.id){
      toast({
        title:'only admin can remove users',
        status:'error',
        duration:3000,
        isClosable:true,
        position:'bottom'
    })
    return
    }


    try {
      const config ={
      headers:{
        Authorization: `Bearer ${user.token}`
      }
    }
    const {data} = await axios.put('http://localhost:5001/api/chat/groupremove',
      {
        chatId:selectedChat._id,
        userId:userMember._id
      },config
    )
    dispatch(setSelectedChat(data))
    setLoading(false)
    } catch (error) {
      toast({
        title:'cant remove user',
        status:'error',
        duration:3000,
        isClosable:true,
        position:'bottom'
    })
    setLoading(false)
    }

    

  }


  const handleAddUser =async (thisUser)=>{
    if(selectedChat.users.some((u)=>u._id == thisUser._id)){
        toast({
            title:'User already in Group',
            status:'error',
            duration:3000,
            isClosable:true,
            position:'bottom'
        })
        return
    }
    

    if(selectedChat.groupAdmin._id !== user.id){
        toast({
            title:'only Admin can add',
            status:'error',
            duration:3000,
            isClosable:true,
            position:'bottom'
        })
        return
    }

    try {
        setLoading(true)
        const config ={
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }

        const {data} = await axios.put('http://localhost:5001/api/chat/groupadd',{
            chatId:selectedChat._id,
            userId:thisUser._id
        },config)

        setLoading(false)
        dispatch(setSelectedChat(data))
        setFetchAgain(!fetAgain)
        
    } catch (error) {
        toast({
            title:'add new user not posible',
            status:'error',
            duration:3000,
            isClosable:true,
            position:'bottom'
        })
    }
  }


  const handleRename = async() => {
    if(!groupChatName )return;

    try {
        setRenameLoading(true)
        const config = {
            headers:{
                authorization:`Bearer ${user.token}`
            }
        }

        const {data} = await axios.put('http://localhost:5001/api/chat/rename',{chatId:selectedChat._id,chatName:groupChatName},config)
        console.log(selectedChat)
        dispatch(setSelectedChat(data))
        setFetchAgain(!fetAgain) // re-render parent component
        setRenameLoading(false)
        
    } catch (error) {
        console.log(error)
        toast({
            title: 'Cannot Rename group!',
            position: 'top',
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
    }
    setGroupChatName('')
  }


  const handleSearch = (query) => {
    console.log(query)
    searchUsers(query)
    setShow(true)
    // Add search handling here
  }


  const handleRemove = async () => {
    if (!user || !selectedChat?._id) {
      toast({
        title: 'Need a valid user and chat selection to leave the group',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
      });
      return;
    }
  
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        },
        data: { chatId: selectedChat._id } // Pass `chatId` in `data` for DELETE
      };
  
      // Make DELETE request with `chatId` in `data` and `config` for headers
      const { data } = await axios.delete('http://localhost:5001/api/chat/groupleave', config);
  
      // If successful, reset the selected chat in
      dispatch(addChatUserOneOnOne(Chatdata.filter((chatIId)=>chatIId._id != data.chat._id)))
      dispatch(setSelectedChat(null));
      setFetchAgain(!fetAgain)
  
      setLoading(false);
    } catch (error) {
      console.log('Error leaving group:', error);
      toast({
        title: 'Could not leave group',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
      });
      setLoading(false);
    }


  };


  return (
    <>
      <span onClick={onOpen}>
        <i className='fa-regular fa-eye'></i>
      </span>
      <Modal size='lg' isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display='flex' justifyContent='center'>
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display='flex' flexDir='column' alignItems='center'>
            {/* <Image
              borderRadius='full'
              boxSize='150px'
              src=''
              alt='Group Icon'
            /> */}
            <Box display='flex' padding='0px 10px' w='100%' flexWrap='wrap'>
              {selectedChat.users.map(user => (
                <UserGroupedMembers
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDeleteMember(user)}
                />
              ))}
           

            <FormControl mt={4} mb={4} w="100%">
              <Input
                placeholder='Rename Group'
                mb={3}
                value={groupChatName}
                onChange={e => setGroupChatName(e.target.value)}
              />
            </FormControl>

            <FormControl mb={4} w="100%">
              <Input
                placeholder='Add Users'
                onChange={e => handleSearch(e.target.value)}
              />
              
              {show && searchResult.slice(0,5).map((user)=>(<>{<UserListItems key={user._id} user={user} handleFunction={()=>handleAddUser(user)} />}</>))}
            </FormControl>

            <Box display='flex' w='100%' justifyContent='space-between' mt={4}>
              <Button
                colorScheme='red'
                onClick={handleRemove}
                flex="1"
                mr={2}
              >
                Leave Group
              </Button>

              <Button
                colorScheme='teal'
                isLoading={renameLoading}
                onClick={handleRename}
                flex="1"
              >
                rename
              </Button>
            </Box>
            </Box>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleClear}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModel
