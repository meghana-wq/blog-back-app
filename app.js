const express=require("express")
const mongoose=require("mongoose")
const cors=require ("cors")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")



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


app.post("/signup",async(req,res)=>{
    let input=req.body
    // console.log(input)
    let hashedPassword=await generateHashedPassword(input.password)
    input.password=hashedPassword
    let user=new userModel(input)
    // console.log(user)

    user.save()
    res.json({"status":"success"})
})


app.post("/signin",(req,res)=>{
    let input =req.body
    userModel.find({"email":req.body.email}).then(
        (response)=>{
            if (response.length>0) {
                let dbpassword=response[0].password
                //console.log(dbpassword)
                bcryptjs.compare(input.password,dbpassword,(error,isMatch)=>{
                    
                   if (isMatch) {
                    jwt.sign({email:input},"blogapp",{expiresIn:"1d"},(error,token)=>{
                        if (error) {
                            res.json({"status":"uable to create token"})
                        } else {
                            res.json({"status":"suc","userid":response[0]._id,"token":token})
                        }
                    })
                   
                   } else {
                    res.json({"status":"incorresct pass"})
                   }
                })
            } else {
                res.json({"status":"usr not found"})
            }
            //console.log(response)
        }
    ).catch()

    //res.json({"status":"suc"})
})



app.listen(8080,()=>{
    console.log("server started")
})
