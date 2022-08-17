import "./App.css";
import Login from "./components/LoginPages/Login.jsx";
import { BrowserRouter as Router, Route, Routes , Navigate } from "react-router-dom";
import NavBar from "./components/NavBar/Navbar"
import AddProduct from "./components/AddProduct/AddProduct";
import ViewProducts from "./components/ViewProducts/ViewProducts"
import * as actions from "./states/actionCreators/actions"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const user = useSelector(state => state.currentUser || null)
  
  const dispatch = useDispatch();
  const [currUser, setCurrUser] = useState(user);
  useEffect(() => {
    setCurrUser(user)
    // console.log(user)
  }, [user]);
  useEffect(()=>{
    // dispatch(actions.resetProductToBeEdited())
  } , [])
  return (
    <div className="App">
      {/* {(currUser === null || currUser[0] === null) ? <ViewProducts></ViewProducts>:   */}
      {(currUser === null || currUser[0] === null) ? <Login></Login>:  
      <>
      <NavBar></NavBar>
      <Routes>   
            <Route path = "/" element = {<ViewProducts viewOnly={user?.admin} isEditable = {user?.admin}></ViewProducts>}></Route>
            <Route path="/Store" element={<ViewProducts viewOnly={true}></ViewProducts>}></Route>
            <Route path="/Home" element={<ViewProducts viewOnly={true}></ViewProducts>}></Route>
            <Route path="/Store" element={<ViewProducts viewOnly={true}></ViewProducts>} />
            <Route path="/Add_Products" element={<AddProduct></AddProduct>}></Route>
            <Route path="/Edit_Products" element={<Navigate to="/" />}></Route>
            <Route path="/Edit_Product" element={<AddProduct></AddProduct>}></Route>
        </Routes>
        </>
      }
      {/* <AddProduct></AddProduct> */}
          
    </div>
  );
}

export default App;
