import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Image,Text
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'

function ProfileModal ({user}) {
  // const user = useSelector(state => state.userUpdateStore.users)

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Profile</Button>

      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" justifyContent="center" >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display='flex' flexDir="column" alignItems="center" >
            <Image
              borderRadius='full'
              boxSize='150px'
              src={user.pic}
              alt='Dan Abramov'
            />
            <Text>
                Email: {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal
