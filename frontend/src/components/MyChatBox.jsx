import React, { useState } from 'react';
import personalChatHook from '../customeHook/personalChatHook';
import { useSelector } from 'react-redux';
import { Box, Button ,Text,Stack,Avatar} from '@chakra-ui/react';

function MyChatBox({ user }) {
  const chats = personalChatHook(user.id);
  const [selectedChat, setSelectedChat] = useState(false);
  const getChats = useSelector(state => state.ChatUser1on1Store.chatUser);

  console.log('redux ', getChats);

  return (
    <div style={{width:'40%'}}>
      {/* Chat List */}
      <Box
        display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }} // Hide chat list on smaller screens when chat is selected
        flexDir="column"
        alignItems="center"
        p={3}
        bg="yellow"

        w='100%'
        // w={{ base: '100%', md: '30%' , lg:'30%'}} // 100% width on mobile, 31% on medium screens and up
        borderRadius="lg"
        borderWidth="2px"
      >
        {/* Chat Header */}
        <Box
          display="flex"
          alignItems="center"
          pb={3}
          px={3}
          fontSize={{ base: '22px', md: '30px' }} // Responsive font size
          fontFamily="Work Sans"
          w="100%"
          justifyContent="space-between"
        >
          My Chats
          <Button fontSize={{ base: '10px', md: '10px', lg: '17px' }} display="flex">
            Add
          </Button>
        </Box>

        {/* Chat Content */}
        {/* Here you would map through your chats and display them as needed */}
     

      {/* Chat Window */}
      </Box>
      {getChats.map((chat)=>(
        <Box
        cursor='pointer'
        display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }} // Show chat window on mobile only when selected
        flexDir="column"
        alignItems="center"
        p={3}
        mt={3}
        bg="lightpink"
        w={{ base: '100%', md: '69%' }} // Take remaining space on larger screens
        borderRadius="lg"
        borderWidth="1px"
      >
        {/* Render chat details or messages here */}
        <Stack direction='row' display='flex' justifyContent='space-between'>
        <Avatar size='sm' src={chat.pic} />
        <Text fontSize='lg'>{chat.name}</Text>
      </Stack>
          
      </Box>
      ))}
      
    </div>
  );
}

export default MyChatBox;
