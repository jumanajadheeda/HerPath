function safeJSONParse(text) {
    try {
        // Extract JSON between first { and last }
        const firstBrace = text.indexOf("{");
        const lastBrace = text.lastIndexOf("}");

        if (firstBrace === -1 || lastBrace === -1) {
            throw new Error("No JSON object found in AI response");
        }

        const jsonString = text.slice(firstBrace, lastBrace + 1);

        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Invalid JSON from AI:", text);
        throw new Error("AI returned invalid JSON");
    }
}

module.exports = { safeJSONParse };