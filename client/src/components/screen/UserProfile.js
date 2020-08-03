import React,{useEffect,useState,useContext} from 'react'
import {store} from "../../reducers/store"
import {useParams} from "react-router-dom"

const UserProfile = ()=>{
    const [userProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(store)
    const {userid}  = useParams()

    const [showFollow,setShowFollow]  = useState(state ? !state.following.includes(userid) : true)
    // console.log(userid)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers : {
                "Authorization" : "Bearer "+ localStorage.getItem("jwt")  
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            // setPics(result.myposts)
            setProfile(result)
            // setShowFollow(!state.following.includes(userid))
        })
    },[])

    const followUser = ()=>{
        setShowFollow(false)
        fetch('/follow',{
            method : "put",
            headers :{
                "Content-Type" : "application/json",
                "Authorization" : "Bearer "+ localStorage.getItem("jwt")  
            },
            body : JSON.stringify({
                followId :userid 
            })
        }).then(res=>res.json())
        .then((result)=>{
            console.log(result)
            dispatch({type : "UPDATE",payload : {following : result.following,followers : result.followers} })
            localStorage.setItem("user",JSON.stringify(result))
            fetch(`/user/${userid}`,{
                headers : {
                    "Authorization" : "Bearer "+ localStorage.getItem("jwt")  
                }
            }).then(res=>res.json())
            .then(result=>{
                // console.log(result)
                // setPics(result.myposts)
                setProfile(result)
                
            })
        })
    }

    const unfollowUser = ()=>{
        setShowFollow(true)
        fetch('/unfollow',{
            method : "put",
            headers :{
                "Content-Type" : "application/json",
                "Authorization" : "Bearer "+ localStorage.getItem("jwt")  
            },
            body : JSON.stringify({
                unfollowId :userid 
            })
        }).then(res=>res.json())
        .then((result)=>{
            console.log(result)
            dispatch({type : "UPDATE",payload : {following : result.following,followers : result.followers} })
            localStorage.setItem("user",JSON.stringify(result))
            fetch(`/user/${userid}`,{
                headers : {
                    "Authorization" : "Bearer "+ localStorage.getItem("jwt")  
                }
            }).then(res=>res.json())
            .then(result=>{
                // console.log(result)
                // setPics(result.myposts)
                setProfile(result)
            })
        })
    }


    return(
        <>
        {userProfile ? 
        <div style = {{maxWidth : "550px", margin : "0px auto"}}>
            <div style = {{
                display : "flex",
                justifyContent: "space-around",
                margin:"15px 0px",
                borderBottom : "2px solid grey"
            }}>
                <div style = {{margin : "30px"}}>
                    <img style = {{width:"180px",height:"180px",borderRadius:"90px"}}
                        src = {userProfile.user.photo}></img>
                </div>
                <div style = {{margin : "30px"}}>
                    <h3>{userProfile.user.name}</h3>
                    <h4>{userProfile.user.email}</h4>

                    <div style ={{
                        display :   "flex",
                        justifyContent : "space-between",
                        width: "130%"
                    }}>
                        <h5>{userProfile.posts.length} posts</h5>
                        <h5>{userProfile.user.followers.length} followers</h5>
                        <h5>{userProfile.user.following.length} following</h5>
                    </div>
                    {showFollow ?
                    <button 
                    style = {{
                        margin : "10 px"
                    }} 
                    className="btn waves-effect #64b5f6 blue darken-1" 
                        onClick = {()=>followUser()}>
                            Follow User
                    </button>
                    :    
                    
                    <button 
                    style = {{
                        margin : "10 px"
                    }} 
                    className="btn waves-effect #64b5f6 blue darken-1" 
                        onClick = {()=>unfollowUser()}>
                            Unfollow User
                    </button>
                    }

                </div>
            </div>
            
            <div className = "gallery">
                {
                    userProfile.posts.map(item=>{
                        return(
                            <img key = {item._id} className = "item" src = {item.photo} alt = {item.title}></img>                            
                            )
                        })
                    }
 
            </div>
        </div>
        : <h2>Loading ....</h2>}
        
        </>
    )
}

export default UserProfile  