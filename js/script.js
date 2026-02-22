let jobs = [
    { id:1, company:"Mobile First Corp", position:"Frontend Developer", location:"New York", type:"Full-time", salary:"$90,000 - $110,000", description:"Develop responsive web applications using modern JavaScript frameworks.", status:"not applied" },
    { id:2, company:"VertexIQ Agency", position:"UX Designer", location:"Los Angeles", type:"Full-time", salary:"$85,000 - $105,000", description:"Create intuitive user experiences for digital platforms. Work on mobile and web interfaces with research-backed design methods.", status:"not applied" },
    { id:3, company:"DataVista Solutions", position:"Data Analyst", location:"Chicago", type:"Full-time", salary:"$80,000 - $100,000", description:"Transform complex datasets into actionable business insights. Requires SQL & Excel, and strong statistical thinking.", status:"not applied" },
    { id:4, company:"CloudShift Inc", position:"Backend Engineer", location:"Austin", type:"Full-time", salary:"$110,000 - $140,000", description:"Build scalable APIs and manage server infrastructure. Strong Node.js and database design experience required.", status:"not applied" },
    { id:5, company:"Innovation Labs", position:"UI/UX Engineer", location:"Remote", type:"Contract", salary:"$70,000 - $90,000", description:"Create beautiful and functional interfaces for our SaaS platform. Experience with both frontend development and design required.", status:"not applied" },
    { id:6, company:"MegaCore Solutions", position:"Full Stack Developer", location:"Seattle", type:"Full-time", salary:"$95,000 - $130,000", description:"Develop scalable applications, collaborate with product teams to ship customer-oriented features using JavaScript and backend services.", status:"not applied" },
    { id:7, company:"StratoNEXT", position:"Machine Learning Engineer", location:"Remote", type:"Full-time", salary:"$120,000 - $160,000", description:"Design and deploy machine learning models using Python. Experience with AWS and large datasets strongly preferred.", status:"not applied" },
    { id:8, company:"TechCore Industries", position:"Senior Software Developer", location:"San Francisco", type:"Full-time", salary:"$130,000 - $155,000", description:"Work closely with cross-functional teams to build scalable web applications using React and TypeScript. We value clean code and strong ownership.", status:"not applied" }
];

let currentTab = "all";

function renderJobs() {
    const container = document.getElementById("jobContainer");
    const empty = document.getElementById("emptyMessage");
    container.innerHTML = "";

    let filtered = jobs.filter(job => {
        if (currentTab === "all") return true;
        return job.status === currentTab;
    });

    document.getElementById("tabCount").innerText = filtered.length + " jobs";

    if (filtered.length === 0) {
        empty.classList.remove("hidden");
    } else {
        empty.classList.add("hidden");

        filtered.forEach(job => {
            container.innerHTML += `
                <div class="job-card">
                    <button class="delete-btn" onclick="deleteJob(${job.id})">🗑</button>
                    <h3>${job.company}</h3>
                    <p>${job.position}</p>
                    <p>${job.location} - ${job.type} - ${job.salary}</p>
                    <div class="status">${job.status.toUpperCase()}</div>
                    <p>${job.description}</p>
                    <div class="buttons">
                        <button class="btn interview-btn" onclick="setStatus(${job.id}, 'interview')">Interview</button>
                        <button class="btn rejected-btn" onclick="setStatus(${job.id}, 'rejected')">Rejected</button>
                    </div>
                </div>
            `;
        });
    }

    updateDashboard();
}

function setStatus(id, status) {
    let job = jobs.find(j => j.id === id);

    if (job.status === status) {
        job.status = "not applied";
    } else {
        job.status = status;
    }

    renderJobs();
}

function deleteJob(id) {
    jobs = jobs.filter(job => job.id !== id);
    renderJobs();
}

function updateDashboard() {
    document.getElementById("totalCount").innerText = jobs.length;
    document.getElementById("interviewCount").innerText =
        jobs.filter(j => j.status === "interview").length;
    document.getElementById("rejectedCount").innerText =
        jobs.filter(j => j.status === "rejected").length;
}

function changeTab(e, tab) {
    currentTab = tab;

    document.querySelectorAll(".tab-btn")
        .forEach(btn => btn.classList.remove("active"));

    e.target.classList.add("active") ;

    renderJobs() ;
}

renderJobs() ;