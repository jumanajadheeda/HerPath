// // ================== CAREER DATA ==================
// const careers = {
//     "Software Engineer": {
//         "levels": [
//             {
//                 "title": "Intern",
//                 "salary": 150000,
//                 "years": "0-1 Years",
//                 "skills": ["HTML", "CSS", "JavaScript Basics", "Git", "DSA Basics"]
//             },
//             {
//                 "title": "Junior Developer / SDE I",
//                 "salary": 800000,
//                 "years": "1-3 Years",
//                 "skills": ["JavaScript", "React or Backend Framework", "APIs", "Databases", "DSA"]
//             },
//             {
//                 "title": "Senior Developer / SDE II",
//                 "salary": 1800000,
//                 "years": "4-7 Years",
//                 "skills": ["System Design", "Databases", "Scalability", "Cloud", "Testing", "Code Reviews"]
//             },
//             {
//                 "title": "Lead Engineer / Staff Engineer",
//                 "salary": 2800000,
//                 "years": "7-10 Years",
//                 "skills": ["Architecture", "Distributed Systems", "Mentoring", "Performance Optimization"]
//             }
//         ]
//     }
// };

// // ================== INDEX PAGE LOGIC ==================
// if (document.getElementById("nextBtn")) {

//     const nextBtn = document.getElementById("nextBtn");
//     const careerSelect = document.getElementById("careerSelect");

//     nextBtn.addEventListener("click", function () {

//         if (!careerSelect.value) {
//             alert("Please select a career");
//             return;
//         }

//         localStorage.setItem("selectedCareer", careerSelect.value);
//         window.location.href = "career.html";
//     });
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
//     const chartCanvas = document.getElementById("salaryChart");

//     title.innerText = selectedCareer;

//     const levels = careers[selectedCareer].levels;

//     // ===== CHECK IF SPECIFIC LEVEL IS REQUESTED =====
//     const params = new URLSearchParams(window.location.search);
//     const levelParam = params.get("level");

//     // ================== SALARY GRAPH ==================
//     if (chartCanvas) {
//         const labels = levels.map(level => level.title);
//         const salaries = levels.map(level => level.salary);

//         const ctx = chartCanvas.getContext("2d");

