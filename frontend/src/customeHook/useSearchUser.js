import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'

const useSearchUser = (setLoading) => {
  const [searchResult, setSearchResult] = useState([])
  const toast = useToast()
  const user = JSON.parse(localStorage.getItem('userInfo')) 

  const searchUsers = async (query) => {
    if (!query) {
      toast({
        title: 'Please enter something in search',
        position: 'top-left',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      })
      return
    }

    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`, // Ensure user token is available
        },
      }

      const { data } = await axios.get(
        `http://localhost:5001/api/user/search?search=${query}`,
        config
      )
      setSearchResult(data)
      setLoading(false)
    } catch (error) {
      toast({
        title: 'Error occurred!',
        description: 'Failed to load search results',
        position: 'top-left',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      setLoading(false)
    }
  }

  return [searchResult, searchUsers]
}

export default useSearchUser
