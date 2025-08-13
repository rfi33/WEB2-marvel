import express from "express";
import characters from "../models/characters.json" with { type: "json"};

const router = express.Router();

router.get("/",(req,res) => {
     res.status(200).json(characters);
});

router.post("/create", async (req,res) => {
    const character = req.body;

    try{
        if(character.name!==null || character.realName!==null || character.universe!==null){
            return res.status(400).json({
                Error : "Data of the missing charcter"
            });  
        }
        character.id = characters.length+1
        
         characters.push(character);
     
     res.status(201).json({
        message : "Character created successfully",
        character: character     
     });
    }
    catch (error) {
        res.status(500).json({
            error : "Charcter created error"
        })
    }
});

router.get("/searchId/:id", async (req,res) => {

    try{
        const idCharacter = (req.params.id);

        if(0<=idCharacter || idCharacter==undefined){
            res.status(400).json({
                error:"ID character not found"
            });
        }
        res.status(200).json({
            characters,
            message:"charcter found"
    })
    }
    catch (error){
        res.status(500).json({
            error: "Charcter not found"
        })
    }
})

export default router;