export default function reducer (state=[] , action ){
    console.log(action , state)
    switch(action.type){
        case "add_user":
            return[
                ...state,{
                    name:action.payload.name,
                    email:action.payload.email,
                    password:action.payload.password,
                    phone:action.payload.phone,
                    imgURL:action.payload.url || "Hello",
                    id:action.payload.id
                }
            ]           
            default:
                return state;
        }
        
}