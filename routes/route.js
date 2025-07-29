const express=require("express");
const Game = require("../models/Game");
const router=express.Router();
const multer=require("multer");
const { creategame, slotgames, casinogames, sportsgame, deletegame } = require("../controllers/Gamecontroller");


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/uploads")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }
});
const uplaod=multer({storage:storage});

router.post("/create-game",uplaod.single("image"),creategame);
// --------------------delete-game---------------------------
router.delete("/delete-game/:id",deletegame);
// ---------------------slot-games-------------------------------
router.get("/slot-game",slotgames);
// ---------------------slot-games-------------------------------
router.get("/casino-game",casinogames);
// ---------------------casino-games-------------------------------
router.get("/sports-game",sportsgame);
module.exports=router;