const express = require("express");
const router = express.Router();

const { generateRoadmap } = require("../services/aiService");
const { safeJSONParse } = require("../utils/jsonParser");

router.post("/generate-roadmap", async (req, res) => {
    try {
        const { career } = req.body;

        if (!career || career.length < 2) {
            return res.status(400).json({ error: "Invalid career input" });
        }

        const rawText = await generateRoadmap(career);

        const parsedData = safeJSONParse(rawText);

        res.json(parsedData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate roadmap" });
    }
});

module.exports = router;