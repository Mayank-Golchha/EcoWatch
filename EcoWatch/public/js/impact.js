// public/js/impact.js

// ⚠️ YOUR VALID KEY GOES HERE
const apiKey = "AIzaSyArliZZahBCyhEejT_iljeNfpAyIeSNN9I";

export async function analyzeImpact(zone) {
    const displayElement = document.getElementById("impact");
    displayElement.innerHTML = "<em>🤖 AI is analyzing satellite data & reports...</em>";

    // Safety check for demo mode
    if (apiKey === "YOUR_GEMINI_API_KEY" || !apiKey) {
        setTimeout(() => {
            displayElement.innerHTML = `<strong>Demo Mode (No Key):</strong><br>Simulated analysis for ${zone.name}.`;
        }, 1000);
        return;
    }

    const prompt = `
  Act as an environmental scientist. Analyze:
  Hazard: ${zone.hazardType}
  Severity: ${zone.severity}
  Trees affected: ${zone.treesAffected}
  Species: ${zone.affectedSpecies ? zone.affectedSpecies.join(", ") : "Various"}

  Provide a concise HTML summary (no markdown blocks) with:
  1. Short-term impact (1-5 years)
  2. Long-term consequence (10+ years)
  3. One specific actionable solution.
  `;

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            }
        );

        const data = await response.json();

        if (data.error) throw new Error(data.error.message);

        const aiText = data.candidates[0].content.parts[0].text;
        displayElement.innerHTML = aiText;
    } catch (error) {
        console.error("AI Error:", error);
        displayElement.innerHTML = `<strong style="color:red">AI Error:</strong> ${error.message}`;
    }
}