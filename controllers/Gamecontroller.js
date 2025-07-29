const Game = require("../models/Game");
const path=require("path");
const fs=require("fs");

const creategame=async(req,res)=>{
    try {
      const {name,gameID,provider,category,keycode}=req.body;
      if(!name || !gameID || !provider || !category){
         return res.send({success:false,message:"All fileds are required!"})
      }
      const api_key=process.env.API_CODE;
      if(keycode!=api_key){
         return res.send({success:false,message:"Invalid Api Key!"})
      }
      const existname=await Game.findOne({name:name});
     if(existname){
         return res.send({success:false,message:"Game name already exist!"})
      }
      const creategame=new Game({
        name,
        gameID,
        provider,
        category,
        image:req.file.filename
      });

      if(!creategame){
          return res.send({success:false,message:"Something went wrong.please try again!"})
      }
      creategame.save();
      res.send({success:true,message:"Game Created SUccessfully!"})
    } catch (error) {
        console.log(error)
        console.log(error)
    }
}
// --------------------delete-game----------------------
const deletegame=async(req,res)=>{
    try {
        const game=await Game.findById({_id:req.params.id});
        if(!game){
           return res.send({success:false,message:"Game not found!"})
        }
        if(game.image){
            const filepath=Path2D.join(__dirname,"../public/uploads",game.image);
            fs.unlink(filepath,(err)=>{
                if(err){
                    console.log("file did not delete!")
                }
            })
        }
       await Game.findByIdAndDelete({_id:req.params.id});
       res.send({success:true,message:"Game deleted successfully!"})
    } catch (error) {
        console.log(error)
    }
}
// ------------------------slot-games----------------------------
const slotgames=async(req,res)=>{
    try {
    const {keycode}=req.body;
      const api_key=process.env.API_CODE;
    if(keycode!=api_key){
         return res.send({success:false,message:"Invalid Api Key!"})
      }
     const slotgame=await Game.find({category:"slot"});
     if(!slotgame){
         return res.send({success:false,message:"No Game Found!"})
     }
      res.send({success:true,slot:slotgame})
    } catch (error) {
        console.log(error)
    }
}
// ----------------------casino-games-------------------------
const casinogames=async(req,res)=>{
    try {
    const {keycode}=req.body;
    const api_key=process.env.API_CODE;
    if(keycode!=api_key){
         return res.send({success:false,message:"Invalid Api Key!"})
      }
     const casinogame=await Game.find({category:"casino"});
     if(!casinogame){
         return res.send({success:false,message:"No Game Found!"})
     }
      res.send({success:true,casino:casinogame})
    } catch (error) {
        console.log(error)
    }
}
// ----------------------------sports-game-------------------
const sportsgame=async(req,res)=>{
    try {
    const {keycode}=req.body;
    const api_key=process.env.API_CODE;
    if(keycode!=api_key){
         return res.send({success:false,message:"Invalid Api Key!"})
      }
     const sportsgame=await Game.find({category:"sports"});
     if(!sportsgame){
         return res.send({success:false,message:"No Game Found!"})
     }
      res.send({success:true,sports:sportsgame})
    } catch (error) {
        console.log(error)
    }
}
module.exports={creategame,slotgames,casinogames,sportsgame,deletegame}