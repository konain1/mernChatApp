import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Input,
  Button,
  useToast,
  FormControl,
  Stack
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import useSearchUser from '../customeHook/useSearchUser';
import UserListItems from './UserListItems';
import UserGroupedMembers from './UserGroupedMembers';
import axios from 'axios';
import {addChatUserOneOnOne} from '../redux/OneOneChatSlice'

function GroupChatModel({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const toast = useToast();
  const [searchResult, searchUsers] = useSearchUser(setLoading);


  const user = useSelector((state) => state.userUpdateStore.users);
  const chat = useSelector((state) => state.ChatUser1on1Store.chats);
  const dispatch = useDispatch();



  const handleSearchUsers = (query) => {
    if (query) {
      searchUsers(query);
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  };

  const handleDeleteMember = (Deluser) => {
    setSelectedUsers(selectedUsers.filter((user) => user._id !== Deluser._id));
  };

  const handleSubmit = async () => {
    
    if (!selectedUsers.length || !groupName) {
      toast({
        title: 'Please fill all fields!',
        position: 'top',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
  
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo) {
        toast({
          title: 'User not authenticated',
          position: 'top',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      
      const token = userInfo.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const { data } = await axios.post(
        'http://localhost:5001/api/chat/group',
        { GroupName: groupName, users: JSON.stringify(selectedUsers.map((user) => user._id)) },
        config
      );
      dispatch(addChatUserOneOnOne([...chat,data]))
      onClose();
      toast({
        title: 'Successfully created group!',
        position: 'top',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
  
    } catch (error) {
      console.error(error);

      toast({
        title: 'Cannot create group! Add more than 2 users',
        position: 'top',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };
  

  const handleGroup = (userToAdd) => {
    if (selectedUsers.some((user) => userToAdd._id === user._id)) {
      toast({
        title: 'User Already Added',
        position: 'top-left',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleModalClose = () => {
    setSearch('');
    setSelectedUsers([]);
    setGroupName('');
    setIsShow(false);
    onClose();
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={handleModalClose} isCentered size={{ base: 'sm', md: 'md', lg: 'lg' }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={{ base: 'lg', md: 'xl' }}>Create Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
              {/* Group Name Input */}
              <FormControl width="100%">
                <Input
                  width={{ base: '100%', md: '80%' }}
                  placeholder="Enter Group Name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </FormControl>

              {/* Add Users Input */}
              <FormControl width="100%">
                <Input
                  width={{ base: '100%', md: '80%' }}
                  placeholder="Add Users"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    handleSearchUsers(e.target.value);
                  }}
                />
              </FormControl>

              {/* Display Selected Users */}
              <Box display="flex" padding="0px 10px" w="100%" flexWrap="wrap">
                {selectedUsers.map((user) => (
                  <UserGroupedMembers
                    key={user._id}
                    user={user}
                    handleFunction={() => handleDeleteMember(user)}
                  />
                ))}
              </Box>

              {/* Render Search Results */}
              {isShow && (
                <Stack width="100%" spacing={2} maxH="200px" overflowY="auto">
                  {loading ? (
                    <Box textAlign="center">Loading...</Box>
                  ) : (
                    searchResult.slice(0, 4).map((user) => (
                      <UserListItems
                        key={user._id}
                        user={user}
                        handleFunction={() => handleGroup(user)}
                      />
                    ))
                  )}
                </Stack>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleModalClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GroupChatModel;
