const getUserNameFn = (users) => {
    // Get the logged-in user info from localStorage
    const loggedUser = JSON.parse(localStorage.getItem('userInfo'));
  
    if (!loggedUser || !users || users.length < 2) {
      console.error("Invalid loggedUser or users data");
      return "Unknown";
    }
  
    // Return the name of the user who is not the logged-in user
    return users[0]._id === loggedUser.id ? users[1].name : users[0].name;
  };
  
  export const getuserProfile = (users)=>{
    const loggedUser = JSON.parse(localStorage.getItem('userInfo'));
  
    if (!loggedUser || !users || users.length < 2) {
      console.error("Invalid loggedUser or users data");
      return "Unknown";
    }
  
    // Return the name of the user who is not the logged-in user
    return users[0]._id === loggedUser.id ? users[1] : users[0].name;
  }


  export const isSameSender  = (messages,m,i,userId)=>{
    return(i<messages.length-1 && (messages[i+1].sender._id !== m.sender._id || messages[i+1].sender._id === undefined) 
    && messages[i].sender._id !== userId
  )
  }

  export const isLastMessage = (messages,i,userId)=>{
    return(i == messages.length-1 && messages[messages.length-1].sender._id !== userId
      && messages[messages.length-1].sender._id
    )
  }


  export const isSameSenderMargin = (messages,m,i,userId)=>{
    if(i<messages.length-1 &&
      messages[i+1].sender._id === m.sender._id && messages[i].sender._id !== userId

    )
    return 33
    else if((i<messages.length-1 &&
      messages[i+1].sender._id !== m.sender._id && messages[i].sender._id  !== userId
    ) ||
    (i== messages.length-1 && messages[i].sender._id !== userId)
  )
  return 0
  else return 'auto'
  }

  export const isSameUser = (messages,m,i)=>{
    return i> 0 && messages[i-1].sender._id == m.sender._id
  }

  export default getUserNameFn;
  