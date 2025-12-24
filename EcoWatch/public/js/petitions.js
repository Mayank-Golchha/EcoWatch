// import { addDoc, collection, serverTimestamp }
// from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// document.getElementById("petitionForm").onsubmit = async e => {
//   e.preventDefault();

//   await addDoc(collection(db, "petitions"), {
//     name: form.name.value || "Anonymous",
//     email: form.email.value || "",
//     location: form.location.value,
//     timestamp: serverTimestamp()
//   });

//   alert("Petition signed!");
// };





import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const form = document.getElementById("petitionForm");
const countEl = document.getElementById("petitionCount");

const ZONE_ID = "forest_zone_01"; // change per zone

// submit petition
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  await addDoc(collection(db, "petitions"), {
    zoneId: ZONE_ID,
    name: document.getElementById("pname").value || "Anonymous",
    email: document.getElementById("pemail").value || "",
    location: document.getElementById("plocation").value,
    timestamp: new Date()
  });

  alert("Petition signed successfully!");
  form.reset();
  loadCount();
});

// load petition count
async function loadCount() {
  const snap = await getDocs(collection(db, "petitions"));
  countEl.innerText = `Signatures: ${snap.size}`;
}

loadCount();
