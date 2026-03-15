import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./utils/db.js"

import userRouter from "./routes/user.route.js"
import CompanyRouter from "./routes/company.route.js"
import JobRouter from "./routes/job.route.js"
import ApplicationRouter from "./routes/application.route.js"
import path from "path"


import dotenv from "dotenv"

dotenv.config()
const app = express()



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOptions = {

    origin:"http://localhost:5173",
    
    credentials:true
}

app.use(cors(corsOptions))

app.use("/api/v1/user",userRouter)
app.use("/api/v1/company",CompanyRouter)
app.use("/api/v1/job",JobRouter)
app.use("/api/v1/application",ApplicationRouter)


const __dirname = path.resolve()

app.use(express.static(path.join(__dirname,"Frontend/vite-project/dist")))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"Frontend/vite-project/dist/index.html"))
})



const port = process.env.PORT || 3000
app.listen(port,()=>
{   
    connectDB()
    console.log(`Listening at port : ${port}`)
})


