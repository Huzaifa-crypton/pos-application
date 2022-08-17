// import {applyMiddleware} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import reducer from "./reducers/reducers";
// import thunk from "redux-thunk"

const store = configureStore({
    reducer  })
export default store;