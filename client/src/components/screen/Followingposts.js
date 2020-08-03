import React,{useState,useEffect,useContext} from 'react';
import {store} from "../../reducers/store"
import {Link} from "react-router-dom"

const Followingposts = ()=>{
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(store)
    useEffect(()=>{
        fetch('/followingposts',{
            headers : {
                "Authorization" : "Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result.posts)
            setData(result.posts)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const likePost = (id)=>{
        fetch('/like',{
            method : "put",
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : "Bearer "+ localStorage.getItem("jwt")
            },
            body : JSON.stringify({
                postId : id
            })
        }).then(result=>result.json())
        .then(result=>{
            // console.log(result)
            const newData = data.map(item=>{
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }
    const unlikePost = (id)=>{
        fetch('/unlike',{
            method : "put",
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : "Bearer "+ localStorage.getItem("jwt")
            },
            body : JSON.stringify({
                postId : id
            })
        }).then(result=>result.json())
        .then(result=>{
            // console.log(result)
            const newData = data.map(item=>{
                if(item._id == result._id){
                    
                    return result
                }else{
                    return item
                }
            })
            // console.log(ne)
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }
    const renderbutton = (item,id)=>{
        if(!item.likes.includes(state._id)){
            return(
                <i className="material-icons"
                onClick = {()=>likePost(item._id)}>
                    thumb_up</i>
            )
        }else{
            return(
                <i className="material-icons"
                style = {{color : "#2196f3"}}
                onClick = {()=>unlikePost(item._id)}>
                    thumb_up</i>
            )
        }
    }

    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method : "put",
            headers :{
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },
            body :JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id == result._id){
                    
                    return result
                }else{
                    return item
                }
            })
            setData(newData)

        }).catch(err=>{
            console.log(err)
        })
    }
    const deletePost =(postid)=>{
        fetch(`/deletepost/${postid}`,{
            method : "delete",
            headers : {
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData) 
        })
        .catch(err=>{
            console.log(err)
        })
    } 
    return(
        <div className = "home">
            
            {
                data.map(item=>{
                    return(
                        <div className = "card home-card" key ={item._id}>
                            <h4 style = {{padding : "8px"}}><Link to = {item.postedBy._id === state._id ? "/profile" :"/profile/"+item.postedBy._id}>{item.postedBy.name}</Link> 
                            {
                            item.postedBy._id == state._id && 
                            <i className="material-icons" style = {{float : "right"}}
                            onClick = {()=>deletePost(item._id)}>delete</i> 
                            } 
                            </h4>
                            <div className = "card-image">
                                <img src = {item.photo}></img>
                            </div>
                            <div className = "card-content" style = {{margin:"30px auto"}}>
                                <i className="material-icons" style = {{color : "red"}}>favorite</i>
            
                                {renderbutton(item)}
                               
                               
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(record=>{
                                        return (
                                            <div key = {record._id}>
                                                <h6><span style = {{fontWeight : "600px" ,fontSize : "25px"}}> {record.postedBy.name} </span>  {record.text}</h6>
                                            </div>
                                        )
                                    })

                                }
                                <form onSubmit = {(e)=>{
                                    e.preventDefault()
                                    // console.log(e.target[0].value)
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                    <input type = "text" placeholder = "add a comment" style={{maxWidth:"500px"}}></input>
                                </form>
                            </div>
                            {/* <h4>{item.postedBy.name}</h4> */}
                        </div>
                    )
                })
            }
            
            
        </div>
    )
}

export default Followingposts