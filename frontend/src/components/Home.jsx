import React, { useEffect,useState } from 'react'
import { Button } from '@chakra-ui/react'
import { Container,Box ,Text} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Loign from './Authentication/Loign'
import Signup from './Authentication/Signup'

// import {userUpdate} from '../redux/userSlice'
  

function Home() {
  // const dispatch = useDispatch()
  // const [user,setUser]=useState()


  return (
    <>
  <Container maxW='xl' centerContent>
  <Box  display='flex' bg='white' justifyContent='center' m="40px 0 15px 0" p={3} borderRadius='lg' borderWidth='1px' w='100%'>
   <Text  color="black" fontSize="4xl" fontFamily="work sans"> ChatApp</Text>
  </Box>
  <Box  w="100%" bg='white'  p={3} borderRadius='lg' borderWidth='1px' >
  <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList mb="1rem">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Signup</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Loign/>
    </TabPanel>
    <TabPanel>
      <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
  </Box>

  
</Container>
    </>

  )
}

export default Home