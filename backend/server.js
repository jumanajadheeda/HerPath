const express = require("express");
const cors = require("cors");
const path = require("path");
const roadmapRoutes = require("./routes/roadmapRoutes");
require("dotenv").config();

const app = express();
const frontendPath = path.join(__dirname, "..");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});
app.use("/api", roadmapRoutes);

app.use(express.static(frontendPath));

app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
