import express from "express";
import characters from "../models/characters.json" with { type: "json"};

const router = express.Router();

router.get("/",(req,res) => {
     res.status(200).json(characters);
});

router.post("/create", async (req,res) => {
    const character = req.body;

    try{
        if(!character.name || !character.realName || !character.universe){
            return res.status(400).json({
                Error : "Data of the missing charcter"
            });  
        }
        character.id = characters.length+1
        
         characters.push(character);
     
     res.status(201).json({
        message : "Character created successfully",
        character     
     });
    }
    catch (error) {
        res.status(500).json({
            error : "Error service"
        })
    }
});

router.get("/:id", async (req,res) => {

      try {
        const idCharacter = req.params.id;

        if (isNaN(idCharacter) || idCharacter <= 0) {
            return res.status(400).json({
                error: "Invalid character ID"
            });
        }
        const character = characters.find(char => char.id === idCharacter);

        res.status(200).json({
            character
        })

    }
    catch (error){
        res.status(500).json({
            error: "Error server"
        })
    }
})


router.put("/edit", async (req,res) =>{
   const character = req.body;
    try{

    }catch(error){

    }
})

router.delete("/delete", async (req,res)=>{
    const character = req.body
    try{

    }catch(error){

    }
})
export default router;