// // ================== CAREER DATA ==================
// const careers = {
//     "Software Engineer": {
//         "levels": [
//             { "title": "Intern", "salary": 150000, "years": "0-1 Years", "skills": ["HTML", "CSS", "JavaScript Basics", "Git", "DSA Basics"] },
//             { "title": "Junior Developer / SDE I", "salary": 800000, "years": "1-3 Years", "skills": ["JavaScript", "React or Backend Framework", "APIs", "Databases", "DSA"] },
//             { "title": "Senior Developer / SDE II", "salary": 1800000, "years": "4-7 Years", "skills": ["System Design", "Databases", "Scalability", "Cloud", "Testing", "Code Reviews"] },
//             { "title": "Lead Engineer / Staff Engineer", "salary": 2800000, "years": "7-10 Years", "skills": ["Architecture", "Distributed Systems", "Mentoring", "Performance Optimization"] }
//         ]
//     },
//     "Data Analyst": {
//         "levels": [
//             { "title": "Junior Data Analyst", "salary": 500000, "years": "0-2 Years", "skills": ["Excel", "SQL", "Python", "Data Visualization"] },
//             { "title": "Data Analyst", "salary": 1000000, "years": "2-5 Years", "skills": ["Advanced SQL", "Statistics", "Power BI/Tableau"] },
//             { "title": "Senior Data Analyst", "salary": 1800000, "years": "5-8 Years", "skills": ["Machine Learning Basics", "Business Analytics", "Strategy"] }
//         ]
//     },
//     "Lawyer": {
//         "levels": [
//             { "title": "Junior Associate", "salary": 400000, "years": "0-2 Years", "skills": ["Legal Research", "Drafting", "Court Procedures", "Communication"] },
//             { "title": "Associate Lawyer", "salary": 900000, "years": "2-5 Years", "skills": ["Litigation", "Client Handling", "Case Strategy", "Negotiation"] },
//             { "title": "Senior Lawyer", "salary": 1800000, "years": "5-10 Years", "skills": ["Court Representation", "Complex Case Handling", "Legal Advisory", "Team Leadership"] },
//             { "title": "Partner / Legal Head", "salary": 3000000, "years": "10+ Years", "skills": ["Firm Management", "High-Level Negotiation", "Business Law", "Strategic Decision Making"] }
//         ]
//     }
// };

// // ================== INDEX PAGE LOGIC ==================
// if (document.getElementById("nextBtn")) {

//     const nextBtn = document.getElementById("nextBtn");
//     const careerSelect = document.getElementById("careerSelect");

//     careerSelect.innerHTML = '<option value="">-- Select Career --</option>';

//     Object.keys(careers).forEach(career => {
//         const option = document.createElement("option");
//         option.value = career;
//         option.textContent = career;
//         careerSelect.appendChild(option);
//     });

//     if (document.getElementById("nextBtn")) {

//         const nextBtn = document.getElementById("nextBtn");
//         const careerSelect = document.getElementById("careerSelect");

//         // Only populate if dropdown has no dynamic values
//         if (careerSelect.options.length <= 1) {
//             Object.keys(careers).forEach(career => {
//                 const option = document.createElement("option");
//                 option.value = career;
//                 option.textContent = career;
//                 careerSelect.appendChild(option);
//             });
//         }

//         nextBtn.addEventListener("click", function () {
//             if (!careerSelect.value) {
//                 alert("Please select a career");
//                 return;
//             }

//             localStorage.setItem("selectedCareer", careerSelect.value);

//             if (careerSelect.value === "Software Engineer") {
//                 window.location.href = "se_rm.html";
//             }
//             else if (careerSelect.value === "Data Analyst") {
//                 window.location.href = "DA_roadmap.html";
//             }
//             else if (careerSelect.value === "Lawyer") {
//                 window.location.href = "lawyer-roadmap.html";
//             }
//         });
//     }
// }

// // ================== CAREER PAGE LOGIC ==================
// if (document.getElementById("careerTitle")) {

//     const selectedCareer = localStorage.getItem("selectedCareer");

//     if (!selectedCareer || !careers[selectedCareer]) {
//         document.body.innerHTML = "<h2>No career selected. Please go back.</h2>";
//         throw new Error("No career selected");
//     }

