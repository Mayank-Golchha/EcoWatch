async function analyzeImpact(zone) {
  const prompt = `
  Analyze environmental impact for:
  Hazard: ${zone.hazardType}
  Severity: ${zone.severity}
  Trees affected: ${zone.treesAffected}
  Species: ${zone.affectedSpecies.join(", ")}

  Give:
  1-5 year impact
  10-30 year impact
  Human & biodiversity effects
  `;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_GEMINI_KEY",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await response.json();
  document.getElementById("impact").innerText =
    data.candidates[0].content.parts[0].text;
}
