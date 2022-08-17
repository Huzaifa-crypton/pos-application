const userLoggedIn = (state=null , action) =>{
    switch (action.type){
        case "login_user":
            return state = action.payload
        case "logout_user":
            return state = null
        default:
            return state;
    }
}
export default userLoggedIn;