import React,{useEffect,useState,useContext} from 'react'
import {store} from "../../reducers/store"

const Profile = ()=>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(store)
    useEffect(()=>{
        fetch('/myposts',{
            headers : {
                "Authorization" : "Bearer "+ localStorage.getItem("jwt")  
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            setPics(result.myposts)
        })
    },[])
    return(
        <div style = {{maxWidth : "550px", margin : "0px auto"}}>
            <div style = {{
                display : "flex",
                justifyContent: "space-around",
                margin:"15px 0px",
                borderBottom : "2px solid grey"
            }}>
                <div style = {{margin : "30px"}}>
                    <img style = {{width:"180px",height:"180px",borderRadius:"90px"}}
                        src = {state ? state.photo : "loading"}></img>
                </div>
                <div style = {{margin : "30px"}}>
                    <h3>{state? state.name : "loading"}</h3>
                    <div style ={{
                        display :   "flex",
                        justifyContent : "space-between",
                        width: "130%"
                    }}>
                        <h5>{mypics.length} posts</h5>
                        <h5>{state ? state.followers.length : "loading"} followers</h5>
                        <h5>{state ? state.following.length : "loading"} following</h5>
                    </div>
                </div>
            </div>
            
            <div className = "gallery">
                {
                    mypics.map(item=>{
                        return(
                            <img key = {item._id} className = "item" src = {item.photo} alt = {item.title}></img>                            
                        )
                    })
                }
 
            </div>
        </div>
    )
}

export default Profile  