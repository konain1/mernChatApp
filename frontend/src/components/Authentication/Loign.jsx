import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Loign() {
    const [email,setEmail] = useState()
    const [password,setPassword]=useState()
    const [show,setShow] = useState()
    const [loading,setLoading]= useState(false)
    const navigate = useNavigate()
    
    const toast = useToast()
    
    const handleClick = ()=>{
        setShow(!show)
    }
    

    const handleSubmit = async()=>{
        setLoading(true)
        if(!email || !password ){
            toast({
                title: 'Please Enter All Fields',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'bottom-right'
            })

            setLoading(false)
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };
    
            // Send registration request
            const { data } = await axios.post(
                'http://localhost:5001/api/user/login',
                {
                    email,
                    password, 
                },
                config
            );
            toast({
                title: 'succefully login',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate('/chatpage');
        } catch (error) {
            setLoading(false)
            console.log(error)
            toast({
                title: 'login Failed',
                description: error.response?.data?.message || "An error occurred during login",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-right'
            });
        }
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
        <Button  colorScheme='blue' width='100%' color='white' style={{marginTop: 15}} onClick={handleSubmit}  isLoading={loading}>login</Button>
        <Button variant='solid' colorScheme='red' width='100%' color='white' style={{marginTop: 15}} onClick={  ()=>{
                setEmail('example@gmail.com')
                setPassword('123456')
            }
        }  >Get Guest user crediential </Button>


   </VStack>
  )
}

export default Loign