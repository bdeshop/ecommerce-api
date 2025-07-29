require("dotenv").config();
const express=require("express");
const connectdb = require("./config/db");
const router = require("./routes/route");
const app=express();
const Port=process.env.port || 4000;
const cors=require("cors");


app.use(cors({
    origin:[
        "http://localhost:5173",
        "https://thebethd.com",
    ],
    methods:["POST","GET","DELETE","PUT"],
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: true, 
    optionsSuccessStatus:200,
}))

app.use("/api/game",router);
app.use(express.static("public"))
connectdb();
app.get("/",(req,res)=>{
    try {
        res.send("Hello Server!!!!!!!!!!!!!!")
    } catch (error) {
        console.log(error)
    }
});

app.listen(Port,()=>{
    console.log(`Servr is running one ${Port}`)
})