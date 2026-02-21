const careers = {
    "Software Engineer": {
        "levels": [
            { "title": "Intern", "salary": 150000, "years": "0-1 Years", "skills": ["HTML", "CSS", "JavaScript Basics", "Git", "DSA Basics"] },
            { "title": "Junior Developer / SDE I", "salary": 800000, "years": "1-3 Years", "skills": ["JavaScript", "React or Backend Framework", "APIs", "Databases", "DSA"] },
            { "title": "Senior Developer / SDE II", "salary": 1800000, "years": "4-7 Years", "skills": ["System Design", "Databases", "Scalability", "Cloud", "Testing", "Code Reviews"] },
            { "title": "Lead Engineer / Staff Engineer", "salary": 2800000, "years": "7-10 Years", "skills": ["Architecture", "Distributed Systems", "Mentoring", "Performance Optimization"] }
        ]
    },
    "Data Analyst": {
        "levels": [
            { "title": "Junior Data Analyst", "salary": 500000, "years": "0-2 Years", "skills": ["Excel", "SQL", "Python", "Data Visualization"] },
            { "title": "Data Analyst", "salary": 1000000, "years": "2-5 Years", "skills": ["Advanced SQL", "Statistics", "Power BI/Tableau"] },
            { "title": "Senior Data Analyst", "salary": 1800000, "years": "5-8 Years", "skills": ["Machine Learning Basics", "Business Analytics", "Strategy"] }
        ]
    },
    "Lawyer": {
        "levels": [
            { "title": "Junior Associate", "salary": 400000, "years": "0-2 Years", "skills": ["Legal Research", "Drafting", "Court Procedures", "Communication"] },
            { "title": "Associate Lawyer", "salary": 900000, "years": "2-5 Years", "skills": ["Litigation", "Client Handling", "Case Strategy", "Negotiation"] },
            { "title": "Senior Lawyer", "salary": 1800000, "years": "5-10 Years", "skills": ["Court Representation", "Complex Case Handling", "Legal Advisory", "Team Leadership"] },
            { "title": "Partner / Legal Head", "salary": 3000000, "years": "10+ Years", "skills": ["Firm Management", "High-Level Negotiation", "Business Law", "Strategic Decision Making"] }
        ]
    }
};

// ================== INDEX PAGE LOGIC ==================
if (document.getElementById("nextBtn")) {

    const nextBtn = document.getElementById("nextBtn");
    const careerSelect = document.getElementById("careerSelect");

    nextBtn.addEventListener("click", function () {

        if (!careerSelect.value) {
            alert("Please select a career");
            return;
        }

        localStorage.setItem("selectedCareer", careerSelect.value);

        // ✅ OLD WORKING SYSTEM
        window.location.href = "career.html";
    });
}

