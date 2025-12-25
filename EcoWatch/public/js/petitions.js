// public/js/petitions.js
import { getUser } from "./auth.js";

const PETITIONS_KEY = "ecowatch_petitions";

// DEFAULT DATA (Seeding only if local storage is empty)
const DEFAULT_PETITIONS = [
    {
        id: 1,
        title: "Stop Industrial Dumping in Emerald River",
        description: "Factory runoff is killing local fish species. We need stricter regulations immediately.",
        signatures: 1240,
        goal: 2000,
        signedBy: [], // Array of User IDs
        image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        title: "Save the Northern Forest Corridor",
        description: "Proposed highway construction will fragment critical elephant habitats.",
        signatures: 850,
        goal: 5000,
        signedBy: [],
        image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=500&q=60"
    }
];

// --- DOM ELEMENTS ---
const grid = document.getElementById("petition-grid");
const signModal = document.getElementById("sign-modal");
const createModal = document.getElementById("create-modal");
const openCreateBtn = document.getElementById("open-create-btn");

// --- 1. DATA MANAGEMENT ---

function loadPetitions() {
    const stored = localStorage.getItem(PETITIONS_KEY);
    if (stored) {
        return JSON.parse(stored);
    } else {
        // Seed initial data
        localStorage.setItem(PETITIONS_KEY, JSON.stringify(DEFAULT_PETITIONS));
        return DEFAULT_PETITIONS;
    }
}

function savePetitions(petitions) {
    localStorage.setItem(PETITIONS_KEY, JSON.stringify(petitions));
}

// --- 2. RENDER ---

function renderPetitions() {
    const petitions = loadPetitions();
    grid.innerHTML = "";

    petitions.forEach(p => {
        const percent = Math.min((p.signatures / p.goal) * 100, 100);

        const card = document.createElement("div");
        card.className = "petition-card";
        card.innerHTML = `
      <img src="${p.image}" alt="Petition Image" class="petition-img">
      <div class="petition-content">
        <h3>${p.title}</h3>
        <p class="petition-desc">${p.description}</p>
        
        <div class="progress-container">
          <div class="progress-bar" style="width: ${percent}%"></div>
        </div>
        <p class="petition-stats"><strong>${p.signatures.toLocaleString()}</strong> signatures of ${p.goal.toLocaleString()} goal</p>
        
        <button class="sign-btn" onclick="window.tryOpenSignModal(${p.id})">✍️ Sign Petition</button>
      </div>
    `;
        grid.appendChild(card);
    });
}

// --- 3. SIGNING LOGIC ---

let activePetitionId = null;

// Global wrapper for HTML onClick
window.tryOpenSignModal = (id) => {
    const user = getUser();
    const petitions = loadPetitions();
    const p = petitions.find(x => x.id === id);

    // Check 1: Is Logged In?
    if (!user) {
        alert("🔒 Please Log In or Sign Up to sign petitions.");
        document.getElementById("login-modal").classList.remove("hidden");
        return;
    }

    // Check 2: Already Signed?
    if (p.signedBy && p.signedBy.includes(user.id)) {
        alert("⚠️ You have already signed this petition!");
        return;
    }

    // Open Modal
    activePetitionId = id;
    document.getElementById("modal-title").innerText = p.title;
    signModal.classList.remove("hidden");
};

// Handle Confirm Sign
document.getElementById("confirm-sign-btn").addEventListener("click", () => {
    const user = getUser();
    let petitions = loadPetitions();
    const pIndex = petitions.findIndex(x => x.id === activePetitionId);

    if (pIndex !== -1) {
        // Update Data
        petitions[pIndex].signatures++;
        if (!petitions[pIndex].signedBy) petitions[pIndex].signedBy = [];
        petitions[pIndex].signedBy.push(user.id);

        // Save & Render
        savePetitions(petitions);
        renderPetitions();

        signModal.classList.add("hidden");
        alert(`✅ Successfully signed!`);
    }
});

// --- 4. CREATION LOGIC ---

openCreateBtn.addEventListener("click", () => {
    const user = getUser();
    if (!user) {
        alert("🔒 You must be logged in to start a petition.");
        document.getElementById("login-modal").classList.remove("hidden");
        return;
    }
    createModal.classList.remove("hidden");
});

document.getElementById("create-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("new-title").value;
    const desc = document.getElementById("new-desc").value;
    const user = getUser();

    const newPetition = {
        id: Date.now(),
        title: title,
        description: desc,
        signatures: 1, // Creator signs automatically
        goal: 1000,
        signedBy: [user.id],
        image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=500&q=60"
    };

    let petitions = loadPetitions();
    petitions.unshift(newPetition);
    savePetitions(petitions);

    renderPetitions();
    createModal.classList.add("hidden");
    e.target.reset();
    alert("🚀 Petition Created Successfully!");
});

// --- 5. SHARED MODAL CLOSING ---
document.querySelectorAll(".close-modal").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.target.closest(".modal").classList.add("hidden");
    });
});

// Init
renderPetitions();