//         new Chart(ctx, {
//             type: "line",
//             data: {
//                 labels: labels,
//                 datasets: [{
//                     label: "Salary Growth (₹)",
//                     data: salaries,
//                     borderColor: "#6a0dad",
//                     backgroundColor: "rgba(106, 13, 173, 0.1)",
//                     borderWidth: 2,
//                     fill: true,
//                     tension: 0.3
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 scales: {
//                     y: {
//                         beginAtZero: true
//                     }
//                 }
//             }
//         });
//     }

//     // ================== IF SPECIFIC LEVEL PAGE ==================
//     if (levelParam) {

//         const level = levels.find(l => l.title === levelParam);

//         if (level) {

//             detailsDiv.innerHTML = `
//                 <div class="level-card">
//                     <h2>${level.title}</h2>
//                     <p><strong>Salary:</strong> ₹${level.salary.toLocaleString()}</p>
//                     <p><strong>Experience:</strong> ${level.years}</p>
//                     <p><strong>Required Skills:</strong> ${level.skills.join(", ")}</p>

//                     <hr>

//                     <h3>Skill Gap Analyzer</h3>
//                     <p>Enter your current skills (comma separated):</p>
//                     <input type="text" id="userSkillsInput" placeholder="e.g., HTML, CSS">
//                     <br><br>
//                     <button id="analyzeBtn">Analyze</button>

//                     <div id="analysisResult" style="margin-top:15px;"></div>

//                     <br><br>
//                     <button onclick="window.location.href='career.html'">
//                         ⬅ Back to Career Levels
//                     </button>
//                 </div>
//             `;

//             // ===== SKILL GAP LOGIC =====
//             const analyzeBtn = document.getElementById("analyzeBtn");

//             analyzeBtn.addEventListener("click", function () {

//                 const input = document.getElementById("userSkillsInput").value;

//                 if (!input) {
//                     alert("Please enter your skills.");
//                     return;
//                 }

//                 const userSkills = input
//                     .split(",")
//                     .map(skill => skill.trim().toLowerCase());

//                 const requiredSkills = level.skills
//                     .map(skill => skill.toLowerCase());

//                 const missingSkills = requiredSkills.filter(skill =>
//                     !userSkills.includes(skill)
//                 );

//                 const matchedSkills = requiredSkills.length - missingSkills.length;
//                 const readinessPercent = Math.round(
//                     (matchedSkills / requiredSkills.length) * 100
//                 );

//                 const resultDiv = document.getElementById("analysisResult");

//                 resultDiv.innerHTML = `
//                     <p><strong>Readiness Score:</strong> ${readinessPercent}%</p>
//                     <p><strong>Missing Skills:</strong> ${missingSkills.length > 0
//                         ? missingSkills.join(", ")
//                         : "None 🎉 You are fully ready!"
//                     }</p>
//                 `;
//             });
//         }

//     } else {

//         // ================== NORMAL CAREER PAGE ==================
//         levels.forEach(level => {

//             const card = document.createElement("div");
//             card.className = "level-card";

//             card.innerHTML = `
//                 <h3>${level.title}</h3>
//                 <p>Click to view full details</p>
//             `;

//             card.addEventListener("click", function () {
//                 const encodedLevel = encodeURIComponent(level.title);
//                 window.location.href = `career.html?level=${encodedLevel}`;
//             });

//             detailsDiv.appendChild(card);
//         });
//     }
// }

// ================== CAREER DATA ==================
const careers = {
    "Software Engineer": {
        "levels": [
            {
                "title": "Intern",
                "salary": 150000,
                "years": "0-1 Years",
                "skills": ["HTML", "CSS", "JavaScript Basics", "Git", "DSA Basics"]
            },
            {
                "title": "Junior Developer / SDE I",
                "salary": 800000,
                "years": "1-3 Years",
                "skills": ["JavaScript", "React or Backend Framework", "APIs", "Databases", "DSA"]
            },
            {
                "title": "Senior Developer / SDE II",
                "salary": 1800000,
                "years": "4-7 Years",
                "skills": ["System Design", "Databases", "Scalability", "Cloud", "Testing", "Code Reviews"]
            },
            {
                "title": "Lead Engineer / Staff Engineer",
                "salary": 2800000,
                "years": "7-10 Years",
                "skills": ["Architecture", "Distributed Systems", "Mentoring", "Performance Optimization"]
            }
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
    const chartCanvas = document.getElementById("salaryChart");

    title.innerText = selectedCareer;

    const levels = careers[selectedCareer].levels;

    // ===== CHECK IF SPECIFIC LEVEL IS REQUESTED =====
    const params = new URLSearchParams(window.location.search);
    const levelParam = params.get("level");

    // ================== SALARY GRAPH ==================
    if (chartCanvas) {
        const labels = levels.map(level => level.title);
        const salaries = levels.map(level => level.salary);

        const ctx = chartCanvas.getContext("2d");

        new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Salary Per Annum (₹)",
                    data: salaries,
                    borderColor: "#6a0dad",
                    backgroundColor: "rgba(106, 13, 173, 0.1)",
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // ================== IF SPECIFIC LEVEL PAGE ==================
    if (levelParam) {

        const level = levels.find(l => l.title === levelParam);

        if (level) {

            detailsDiv.innerHTML = `
                <div class="level-card">
                    <h2>${level.title}</h2>
                    <p><strong>Salary (Per Annum):</strong> ₹${level.salary.toLocaleString()}</p>
                    <p><strong>Experience Required:</strong> ${level.years}</p>
                    <p><strong>Required Skills:</strong> ${level.skills.join(", ")}</p>

                    <hr>

                    <h3>Skill Gap Analyzer</h3>
                    <p>Enter your current skills (comma separated):</p>
                    <input type="text" id="userSkillsInput" placeholder="e.g., HTML, CSS">
                    <br><br>
                    <button id="analyzeBtn">Analyze</button>

                    <div id="analysisResult" style="margin-top:15px;"></div>

                    <br><br>
                    <button onclick="window.location.href='career.html'">
                        ⬅ Back to Career Levels
                    </button>
                </div>
            `;

            // ===== SKILL GAP LOGIC =====
            const analyzeBtn = document.getElementById("analyzeBtn");

            analyzeBtn.addEventListener("click", function () {

                const input = document.getElementById("userSkillsInput").value;

                if (!input) {
                    alert("Please enter your skills.");
                    return;
                }

                const userSkills = input
                    .split(",")
                    .map(skill => skill.trim().toLowerCase());

                const requiredSkills = level.skills
                    .map(skill => skill.toLowerCase());

                const missingSkills = requiredSkills.filter(skill =>
                    !userSkills.includes(skill)
                );

                const matchedSkills = requiredSkills.length - missingSkills.length;
                const readinessPercent = Math.round(
                    (matchedSkills / requiredSkills.length) * 100
                );

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
    <div class="status-badge ${statusClass}">
        ${statusText} (${readinessPercent}%)
    </div>

    <div class="progress-bar-container">
        <div class="progress-bar-fill" style="width: ${readinessPercent}%"></div>
    </div>

    <p style="margin-top:10px;"><strong>Missing Skills:</strong> ${missingSkills.length > 0
                        ? missingSkills.join(", ")
                        : "None 🎉 You are fully ready!"
                    }</p>
`;
            });
        }

    } else {

        // ================== NORMAL CAREER PAGE ==================
        levels.forEach(level => {

            const card = document.createElement("div");
            card.className = "level-card level-list-card";

            card.innerHTML = `
                <h3>${level.title}</h3>
                <p>Click to view full details</p>
            `;

            card.addEventListener("click", function () {
                const encodedLevel = encodeURIComponent(level.title);
                window.location.href = `career.html?level=${encodedLevel}`;
            });

            detailsDiv.appendChild(card);
        });
    }
}