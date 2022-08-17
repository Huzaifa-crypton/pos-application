import {combineReducers} from "redux";
import userReducer from "./userReducer"
import loggedInReducer from "./loggedInReducer";
import productToBeEdited  from "./editableProduct";

const reducers = combineReducers(
    {
        user:userReducer,
        currentUser:loggedInReducer
        ,editableProduct:productToBeEdited 
    }
)


export default reducers;