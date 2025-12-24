// import { getDocs, collection }
// from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// const newsSnap = await getDocs(collection(db, "news"));
// newsSnap.forEach(n => {
//   document.getElementById("news").innerHTML += `
//     <li>
//       <a href="${n.data().link}" target="_blank">
//         ${n.data().title}
//       </a>
//     </li>
//   `;
// });


// public/js/news.js

import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const newsList = document.getElementById("news");

const snapshot = await getDocs(collection(db, "news"));


snapshot.forEach(doc => {
  const n = doc.data();
  newsList.innerHTML += `
    <li>
      <a href="${n.link}" target="_blank">${n.title}</a>
    </li>
  `;
});
