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
  
  export default getUserNameFn;
  