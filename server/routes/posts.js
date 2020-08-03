const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const requireLogin = require("../middleware/requireLogin")
const Post = mongoose.model("Post")

router.get('/allposts',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name photo")
    .populate("comments.postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.get('/followingposts',requireLogin,(req,res)=>{
    
    //if postedBy in following
    console.log(req.user.following)  
    Post.find({postedBy : {$in: req.user.following}}) // To get all posts by followings
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .then(posts=>{
        console.log(posts)
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body,url} = req.body
    if(!title ||!body||!url){
        return res.status(422).json({error:"please add all details"})
    }
    console.log(title,body,url)
    const post = new Post({
        title,
        body,
        photo:url,
        postedBy : req.user
    })

    post.save()
    .then(post=>{
        res.json({post})
    })
    .catch(err=>{
        console.log(err)
    })

})

router.get('/myposts',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(myposts=>{
        res.json({myposts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push : {likes: req.user._id}
    },{
        new : true
    })
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{

            // const newresult = result.populate("postedBy","_id name")
            // console.log(newresult)
            // .then(result=>{
            res.json(result)
            // })

        }
    })
})

router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull : {likes: req.user._id}
    },{
        new : true
    })
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            
            res.json(result)
        }
    })
})

router.put('/comment',requireLogin,(req,res)=>{
    const comment   = {
        text : req.body.text,
        postedBy : req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push : {comments: comment}
    },{
        new : true
    })
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")   
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id : req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            console.log("how")
            return res.status(422).json({error : err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result=>{
                res.json(result)
            }).catch(err=>{
                console.log(err)
            })
        }else{
            console.log("Manan Errrrr")
        }
    })
})

module.exports = router