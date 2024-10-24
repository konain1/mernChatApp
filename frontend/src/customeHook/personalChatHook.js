import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPersonalChats } from "../redux/RecievePersonalChat";

const personalChatHook = (userId) => {
  const user = useSelector((state) => state.userUpdateStore.users);
  const [pChat, setPchat] = useState();
  const dispatch = useDispatch();

  // Memoize fetchPersonalChats to prevent it from being recreated on every render
  const fetchPersonalChats = useCallback(async () => {
    if (!user || !user.token) return;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const { data } = await axios.get("http://localhost:5001/api/chat", config);
      setPchat(data);
      dispatch(addPersonalChats(data));
    } catch (error) {
      console.error("Failed to fetch personal chats", error);
    }
  }, [user, dispatch]);

  // Trigger fetch when userId or user.token changes
  useEffect(() => {
    if (userId && user.token) {
      fetchPersonalChats();
    }
  }, [userId, user.token, fetchPersonalChats]);

  console.log(pChat);
  return pChat;
};

export default personalChatHook;
