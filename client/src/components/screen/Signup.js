import React,{useState, useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from "materialize-css"


const Signup = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)

    useEffect(()=>{
        if(url) sendData()
    },[url])

    const sendData = ()=>{
        console.log(url)
        fetch("/signup",{
            method : "post",
            headers :{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password ,
                email,
                url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes: 'rounded #d50000 red accent-4'})
            }else{
                
                M.toast({html: data.message, classes: 'rounded #1de9b6 teal accent-3'})
                history.push("/signin")
            }
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    const PostData = ()=>{
        


        if(!/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(email)){
            M.toast({html: "Invalid email", classes: 'rounded #d50000 red accent-4'})  
            return
        }
        if(image){

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
            
        }else{
            sendData()
        }
        
    }

    return(
        <div className = "mycard input-field">
            <div className="card  card-flip ">
                <h2>Infonet</h2>
                
                <input type= "text" 
                placeholder="name"
                value = {name}
                onChange = {(e)=>setName(e.target.value)}></input>

                <input 
                type= "text" 
                placeholder="email"
                value = {email}
                onChange = {(e)=>setEmail(e.target.value)}></input>

                <input type= "password" 
                placeholder="password"
                value = {password}
                onChange = {(e)=>setPassword(e.target.value)}></input>

                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Upload Profile Pic</span>
                        <input type="file" onChange = {(e)=>setImage(e.target.files[0])}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className="btn waves-effect #64b5f6 blue darken-1" 
                onClick = {()=>PostData()}>
                    Signup
                </button>
                <h5>
                    <Link to = "/signin">Already have an account ?</Link>
                </h5>
            </div>

        </div>
    )
}

export default Signup