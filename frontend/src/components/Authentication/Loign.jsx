import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

function Loign() {
    const [email,setEmail] = useState()
    const [password,setPassword]=useState()
    const [show,setShow] = useState()
    
    const handleClick = ()=>{
        setShow(!show)
    }
  return (
   <VStack>
     <FormControl>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)} />
        </FormControl>
        <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
        <Input type={show?"text":"password"} placeholder='Enter your Password' onChange={(e)=>setPassword(e.target.value)} />
        <InputRightElement width="4.5rem">
            <Button bg="white" _hover="none" width="1.75rem" size="sm" onClick={handleClick}>
                {show? "Hide" : "Show"}
            </Button>
        </InputRightElement>
        </InputGroup>
        </FormControl>
        <Button  colorScheme='blue' width='100%' color='white' style={{marginTop: 15}}  >login</Button>
        <Button variant='solid' colorScheme='red' width='100%' color='white' style={{marginTop: 15}} onClick={  ()=>{
                setEmail('example@gmail.com')
                setPassword('123456')
            }
        }  >Get Guest user crediential </Button>


   </VStack>
  )
}

export default Loign