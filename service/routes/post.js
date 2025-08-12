import express from "express";
import characters from "../models/characters.json" with { type: "json"};

const router = express.Router();

router.get("/",(req,res) => {
     res.json(characters);
});

router.post("/", async (req,res) => {
    const character = req.body;
    characters.push(character);
    res.json
});

export default router;