// ================== CAREER PAGE LOGIC ==================
if (document.getElementById("careerTitle")) {

    const selectedCareer = localStorage.getItem("selectedCareer");

    if (!selectedCareer || !careers[selectedCareer]) {
        document.body.innerHTML = "<h2>No career selected. Please go back.</h2>";
        throw new Error("No career selected");
    }

    const title = document.getElementById("careerTitle");
    const detailsDiv = document.getElementById("careerDetails");
    const isFileProtocol = window.location.protocol === "file:";
    const isGitHubPages = window.location.hostname.endsWith("github.io");

    function normalizeApiBaseUrl(baseUrl) {
        const cleanBaseUrl = (baseUrl || "").replace(/\/$/, "");
        return cleanBaseUrl;
    }

    const defaultApiBaseUrl =
        window.location.hostname === "localhost"
            ? "http://localhost:5000"
            : "https://herpath.onrender.com";
    const apiBaseUrl = configuredApiBaseUrl
        ? normalizeApiBaseUrl(configuredApiBaseUrl)
        : defaultApiBaseUrl;

    if (isGitHubPages && !configuredApiBaseUrl) {
        console.warn("GitHub Pages detected with no configured backend URL. Set window.HERPATH_API_BASE_URL, meta[name='herpath-api-base-url'], or localStorage.herpathApiBaseUrl.");
    }

    title.innerText = selectedCareer;

    let levels = careers[selectedCareer].levels.map(normalizeLevel);

    // ================== ROADMAP STAGES ==================
    const roadmapContainer = document.createElement("div");
    roadmapContainer.className = "roadmap-container";

    detailsDiv.appendChild(roadmapContainer);
    renderRoadmapStages(levels);

    function normalizeLevel(level) {
        return {
            title: level.title || "Untitled Level",
            salary: level.salary ?? level.salary_lpa ?? "N/A",
            years: level.years || "Not specified",
            skills: Array.isArray(level.skills) ? level.skills : []
        };
    }

    function formatSalaryToLpa(salaryValue) {
        if (typeof salaryValue === "number") {
            return `₹${(salaryValue / 100000).toFixed(1)} LPA`;
        }

        return salaryValue || "N/A";
    }

    function renderRoadmapStages(roadmapLevels) {
        roadmapContainer.innerHTML = "";

        roadmapLevels.forEach(level => {
            const stage = document.createElement("div");
            stage.className = "roadmap-stage";
            stage.innerText = level.title;

            stage.addEventListener("click", function () {
                renderLevelDetails(level);
            });

            roadmapContainer.appendChild(stage);
        });
    }
    // somethimg newww add at 21.17 21/02/26
    function renderVisualRoadmap(levels) {

        const roadmapSection = document.createElement("div");
        roadmapSection.className = "roadmap-visual";

        roadmapSection.innerHTML = `
        <h2 style="margin-top:40px;">${selectedCareer} Career Roadmap</h2>
        <div class="roadmap-line"></div>
        <div class="roadmap-flow">
            ${levels.map(level => `
                <div class="roadmap-node">
                    <div class="roadmap-title">${level.title}</div>
                    <div class="roadmap-skills">
                        ${level.skills.map(skill => `
                            <div class="skill-box">${skill}</div>
                        `).join("")}
                    </div>
                </div>
            `).join("")}
        </div>
    `;

        detailsDiv.appendChild(roadmapSection);
    }

    // ================== GENERATE ROADMAP BUTTON ==================
    const generateBtn = document.createElement("button");
    generateBtn.className = "download-btn";
    generateBtn.innerText = "Generate Roadmap";

    generateBtn.addEventListener("click", async function () {
        generateBtn.disabled = true;
        generateBtn.innerText = "Generating...";

        try {
            const response = await fetch(`${apiBaseUrl}/generate-roadmap`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ career: selectedCareer })
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.error || "Failed to generate roadmap");
            }

            if (!Array.isArray(responseData.levels) || responseData.levels.length === 0) {
                throw new Error("Roadmap data is empty");
            }

            levels = responseData.levels.map(normalizeLevel);

            // Remove old visual if exists
            const oldVisual = document.querySelector(".roadmap-visual");
            if (oldVisual) oldVisual.remove();

            renderVisualRoadmap(levels);

            const existingOverview = document.getElementById("careerOverview");
            if (existingOverview) {
                existingOverview.remove();
            }

            if (responseData.wikipedia) {
                const overviewSection = document.createElement("div");
                overviewSection.id = "careerOverview";
                overviewSection.className = "level-card";
                overviewSection.innerHTML = `
                    <h3>Career Overview</h3>
                    <p>${responseData.wikipedia}</p>
                `;

                detailsDiv.appendChild(overviewSection);
            }
        } catch (error) {
            alert(error.message || "Something went wrong while generating roadmap");
        } finally {
            generateBtn.disabled = false;
            generateBtn.innerText = "Generate Roadmap";
        }
    });

    detailsDiv.appendChild(generateBtn);
    // const generateBtn = document.createElement("button");
    // generateBtn.className = "download-btn";
    // generateBtn.innerText = "Generate Roadmap";

    // generateBtn.addEventListener("click", function () {

    //     const existing = document.getElementById("generatedRoadmap");
    //     if (existing) {
    //         existing.remove();
    //         return;
    //     }

    //     const roadmapSection = document.createElement("div");
    //     roadmapSection.id = "generatedRoadmap";
    //     roadmapSection.className = "roadmap-visual";

    //     roadmapSection.innerHTML = `
    //         <h2 style="margin-top:40px;">Career Roadmap</h2>
    //         <div class="roadmap-line"></div>
    //         <div class="roadmap-flow">
    //             ${levels.map(level => `
    //                 <div class="roadmap-node">
    //                     <h3>${level.title}</h3>
    //                     <p>${level.skills.join(", ")}</p>
    //                 </div>
    //             `).join("")}
    //         </div>
    //     `;

    //     detailsDiv.appendChild(roadmapSection);
    // });

    // detailsDiv.appendChild(generateBtn);

    // ================== LEVEL DETAILS ==================
    function renderLevelDetails(level) {

        const existing = document.getElementById("levelDetailsSection");
        if (existing) existing.remove();

        const section = document.createElement("div");
        section.id = "levelDetailsSection";
        section.className = "level-card";

        section.innerHTML = `
            <h2>${level.title}</h2>
            <p><strong>Salary (Per Annum):</strong> ${formatSalaryToLpa(level.salary)}</p>
            <p><strong>Experience Required:</strong> ${level.years}</p>
            <p><strong>Required Skills:</strong> ${level.skills.length > 0 ? level.skills.join(", ") : "N/A"}</p>
            <hr>
            <h3>Skill Gap Analyzer</h3>
            <p>Enter your current skills (comma separated):</p>
            <input type="text" id="userSkillsInput" placeholder="e.g., HTML, CSS">
            <br><br>
            <button id="analyzeBtn">Analyze</button>
            <div id="analysisResult" style="margin-top:15px;"></div>
        `;

        detailsDiv.appendChild(section);

        const analyzeBtn = document.getElementById("analyzeBtn");
        const userSkillsInput = document.getElementById("userSkillsInput");

        analyzeBtn.addEventListener("click", handleAnalysis);
        userSkillsInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                handleAnalysis();
            }
        });

        function handleAnalysis() {

            const input = userSkillsInput.value;

            if (!input) {
                alert("Please enter your skills.");
                return;
            }

            const userSkills = input.split(",").map(skill => skill.trim().toLowerCase());
            const requiredSkills = level.skills.map(skill => skill.toLowerCase());

            if (requiredSkills.length === 0) {
                alert("Required skills are not available for this level.");
                return;
            }

            const missingSkills = requiredSkills.filter(skill =>
                !userSkills.includes(skill)
            );

            const matchedSkills = requiredSkills.length - missingSkills.length;
            const readinessPercent = Math.round(
                (matchedSkills / requiredSkills.length) * 100
            );

            renderAnalysis(readinessPercent, missingSkills);
        }

        function renderAnalysis(readinessPercent, missingSkills) {

            const resultDiv = document.getElementById("analysisResult");

            let statusText = "";
            let statusClass = "";

            if (readinessPercent <= 40) {
                statusText = "Beginner";
                statusClass = "badge-beginner";
            }
            else if (readinessPercent <= 75) {
                statusText = "Growing";
                statusClass = "badge-growing";
            }
            else {
                statusText = "Ready";
                statusClass = "badge-ready";
            }

            resultDiv.innerHTML = `
                <div class="animated-result">
                    <div class="status-badge ${statusClass}">
                        ${statusText} (${readinessPercent}%)
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" style="width: ${readinessPercent}%"></div>
                    </div>
                    <p style="margin-top:12px;"><strong>Missing Skills:</strong> 
                    ${missingSkills.length > 0
                    ? missingSkills.join(", ")
                    : "None 🎉 You are fully ready!"
                }</p>
                </div>
            `;
        }
    }
} 