import React, { useState } from 'react'
import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'

function Signup() {
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword]=useState()
    const [confirmPassword,setConfirmPassword] = useState()
    const [picture,setPicture]= useState()
    const [show,setShow] = useState()
    const [show2,setShow2] = useState()

    const handleClick = ()=>{
        setShow(!show)
    }
    const handleClick2 = ()=>{
        setShow2(!show2)
    }
    
    const postDetails = (pic)=>{}
    const submitHandler = ()=>{}


  return (
    <VStack>
        <FormControl>
            <FormLabel>Name</FormLabel>
            <Input placeholder='Enter your Name' onChange={(e)=>setName(e.target.value)} />
        </FormControl>
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
        <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
            <Input type={show2?"text":"password"}placeholder='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)} />
        <InputRightElement width="4.5rem">
            <Button bg="white" _hover="none" width="1.75rem" size="sm" onClick={handleClick2}>
                {show2? "Hide" : "Show"}
            </Button>
        </InputRightElement>
        </InputGroup>
        </FormControl>
        <FormControl>
            <FormLabel>Upload Your picture</FormLabel>
            <Input type='file' p={1.5} accept='image/*'  onChange={(e)=>postDetails(e.target.files[0])}/>
        </FormControl>
        <Button  colorScheme='blue' width='100%' color='white' style={{marginTop: 15}} onClick={submitHandler} >Submit</Button>
    </VStack>
  )
}

export default Signup