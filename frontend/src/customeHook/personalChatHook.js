import axios from "axios"
import { useState ,useEffect} from "react"
import { useSelector,useDispatch } from "react-redux"
import { addPersonalChats } from "../redux/RecievePersonalChat"

const personalChatHook = (userId)=>{

  
    const user = useSelector(state => state.userUpdateStore.users)
    const [pChat,setPchat]=useState()
    const dispatch = useDispatch();

    useEffect(() => {

        fetchPersonalChats();

    }, [userId]);
  async function fetchPersonalChats (){

    const config={
        headers:{
           'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      }
  
      const { data } = await axios.get("http://localhost:5001/api/chat", config);
      
      setPchat(data)
      dispatch(addPersonalChats(data))
  }

  console.log(pChat)
  return pChat
}

export default personalChatHook