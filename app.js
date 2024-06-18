const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcryptjs=require("bcryptjs")



const users=require ("./models/user")
const{userModel}=require("./models/user")

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://pachu123:pachu000@cluster0.bd7lkke.mongodb.net/blogappdb?retryWrites=true&w=majority&appName=Cluster0")

const generateHashedPassword=async(password)=>{
    const salt =await bcryptjs.genSalt(10)
    return bcryptjs.hash(password,salt)
}



app.post ("/signup",async(req,res)=>{
    let input =req.body
    //console.log(input)
    let hashedPassword=await generateHashedPassword(input.password)
    input.password=hashedPassword
    //console.log(hashedPassword)

    let user=new userModel(input)
    //console.log(user)
    user.save()
    res.json({"status":"success"})








app.listen(8080,()=>{
    console.log("server started")
})