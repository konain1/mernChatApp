import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,Box,Input,Button,
    useToast,
    FormControl
  } from '@chakra-ui/react'

  import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addChatUserOneOnOne} from '../redux/OneOneChatSlice'





function GroupChatModel({children}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ search,setSearch] = useState()
    const [searchResult,setSearchResult] = useState([]);
    const [selectedUsers,setSelectedUsers]=useState([])
    const [groupName,setGroupName]=useState()
    const [loading,setLoading]=useState(false)
    const toast = useToast()

    

    const user = useSelector(state=>state.userUpdateStore.users)
    const chat = useSelector(state=>state.ChatUser1on1Store.chats)

    const dispatch = useDispatch()


    const handleSearchUsers = (searched)=>{

    }
    const handleSubmit = ()=>{
        
    }

  return (
    <>

<span onClick={onOpen}>{children}</span>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Group_Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>
          <Box display='flex' flexDir='column' justifyContent='center' alignItems='center'>



            <FormControl display='flex' flexDir='column' justifyContent='center' alignItems='center'>
            <Input  w='70%' placeholder='Enter Group Name' onChange={(e=>{setGroupName(e.target.value)})} />
            </FormControl>

            <FormControl display='flex' flexDir='column' justifyContent='center' alignItems='center'>
            <Input  w='70%' placeholder='Add users' onChange={(e)=>{handleSearchUsers(e.target.value)}} />
            </FormControl>
            {/* render search users here */}

          </Box>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={handleSubmit}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
  )
}

export default GroupChatModel