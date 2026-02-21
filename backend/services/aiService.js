const axios = require("axios");

async function generateRoadmap(career) {
    if (!process.env.GROQ_API_KEY) {
        throw new Error("Missing GROQ_API_KEY in environment variables");
    }

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

    try {
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
    } catch (error) {
        const statusCode = error.response?.status;
        const providerMessage = error.response?.data?.error?.message;
        throw new Error(
            `AI provider error${statusCode ? ` (${statusCode})` : ""}${providerMessage ? `: ${providerMessage}` : ""}`
        );
    }
}

module.exports = { generateRoadmap };
