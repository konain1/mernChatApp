import React, { useState } from 'react'
import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'




function Signup() {
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword]=useState()
    const [confirmPassword,setConfirmPassword] = useState()
    const [picture,setPicture]= useState()
    const [show,setShow] = useState()
    const [show2,setShow2] = useState()
    const [loading,setLoading]= useState(false)
    const navigate = useNavigate()
    
    const toast = useToast()

    const handleClick = ()=>{
        setShow(!show)
    }
    const handleClick2 = ()=>{
        setShow2(!show2)
    }
    
    const postDetails = (pic)=>{

        setLoading(true)
        if(pic === undefined){
            toast({
                title: 'Plaeas select an Image',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position:'bottom-right'
              })
              return;
        }

        if(pic.type === 'image/jpeg' ||pic.type === 'image/png' ){
            const data = new FormData()
            data.append('file',pic)
            data.append('upload_preset','cloudpreset')
            data.append('cloud_name','dleyuli2e')
            fetch('https://api.cloudinary.com/v1_1/dleyuli2e/image/upload',{
                method:'post',body:data
            }).then((res)=>res.json()).then((resData)=>{
                console.log(resData.url)
                setPicture(resData.url);
                setLoading(false)
            }).catch((err)=>{
                console.log(err);
                setLoading(false)
            })
        }else{
            toast({
                title: 'Plaeas select an Image',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position:'bottom-right'
              })

              setLoading(false)
              return;
        }


    }


    // const submitHandler = async()=>{
    //     setLoading(true)

    //     if(!name || !email || !password || !confirmPassword){
    //         toast({
    //             title: 'Plaeas Enter Credientials',
    //             status: 'warning',
    //             duration: 3000,
    //             isClosable: true,
    //             position:'bottom-right'
    //           })
    //           setLoading(false)
    //           return;
    //     }
    //     if(password !== confirmPassword){
    //         toast({
    //             title: 'Passwords donot match',
    //             status: 'warning',
    //             duration: 3000,
    //             isClosable: true,
    //             position:'bottom-right'
    //           })
    //           setLoading(false)
    //           return;
    //     }

    //     try {
    //         const config = {
    //             headers:{
    //                 "Content-type":"application/json"
    //             }
    //         }
    //         let {data} = await axios.post('localhost:5001/api/user',{email,password,name,pic:picture},config)
    //         toast({
    //             title: `You're registered succefully`,
    //             status: 'success',
    //             duration: 3000,
    //             isClosable: true,
    //             position:'top'
    //           })
    //           setLoading(false)

    //     } catch (error) {
    //         console.log(error)
    //         throw new Error(error)
    //     }
    // }


    const submitHandler = async () => {
        setLoading(true);
    
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: 'Please Enter All Fields',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'bottom-right'
            });
            setLoading(false);
            return;
        }
    
        if (password !== confirmPassword) {
            toast({
                title: 'Passwords do not match',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'bottom-right'
            });
            setLoading(false);
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
                'http://localhost:5001/api/user/register',
                {
                    name,
                    email,
                    password,
                    pic: picture
                },
                config
            );
    
            // If successful, show success message and store user data
            toast({
                title: 'Registration successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
    
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate('/chatpage'); 
    
        } catch (error) {
            setLoading(false);
            
            // Check specifically for user exists error
            if (error.response?.data?.message === "User already exists with this email") {
                toast({
                    title: 'Registration Failed',
                    description: 'User already exists with this email',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-right'
                });
            } else {
                // Handle other errors
                toast({
                    title: 'Error Occurred!',
                    description: error.response?.data?.message || "An error occurred during registration",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-right'
                });
            }
            console.log(error);
        }
    };
    


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
        <Button  colorScheme='blue' width='100%' color='white' style={{marginTop: 15}} onClick={submitHandler} isLoading={loading} >Singup</Button>
    </VStack>
  )
}

export default Signup