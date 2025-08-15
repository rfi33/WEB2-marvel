import express from "express";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonFilePath = path.join(__dirname, "../models/characters.json");

const router = express.Router();

const readCharactersFile = async () => {
    try {
        const data = await fs.readFile(jsonFilePath,'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Read file error",error);
        return {characters:[]};
    }
};

const writeCharactersFile = async (data) => {
    try{
        await fs.writeFile(jsonFilePath,JSON.stringify(data,null,2),'utf8');
    }catch(error){
        console.error('Write file error',error);
        return false;

    }
};

const charactersData =await readCharactersFile();

router.get("/",(req,res) => {
     res.status(200).json(charactersData);
});

router.post("/create", async (req,res) => {
    const character = req.body;
    try{
        if(!character.name || !character.realName || !character.universe){
            return res.status(400).json({
                Error : "Data of the missing charcter"
            });  
        }

        if(isNaN(character.id) || charactersData.characters.find(char => char.id === character.id)){
        const maxId = charactersData.characters.reduce((max, char) => Math.max(max, char.id), 0);
        character.id = maxId + 1;
        }
        
       charactersData.characters.push(character);
       await writeCharactersFile(charactersData);

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

router.get("/:id", (req,res) => {

      try {
        const idCharacter = parseInt(req.params.id);

        if (isNaN(idCharacter) || idCharacter <= 0) {
            return res.status(400).json({
                error: "Invalid character ID"
            });
        }
        const character = charactersData.characters.find(char => char.id === idCharacter);

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

router.put("/edit/:id", async (req, res) => {
    try {
        const idCharacter = parseInt(req.params.id);
        const updatedData = req.body;

        if (isNaN(idCharacter) || idCharacter <= 0 || charactersData.characters.findIndex(char => char.id === idCharacter) > 0) {
            return res.status(400).json({
                error: "ID de caractère invalide"
            });
        }

        const characterIndex = charactersData.characters.findIndex(char => char.id === idCharacter);


        if (updatedData.name) charactersData.characters[characterIndex].name = updatedData.name;
        if (updatedData.realName) charactersData.characters[characterIndex].realName = updatedData.realName;
        if (updatedData.universe) charactersData.characters[characterIndex].universe = updatedData.universe;

        res.status(200).json({
            message: "Caractère modifié avec succès",
            character: charactersData.characters[characterIndex]
        });
               await writeCharactersFile(charactersData);

    } catch (error) {
        res.status(500).json({
            error: "Erreur serveur"
        });
    }
});


router.delete("/delete/:id", async (req,res)=>
    {
    try{
        const idCharacter = parseInt(req.params.id);
        if(isNaN(idCharacter) || idCharacter <=0 ){
            res.status(400).json({
                error:"ID not found"
            })
        }

        const characterIndex = charactersData.characters.findIndex(char => char.id === idCharacter);
if (characterIndex > 0 ) {
    const deletedCharacter = charactersData.characters.splice(characterIndex, 1);
    res.status(200).json({ message: "Character deleted", character: deletedCharacter });
} else {
    res.status(400).json({ error: "ID not found" });
}
            await writeCharactersFile(charactersData);

        res.status(200).json({
            message:"Character :"+idCharacter+"deleted",
            character: deletedCharacter
        })

    }catch(error){
res.status(500).json({
    error:"Error server"
})
    }
})
export default router;