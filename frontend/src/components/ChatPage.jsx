import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/userSlice';
import SideDrawer from './SideDrawer';
import { Box } from '@chakra-ui/react';
import MyChatBox from './MyChatBox';
import ChatDashboard from './ChatDashboard';


function ChatPage() {
  const dispatch = useDispatch();
  const [loginUser, setLoginUser] = useState();
  const [fetchAgain,setFetchAgain] = useState(false)

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('userInfo'));
    console.log('localuser', localUser);

    if (localUser) {
      dispatch(updateUser(localUser));
      setLoginUser(localUser);
      console.log('done');
    }
  }, [dispatch]);

  return (
    <>
    <div style={{width:'100%'}}>

    {loginUser && <SideDrawer></SideDrawer>}
    <Box display="flex" justifyContent="space-between" p="10px" w="100%" h="90vh" border="1px solid black">
    
      {loginUser && <MyChatBox user={loginUser} fetchAgain={fetchAgain}/>}
      {loginUser && <ChatDashboard fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> }

    </Box>
    </div>

    </>
  )
}
  
  


export default ChatPage;
