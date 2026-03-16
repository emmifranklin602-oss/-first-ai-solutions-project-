const BACKEND = "https://7273f1c8-e032-40b0-b63c-639c80f4c2ed-00-338fuw19q86zl.riker.replit.dev/api/py";

// Health check function
async function checkBackend() {
    const res = await fetch(`${BACKEND}/health`);
    const data = await res.json();
    console.log("Backend status:", data.status);
}

// Fetch GitHub repo info
async function fetchRepoInfo() {
    const res = await fetch(`${BACKEND}/github/emmifranklin602-oss/-first-ai-solutions-project-`);
    const repo = await res.json();
    console.log("Repo Name:", repo.name);
    console.log("Language:", repo.language);
    console.log("Stars:", repo.stars);
}

// Call them on page load
checkBackend();
fetchRepoInfo();
