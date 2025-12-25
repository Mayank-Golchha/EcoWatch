// public/js/qa.js

// ⚠️ YOUR VALID KEY GOES HERE
const GEMINI_API_KEY = "AIzaSyArliZZahBCyhEejT_iljeNfpAyIeSNN9I";

const qaForm = document.getElementById("qaForm");
const userQuestionInput = document.getElementById("userQuestion");
const responseBox = document.getElementById("qa-response");

qaForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const question = userQuestionInput.value.trim();
    if (!question) return;

    // 1. UI Loading State
    const btn = qaForm.querySelector("button");
    const originalBtnText = btn.innerText;

    btn.innerText = "Thinking...";
    btn.disabled = true;
    responseBox.classList.remove("hidden");
    responseBox.innerHTML = "<em>🤖 Consulting environmental database...</em>";

    // 2. Prepare Prompt
    const prompt = `
    Act as an expert Environmental Scientist. 
    Answer the following question accurately but concisely (max 3 sentences).
    
    User Question: "${question}"
  `;

    try {
        // 3. Call Gemini API
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            }
        )

        const data = await response.json();

        // Debugging: Check console if it fails again
        console.log("Gemini 2.0 Response:", data);

        if (data.error) throw new Error(data.error.message);

        if (data.candidates && data.candidates.length > 0) {
            const answer = data.candidates[0].content.parts[0].text;
            const formattedAnswer = answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            responseBox.innerHTML = `<strong>Answer:</strong><br>${formattedAnswer}`;
        } else {
            responseBox.innerText = "The AI returned an empty response.";
        }

    } catch (error) {
        console.error("AI Error:", error);
        responseBox.innerHTML = `<strong style="color: #b30000;">⚠️ Error:</strong> ${error.message}`;
    } finally {
        // 4. Reset UI
        btn.innerText = originalBtnText;
        btn.disabled = false;
        userQuestionInput.value = "";
    }
});