//     const title = document.getElementById("careerTitle");
//     const detailsDiv = document.getElementById("careerDetails");

//     title.innerText = selectedCareer;

//     const levels = careers[selectedCareer].levels;

//     // ================== ROADMAP VIEW ==================
//     const roadmapContainer = document.createElement("div");
//     roadmapContainer.className = "roadmap-container";

//     levels.forEach(level => {

//         const stage = document.createElement("div");
//         stage.className = "roadmap-stage";
//         stage.innerText = level.title;

//         stage.addEventListener("click", function () {
//             renderLevelDetails(level);
//         });

//         roadmapContainer.appendChild(stage);
//     });

//     detailsDiv.appendChild(roadmapContainer);

//     // Download Button
//     const downloadBtn = document.createElement("button");
//     downloadBtn.className = "download-btn";
//     downloadBtn.innerText = "Download Roadmap";

//     downloadBtn.addEventListener("click", function () {

//         const { jsPDF } = window.jspdf;
//         const doc = new jsPDF();

//         doc.text(`${selectedCareer} Career Roadmap`, 10, 10);

//         let y = 20;

//         levels.forEach(level => {
//             doc.text(level.title, 10, y);
//             y += 8;
//             doc.text(`Experience: ${level.years}`, 10, y);
//             y += 8;
//             doc.text(`Salary: ₹${(level.salary / 100000).toFixed(1)} LPA`, 10, y);
//             y += 8;
//             doc.text(`Skills: ${level.skills.join(", ")}`, 10, y);
//             y += 12;
//         });

//         doc.save(`${selectedCareer}_Roadmap.pdf`);
//     });

//     detailsDiv.appendChild(downloadBtn);

//     // ================== LEVEL DETAILS RENDER ==================
//     function renderLevelDetails(level) {

//         const existing = document.getElementById("levelDetailsSection");
//         if (existing) existing.remove();

//         const section = document.createElement("div");
//         section.id = "levelDetailsSection";
//         section.className = "level-card";

//         section.innerHTML = `
//             <h2>${level.title}</h2>
//             <p><strong>Salary (Per Annum):</strong> ₹${(level.salary / 100000).toFixed(1)} LPA</p>
//             <p><strong>Experience Required:</strong> ${level.years}</p>
//             <p><strong>Required Skills:</strong> ${level.skills.join(", ")}</p>
//             <hr>
//             <h3>Skill Gap Analyzer</h3>
//             <p>Enter your current skills (comma separated):</p>
//             <input type="text" id="userSkillsInput" placeholder="e.g., HTML, CSS">
//             <br><br>
//             <button id="analyzeBtn">Analyze</button>
//             <div id="analysisResult" style="margin-top:15px;"></div>
//         `;

//         detailsDiv.appendChild(section);

//         const analyzeBtn = document.getElementById("analyzeBtn");
//         const userSkillsInput = document.getElementById("userSkillsInput");

//         analyzeBtn.addEventListener("click", handleAnalysis);
//         userSkillsInput.addEventListener("keydown", function (event) {
//             if (event.key === "Enter") {
//                 event.preventDefault();
//                 handleAnalysis();
//             }
//         });

//         function handleAnalysis() {

//             const input = userSkillsInput.value;

//             if (!input) {
//                 alert("Please enter your skills.");
//                 return;
//             }

//             const userSkills = input.split(",").map(skill => skill.trim().toLowerCase());
//             const requiredSkills = level.skills.map(skill => skill.toLowerCase());

//             const missingSkills = requiredSkills.filter(skill =>
//                 !userSkills.includes(skill)
//             );

//             const matchedSkills = requiredSkills.length - missingSkills.length;
//             const readinessPercent = Math.round(
//                 (matchedSkills / requiredSkills.length) * 100
//             );

//             renderAnalysis(readinessPercent, missingSkills);
//         }

//         function renderAnalysis(readinessPercent, missingSkills) {

//             const resultDiv = document.getElementById("analysisResult");

//             let statusText = "";
//             let statusClass = "";

