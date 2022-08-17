export const addUser = (user)=>{
    return (dispatch) =>{
        dispatch({
            type:"add_user",
            payload:{
                name:user.name,
                email:user.email,
                password:user.password,
                phone:user.phone
            }
        })
    }
}
export const loginUser = (user)=>{
    return (dispatch) =>{

        dispatch({
            type:"login_user",
            payload:{
                id:user._id,
                name:user.name,
                url:user.url || "",
                email:user.email,
                password:user.password,
                phone:user.phone,
                admin:user.admin || false

            }
        })
    }
}
export const logoutUser = (user)=>{
    return (dispatch) =>{
        dispatch({
            type:"logout_user",
            payload:null
        })
    }
}

export const productToBeEdited = (product)=>{
    return (dispatch) =>{
        dispatch({
            type:"product_to_be_edited",
            payload:product
        })
    }
}
export const resetProductToBeEdited = ()=>{
    return (dispatch) =>{
        dispatch({
            type:"reset_product_to_be_updated",
            payload:{}
        })
    }
}