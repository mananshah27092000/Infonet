import React,{useState,useEffect} from "react" 
import {useHistory} from 'react-router-dom'
import M from "materialize-css"

const CreatePost = ()=>{
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const history = useHistory()

    useEffect(()=>{
        if(url){
            fetch("/createpost",{
                method : "post",
                headers :{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+ localStorage.getItem("jwt") 
                },
                body:JSON.stringify({
                    title,
                    body,
                    url                
                })
                
            }).then(res=>res.json())
            .then(data=>{
                
                if(data.error){
                    M.toast({html: data.error, classes: 'rounded #d50000 red accent-4'})
                }else{
                    M.toast({html: "Post created successfully", classes: 'rounded #1de9b6 teal accent-3'})    
                    history.push("/")
                }
                
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },[url])
    
    const PostDetails = ()=>{
        const data = new FormData()
        if(!image){
            M.toast({html: "Add all feilds", classes: 'rounded #d50000 red accent-4'})
            return
        }
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","aimlessbot")
        
        fetch("https://api.cloudinary.com/v1_1/aimlessbot/image/upload",{
            method : "post",
            body : data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>console.log(err))
 
    }

    return(
        <div className = "card input-field" style ={{
            maxWidth : "500px",
            textAlign : "center",
            margin : "30px auto",
            padding : "30px"
        }}>
            <input 
            type = " text" 
            placeholder = "title"
            value = {title}
            onChange = {(e)=>setTitle(e.target.value)}/>
            <br></br><br></br>

            <input 
            type = " text" 
            placeholder = "body"
            value = {body}
            onChange = {(e)=>setBody(e.target.value)}/>
            <br></br><br></br>

            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange = {(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect #64b5f6 blue darken-1" 
            type="submit" 
            name="action"
            onClick = {()=>PostDetails()}>
                Submit post
            </button>     
        </div>
    )
}

export default CreatePost