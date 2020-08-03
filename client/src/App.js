import React,{useEffect, useContext} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter,Route,useHistory,Switch} from "react-router-dom";
import Home from "./components/screen/Home";
import Login from "./components/screen/Login";
import Profile from "./components/screen/Profile";
import Signup from "./components/screen/Signup";
import CreatePosts from "./components/screen/CreatePosts";
import {store,StateProvider} from "./reducers/store";
import UserProfile from "./components/screen/UserProfile";
import Followingposts from "./components/screen/Followingposts";

// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
const Routing = ()=>{
const history = useHistory()
const {state,dispatch}= useContext(store)

useEffect(()=>{
  const user = JSON.parse(localStorage.getItem("user"))

  if(user){
    dispatch({type:"USER",payload:user})
    // history.push('/')
  }else{
    history.push('/signup')
  }

},[])

return(
  <Switch>
    <Route exact path = '/'>
        <Home/>
      </Route>
      <Route path = '/signup'>
        <Signup/>
      </Route>
      <Route path = '/signin'>
        <Login/>
      </Route>
      <Route exact path = '/profile'>
        <Profile/>
      </Route>
      <Route path = '/create'>
        <CreatePosts/>
      </Route>
      <Route path = '/profile/:userid'>
        <UserProfile/>
      </Route>
      <Route path = '/myfollowingposts'>
        <Followingposts/>
      </Route>
  </Switch>
)
}

function App() {

  return (
    // <div style = 
    // {{height: "100%",
    // width: "100%"}} className = "container">
    <StateProvider>

    <BrowserRouter>
      <Navbar/>
      
        <Routing />
    </BrowserRouter>

    </StateProvider>
    // </div>
  );
}

export default App;
