const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000

const moongose = require("mongoose")
const {MONGOURI} = require("./config/keys")

// const cors = require("cors")
// app.use(cors)

moongose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

moongose.connection.on("connected",()=>{
        console.log("Connected............")
})

moongose.connection.on("error",(err)=>{
    console.log("err",err)
})

require("./models/user")
require("./models/posts")

app.use(express.json()) // we want our server to give json maybe so this line?
app.use(require("./routes/auth"))
app.use(require("./routes/posts"))
app.use(require("./routes/user"))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    const path = require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}

app.listen(PORT,()=>{
    console.log("server running at ",PORT)    
})