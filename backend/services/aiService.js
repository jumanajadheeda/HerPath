const axios = require("axios");

async function generateRoadmap(career) {
    const prompt = `
You are a career roadmap generator API.

Return ONLY valid JSON.
Do NOT include explanations.
Do NOT include markdown.
Do NOT include text outside JSON.

Format:

{
  "levels": [
    {
      "title": "string",
      "salary_lpa": "string",
      "years": "string",
      "skills": ["skill1", "skill2"]
    }
  ],
  "wikipedia": "short 2 sentence overview"
}

Generate a complete roadmap for: ${career}
`;

    const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );

    return response.data.choices[0].message.content;
}

module.exports = { generateRoadmap };