//             if (readinessPercent <= 40) {
//                 statusText = "Beginner";
//                 statusClass = "badge-beginner";
//             }
//             else if (readinessPercent <= 75) {
//                 statusText = "Growing";
//                 statusClass = "badge-growing";
//             }
//             else {
//                 statusText = "Ready";
//                 statusClass = "badge-ready";
//             }

//             resultDiv.innerHTML = `
//                 <div class="animated-result">
//                     <div class="status-badge ${statusClass}">
//                         ${statusText} (${readinessPercent}%)
//                     </div>
//                     <div class="progress-bar-container">
//                         <div class="progress-bar-fill" style="width: ${readinessPercent}%"></div>
//                     </div>
//                     <p style="margin-top:12px;"><strong>Missing Skills:</strong> 
//                     ${missingSkills.length > 0
//                     ? missingSkills.join(", ")
//                     : "None 🎉 You are fully ready!"
//                 }</p>
//                 </div>
//             `;
//         }
//     }
// }
// ================== CAREER DATA ==================

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
function goToRoadmap() {
    const career = document.getElementById("careerSelect").value;

    if (!career) {
        alert("Please select a career");
        return;
    }

    localStorage.setItem("selectedCareer", career);
    window.location.href = "roadmap.html";
}
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
async function generateRoadmap() {
    const career = document.getElementById("careerInput").value;

    try {
        const response = await fetch("http://localhost:5000/generate-roadmap", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ career })
        });

        const data = await response.json();

        console.log(data); // for debugging
        renderRoadmap(data);

    } catch (error) {
        console.error("Error fetching roadmap:", error);
    }
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

    title.innerText = selectedCareer;

    const levels = careers[selectedCareer].levels;

    // ================== ROADMAP STAGES ==================
    const roadmapContainer = document.createElement("div");
    roadmapContainer.className = "roadmap-container";

    levels.forEach(level => {

        const stage = document.createElement("div");
        stage.className = "roadmap-stage";
        stage.innerText = level.title;

        stage.addEventListener("click", function () {
            renderLevelDetails(level);
        });

        roadmapContainer.appendChild(stage);
    });

    detailsDiv.appendChild(roadmapContainer);

    // ================== GENERATE ROADMAP BUTTON ==================
    // ================== GENERATE ROADMAP BUTTON ==================
    const generateBtn = document.createElement("button");
    generateBtn.className = "download-btn";
    generateBtn.innerText = "Generate Roadmap";

    generateBtn.addEventListener("click", async function () {

        generateBtn.innerText = "Generating...";
        generateBtn.disabled = true;

        try {

            const response = await fetch("http://localhost:5000/generate-roadmap", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ career: selectedCareer })
            });

            const data = await response.json();

            // Remove old roadmap if exists
            const old = document.getElementById("aiRoadmap");
            if (old) old.remove();

            const roadmapContainer = document.createElement("div");
            roadmapContainer.id = "aiRoadmap";
            roadmapContainer.className = "roadmap-container";

            data.levels.forEach(level => {

                const stage = document.createElement("div");
                stage.className = "roadmap-stage";

                stage.innerHTML = `
                <h3>${level.title}</h3>
                <p><strong>Salary:</strong> ${level.salary_lpa} LPA</p>
                <p><strong>Experience:</strong> ${level.years}</p>
                <p><strong>Skills:</strong> ${level.skills.join(", ")}</p>
            `;

                roadmapContainer.appendChild(stage);
            });

            const wikiLink = document.createElement("a");
            wikiLink.href = data.wikipedia;
            wikiLink.target = "_blank";
            wikiLink.innerText = "Learn more on Wikipedia";
            wikiLink.style.display = "block";
            wikiLink.style.marginTop = "20px";

            detailsDiv.appendChild(roadmapContainer);
            detailsDiv.appendChild(wikiLink);

        } catch (error) {
            alert("AI generation failed");
        }

        generateBtn.innerText = "Generate Roadmap";
        generateBtn.disabled = false;
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
            <p><strong>Salary (Per Annum):</strong> ₹${(level.salary / 100000).toFixed(1)} LPA</p>
            <p><strong>Experience Required:</strong> ${level.years}</p>
            <p><strong>Required Skills:</strong> ${level.skills.join(", ")}</p>
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