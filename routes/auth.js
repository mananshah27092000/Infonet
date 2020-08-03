const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {JWT_SECERT} = require("../config/keys")
const requireLogin = require("../middleware/requireLogin")

//For testing router
// router.get('/',(req,res)=>{
//     res.send("router is working properly and i am typing properly and at a good speed and  not finding much trouble but x sucks me")
// })

//For middlewarecheck
// router.get('/protected',requireLogin,(req,res)=>{
//     res.send("protected")
// })

router.post('/signup',(req,res,next)=>{

    console.log(req.body.name) // to get body from frontend

    const {name,email,password,url} = req.body //destructuring
    
    if(!email||!password||!name){
        
        res.status(422).json({error:"please add all details"})
        //what happens if we return here????

    }

    // res.json({message : " you are logged in"})

    User.findOne({email : email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error : "User already exists with that email"})   
        }
        
        bcrypt.hash(password,15)
        .then((hashpass)=>{
            const user = new User({
                name,
                email,
                password : hashpass,
                photo : url
            })
            
            user.save()
            .then(user=>{
                res.json({message : "Saved Succsfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    })
    .catch(err=>{
        console.log(err)
    })
})


router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"please fill all details"})
    }
    User.findOne({email:email})
    .then((currentUser)=>{
        if(!currentUser){
            return res.status(422).json({error:"email or password is incorrect"})
        }
        bcrypt.compare(password,currentUser.password)
        .then(match=>{
            if(match){
                // res.json({message : "signed in successfully"})   
                const token = jwt.sign({_id: currentUser._id},JWT_SECERT)
                const {_id,name,email,followers,following,photo} = currentUser
                res.json({token,user:{_id,name,email,followers,following,photo}})

            }else{
                return res.status(422).json({error:"email or password is incorrect"})
            }
        })  

    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router