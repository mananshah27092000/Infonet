import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
// import {UserContext} from "../../App"
import {store} from "../../reducers/store"
import M from "materialize-css"

const Login = ()=>{
    const {state,dispatch} = useContext(store)
    const history = useHistory()
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")

    const PostData = ()=>{
        
        if(!/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(email)){
            M.toast({html: "Invalid email", classes: 'rounded #d50000 red accent-4'})  
            return
        }
        fetch("/signin",{
            method : "post",
            headers :{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password ,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error, classes: 'rounded #d50000 red accent-4'})
            }else{

                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))

                dispatch({type:"USER",payload:data.user})
                M.toast({html: "login successfull", classes: 'rounded #1de9b6 teal accent-3'})
                history.push("/")
            }
            
        })
        .catch(err=>{
            console.log(err)
        })

        console.log(state)
    }

    return(
        <div className = "mycard input-field">
            <div className="card  card-flip ">
                <h2>Infonet</h2>
                <input 
                type= "text" 
                placeholder="email"
                value = {email}
                onChange = {(e)=>setEmail(e.target.value)}
                ></input>

                <input type= "password" 
                placeholder="password"
                value = {password}
                onChange = {(e)=>setPassword(e.target.value)}></input>
                <button className="btn waves-effect #64b5f6 blue darken-1" 
                onClick = {()=>PostData()}>
                    login
                </button>
                <h5>
                    <Link to = "/signup">Create new account ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Login
