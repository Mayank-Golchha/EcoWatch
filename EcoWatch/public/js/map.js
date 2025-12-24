// import { db } from "./firebase.js";
// import { collection, getDocs } from
// "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// const map = L.map("map").setView([28.6139, 77.2090], 11);

// // Free OpenStreetMap tiles
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution: "© OpenStreetMap"
// }).addTo(map);

// // Risk color scale
// function riskColor(severity) {
//   return severity > 8 ? "#7f0000" :
//          severity > 6 ? "#b30000" :
//          severity > 4 ? "#e34a33" :
//                         "#fc8d59";
// }

// // Load zones
// const zonesSnap = await getDocs(collection(db, "risk_zones"));

// zonesSnap.forEach(doc => {
//   const z = doc.data();

//   const circle = L.circle([z.lat, z.lng], {
//     radius: z.radius,
//     color: riskColor(z.severity),
//     fillColor: riskColor(z.severity),
//     fillOpacity: 0.6
//   }).addTo(map);

//   circle.bindPopup(`
//     <b>${z.name}</b><br/>
//     Hazard: ${z.hazardType}<br/>
//     Severity: ${z.severity}<br/>
//     Trees affected: ${z.treesAffected}<br/>
//     Species: ${z.affectedSpecies.join(", ")}<br/>
//     Policy: ${z.policyRef}
//   `);
// });








import { zones } from "./zones.js";

const map = L.map("map").setView([22.5, 79], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

function getColor(score) {
  return score >= 9 ? "#00441b" :
         score >= 7 ? "#238b45" :
         "#66c2a4";
}

zones.forEach(z => {
  const circle = L.circle([z.lat, z.lng], {
    radius: z.radius,
    color: getColor(z.importance),
    fillColor: getColor(z.importance),
    fillOpacity: 0.7
  }).addTo(map);

  circle.on("click", () => openZone(z));
});

function openZone(z) {
  document.getElementById("zone-panel").classList.remove("hidden");

  document.getElementById("zone-name").innerText = z.name;
  document.getElementById("zone-hazard").innerText = z.hazard;
  document.getElementById("zone-impact").innerText = z.impact;

  const species = document.getElementById("zone-species");
  species.innerHTML = "";
  z.species.forEach(s => species.innerHTML += `<li>${s}</li>`);

  const petitions = document.getElementById("zone-petitions");
  petitions.innerHTML = "";
  z.petitions.forEach(p =>
    petitions.innerHTML += `<p>${p.title} — ${p.count} signatures</p>`
  );

  const news = document.getElementById("zone-news");
  news.innerHTML = "";
  z.news.forEach(n =>
    news.innerHTML += `<li><a href="${n.link}">${n.title}</a></li>`
  );
}

document.getElementById("close-panel").addEventListener("click", () => {
  document.getElementById("zone-panel").classList.add("hidden");
});

