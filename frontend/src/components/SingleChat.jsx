import { Box, Button, FormControl, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChat, clearChats } from '../redux/OneOneChatSlice';
import getUserNameFn, { getuserProfile } from './configChat/chatLogin';
import ProfileModal from './ProfileModal';
import UpdateGroupChatModel from './UpdateGroupChatModel';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client';

// Socket endpoint
const Endpoint = 'http://localhost:5001';
let socket,selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [socketConneted,setSocketConnected]=useState(false)
    const toast = useToast();

    const selectedChat = useSelector(state => state.ChatUser1on1Store.selectedChat);
    const user = useSelector(state => state.userUpdateStore.users);
    const dispatch = useDispatch();


 useEffect(() => {
    socket = io(Endpoint);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    
    return () => {
        if (socket) socket.disconnect();  // Cleanup socket connection
    };
}, [user]);

useEffect(() => {
    fetchMessages();
    if(selectedChat){

        selectedChatCompare = selectedChat
    }
}, [selectedChat]);


useEffect(()=>{
    
    socket.on("message recieved",(NewMessageRecieved)=>{
        if(!selectedChatCompare || selectedChatCompare._id !== NewMessageRecieved.chat._id){
            // notification logic
        }else{
            setMessage(prevMessages => [...prevMessages, NewMessageRecieved]);
        }
   
    })
    console.log('tiktok')
},[socket])



    const handleBackButton = () => {
        dispatch(clearChats(" "));
    };

    const sendMessage = async (event) => {
        if (event.key === 'Enter' && newMessage) {
            try {
                setLoading(true);

                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        "Content-Type": "application/json"
                    },
                };

                const { data } = await axios.post('http://localhost:5001/api/message', { content: newMessage, chatId: selectedChat._id }, config);
                setLoading(false);
                setNewMessage('');
                socket.emit('new message',data)
                setMessage([...message, data]);

            } catch (error) {
                console.log('send message error', error);
                toast({
                    title: 'Cannot send message',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom'
                });
                setLoading(false);
            }
        }
    };

    const handleTyping = (e) => {
        setNewMessage(e.target.value);
    };

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            setLoading(true);

            const { data } = await axios.get(`http://localhost:5001/api/message/${selectedChat._id}`, config);
            setMessage(data);
            setLoading(false);

            // Join room after fetching messages
            socket.emit('join room', selectedChat._id);
            console.log(`Emitted join room event for room ID: ${selectedChat._id}`);

        } catch (error) {
            console.log('fetch messages error', error);
            toast({
                title: 'Cannot fetch messages',
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
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: '20px', md: '25px' }}
                        pb={3}
                        px={2}
                        w='100%'
                        display='flex'
                        justifyContent={{ base: 'space-between' }}
                        alignItems='center'
                    >
                        <i className="fa-solid fa-arrow-left" onClick={handleBackButton}></i>
                        {!selectedChat.isGroupChat ? (
                            <>
                                {getUserNameFn(selectedChat.users)}
                                <ProfileModal user={getuserProfile(selectedChat.users)} />
                            </>
                        ) : (
                            <>
                                {selectedChat.chatName.toUpperCase()}
                                <UpdateGroupChatModel fetchMessages={fetchMessages} setFetchAgain={setFetchAgain} fetchAgain={fetchAgain} />
                            </>
                        )}
                    </Text>
                    
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        w="100%"
                        h="90%"
                        bg="#E8E8E8"
                        borderRadius="lg"
                        p={2}
                    >
                        {/* Chat messages container */}
                        <Box
                            flex={1}
                            overflowY="auto"
                            p={1}
                            mb={2} // Space above the input
                            borderRadius="lg"
                            bg="white"
                        >
                            {loading ? (
                                <Spinner size='xl' h={20} w={20} alignSelf='center' margin='auto' />
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'scroll', scrollbarWidth: 'none' }}>
                                    <ScrollableChat message={message} />
                                </div>
                            )}
                        </Box>

                        {/* Input field at the bottom */}
                        <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                            <Input
                                variant='filled'
                                bg='#E0E0E0'
                                placeholder="Type your message..."
                                value={newMessage}
                                onChange={handleTyping}
                            />
                        </FormControl>
                    </Box>
                </>
            ) : (
                <Box display='flex' justifyContent='center'>
                    <Text fontSize={{ base: '25px' }}>Select a user to chat</Text>
                </Box>
            )}
        </>
    );
}

export default SingleChat;
