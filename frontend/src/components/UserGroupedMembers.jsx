import React from 'react'
import { Box } from '@chakra-ui/react'
import 'primeicons/primeicons.css'
import { useSelector } from 'react-redux'

function UserGroupedMembers({ user, handleFunction }) {
  const loggedUser = useSelector(state => state.userUpdateStore.users)
  console.log('logged', loggedUser)

  return (
    <>
      {loggedUser.id !== user._id && (
        <Box
          cursor='pointer'
          _hover={{
            background: '#E8E8E8',
            color: 'black',
          }}
          display='flex'
          flexDir='row'
          alignItems='center'
          color='white'
          px={2}
          py={2}
          mb={2}
          borderRadius='lg'
          overflowX='hidden'
          bgColor='purple'
        >
          <Box
            style={{
              maxWidth: '100px', // Set a fixed width for the container
              overflowX: 'auto', // Enable horizontal scrolling on the container
              whiteSpace: 'nowrap', // Ensure text does not wrap
            }}
          >
            <p style={{ fontSize: '10px' }}>{user.name}</p>
          </Box>
          <button style={{ padding: '0px 10px' }} onClick={handleFunction}>
            <i className='pi pi-times'></i>
          </button>
        </Box>
      )}
    </>
  )
}

export default UserGroupedMembers
