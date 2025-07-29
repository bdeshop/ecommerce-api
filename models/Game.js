const mongoose=require("mongoose");

const GameSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    gameID:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    provider:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
});

const Game=mongoose.model("Games",GameSchema);

module.exports=Game;