import React,{useContext} from 'react'
import { Link,useHistory } from "react-router-dom";
import {store} from '../reducers/store';

const Navbar = ()=>{

  const {state,dispatch} = useContext(store)
  const history = useHistory()
  const renderList = ()=>{
    if(state){
      return[

        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create Posts</Link></li>,
        <li><Link to="/myfollowingposts">My Following Posts</Link></li>,
        <li>
        <button className="btn waves-effect waves-light red" 
          onClick = {()=>{
            localStorage.clear()
            dispatch({type : "CLEAR"})
            history.push('/signin')
          }}>
          logout
        </button>
        </li>
      ]
    }else{
      return[
        <li><Link to="/signin">Login</Link></li>,
        <li><Link to="/signup">SignUp</Link></li>
      ]
    }
  }

  return(
    <div>
  <nav className="nav-extended extended-change">
    <div className="nav-wrapper wrapper-change white">
        <div className= "logo-change">
            <Link to={state?"/":"/signin"} className="brand-logo logo-change1">Infonet</Link>
        </div>
      <Link to="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderList()}
      </ul>
    </div>
  </nav>

  <ul className="sidenav" id="mobile-demo">
    {renderList()}
  </ul>
</div>    
    )
}

export default Navbar