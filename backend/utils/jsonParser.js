function safeJSONParse(text) {
    try {
        return JSON.parse(text);
    } catch (error) {
        console.error("Invalid JSON from AI:", text);
        throw new Error("AI returned invalid JSON");
    }
}

module.exports = { safeJSONParse };