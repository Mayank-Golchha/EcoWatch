// public/js/news.js

// 1. Configuration
const API_KEY = "c37b4b32538a5d1ccce1a6742b9a0560"; // Get a free key from gnews.io for the demo
const API_URL = `https://gnews.io/api/v4/search?q=environment+OR+climate+change&lang=en&max=5&apikey=${API_KEY}`;

const newsList = document.getElementById("news");

// 2. Fetch Function
async function fetchNews() {
    try {
        // Attempt to fetch from the web
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("API Limit Reached or Error");
        }

        const data = await response.json();
        renderNews(data.articles);

    } catch (error) {
        console.warn("Could not fetch live news (likely CORS or Key invalid). Loading fallback data.");
        loadFallbackNews();
    }
}

// 3. Render Function (Real Data)
function renderNews(articles) {
    newsList.innerHTML = ""; // Clear loading text

    articles.forEach(article => {
        newsList.innerHTML += `
      <li>
        <a href="${article.url}" target="_blank">
          ${article.title}
        </a>
        <span class="news-source">Source: ${article.source.name} • ${new Date(article.publishedAt).toLocaleDateString()}</span>
      </li>
    `;
    });
}

// 4. Fallback Data (If API fails)
function loadFallbackNews() {
    const fallbackData = [
        {
            title: "COP29 Summit concludes with new emission targets",
            url: "https://www.un.org/climatechange",
            source: { name: "UN News" },
            publishedAt: new Date().toISOString()
        },
        {
            title: "Amazon Rainforest deforestation drops by 15% this year",
            url: "#",
            source: { name: "Reuters" },
            publishedAt: new Date().toISOString()
        },
        {
            title: "New AI technology helps track ocean plastic waste",
            url: "#",
            source: { name: "TechCrunch" },
            publishedAt: new Date().toISOString()
        },
        {
            title: "Study: Urban green zones significantly reduce heatwaves",
            url: "#",
            source: { name: "Science Daily" },
            publishedAt: new Date().toISOString()
        }
    ];

    renderNews(fallbackData);
}

// Initialize
fetchNews();