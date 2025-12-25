// public/js/auth.js

// STORAGE KEYS
const USERS_KEY = "ecowatch_users";
const SESSION_KEY = "ecowatch_session";

// DOM ELEMENTS
const navLoginBtn = document.getElementById("nav-login-btn");
const navSignupBtn = document.getElementById("nav-signup-btn");
const userDisplay = document.getElementById("user-display");

const loginModal = document.getElementById("login-modal");
const signupModal = document.getElementById("signup-modal");

// --- 1. SESSION MANAGEMENT ---

export function getUser() {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
}

function initAuth() {
    const user = getUser();
    updateUI(user);
}

function updateUI(user) {
    if (user) {
        // Logged In State
        navLoginBtn.classList.add("hidden");
        if(navSignupBtn) navSignupBtn.classList.add("hidden");

        userDisplay.classList.remove("hidden");
        userDisplay.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <span class="user-avatar">${user.name.charAt(0).toUpperCase()}</span>
        <span style="font-weight:bold; color:white;">${user.name}</span>
        <button id="logout-btn" class="nav-btn" style="font-size:0.8em; padding: 4px 10px;">Logout</button>
      </div>
    `;

        document.getElementById("logout-btn").addEventListener("click", logout);
    } else {
        // Logged Out State
        navLoginBtn.classList.remove("hidden");
        if(navSignupBtn) navSignupBtn.classList.remove("hidden");
        userDisplay.classList.add("hidden");
    }
}

// --- 2. AUTH ACTIONS ---

export function login(email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const user = users.find(u => u.email === email);

    if (!user) {
        return { success: false, message: "User not found. Please sign up." };
    }

    if (user.password !== password) {
        return { success: false, message: "Incorrect password." };
    }

    // Success
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    updateUI(user);
    return { success: true };
}

export function signup(name, email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

    // Check if exists
    if (users.find(u => u.email === email)) {
        return { success: false, message: "Email already registered." };
    }

    const newUser = {
        id: "user_" + Date.now(),
        name,
        email,
        password, // Storing password locally for demo logic
        joined: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // Auto login after signup
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    updateUI(newUser);

    return { success: true };
}

export function logout() {
    localStorage.removeItem(SESSION_KEY);
    updateUI(null);
    window.location.reload();
}

// --- 3. EVENT LISTENERS ---

// Open Modals from Navbar
if (navLoginBtn) navLoginBtn.addEventListener("click", () => loginModal.classList.remove("hidden"));
if (navSignupBtn) navSignupBtn.addEventListener("click", () => signupModal.classList.remove("hidden"));

// Switch between Modals (The new feature)
const switchToSignup = document.getElementById("switch-to-signup");
const switchToLogin = document.getElementById("switch-to-login");

if (switchToSignup) {
    switchToSignup.addEventListener("click", (e) => {
        e.preventDefault();
        loginModal.classList.add("hidden");
        signupModal.classList.remove("hidden");
    });
}

if (switchToLogin) {
    switchToLogin.addEventListener("click", (e) => {
        e.preventDefault();
        signupModal.classList.add("hidden");
        loginModal.classList.remove("hidden");
    });
}

// Handle Login Submit
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value; // New Field

    const result = login(email, password);
    if (result.success) {
        loginModal.classList.add("hidden");
        e.target.reset();
    } else {
        alert(result.message);
    }
});

// Handle Signup Submit
document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value; // New Field

    const result = signup(name, email, password);
    if (result.success) {
        signupModal.classList.add("hidden");
        e.target.reset();
        alert("Welcome to EcoWatch, " + name + "!");
    } else {
        alert(result.message);
    }
});

// Init on load
initAuth();