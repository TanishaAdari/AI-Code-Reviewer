// DOM Elements

const code = document.getElementById("code");
const language = document.getElementById("language");

const reviewBtn = document.getElementById("reviewBtn");
const clearBtn = document.getElementById("clearBtn");
const themeBtn = document.getElementById("themeBtn");

const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");

const historyBtn = document.getElementById("historyBtn");
const historyPanel = document.getElementById("historyPanel");
const historyOverlay = document.getElementById("historyOverlay");
const closeHistory = document.getElementById("closeHistory");
const historyList = document.getElementById("historyList");

const loading = document.getElementById("loading");
const reviewSection = document.getElementById("reviewSection");

const progressWrapper = document.getElementById("progressWrapper");
const progressFill = document.getElementById("progressFill");
const progressLabel = document.getElementById("progressLabel");

const bugCard = document.getElementById("bugCard");
const suggestionCard = document.getElementById("suggestionCard");
const securityCard = document.getElementById("securityCard");
const codeCard = document.getElementById("codeCard");

const score = document.getElementById("score");
const bugs = document.getElementById("bugs");
const suggestions = document.getElementById("suggestions");
const security = document.getElementById("security");
const improvedCode = document.getElementById("improvedCode");

const charCount = document.getElementById("charCount");

const bugCount = document.getElementById("bugCount");
const suggestionCount = document.getElementById("suggestionCount");
const securityStatus = document.getElementById("securityStatus");

const cards = [
    bugCard,
    suggestionCard,
    securityCard,
    codeCard
];

let reviewing = false;

// Initial Load

window.addEventListener("load", () => {

    loadTheme();

    updateCharacterCount();

    loadReviewHistory();

    resetReview();

    hideCards();

});

// Event Listeners

code.addEventListener("input", updateCharacterCount);

themeBtn.addEventListener("click", toggleTheme);

clearBtn.addEventListener("click", clearEditor);

copyBtn.addEventListener("click", copyImprovedCode);

downloadBtn.addEventListener("click", downloadReview);

historyBtn.addEventListener("click", openHistory);

closeHistory.addEventListener("click", closeHistoryPanel);

historyOverlay.addEventListener("click", closeHistoryPanel);

reviewBtn.addEventListener("click", reviewCode);

// Theme

function loadTheme() {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';

    }

}

function toggleTheme() {

    document.body.classList.toggle("dark");

    const dark = document.body.classList.contains("dark");

    localStorage.setItem("theme", dark ? "dark" : "light");

    themeBtn.innerHTML = dark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

}

// Character Counter

function updateCharacterCount() {

    charCount.textContent = `${code.value.length} Characters`;

}

// Loading

function setLoading(state) {

    loading.style.display = state ? "flex" : "none";

    reviewBtn.disabled = state;

    reviewBtn.innerHTML = state
        ? '<i class="fa-solid fa-spinner fa-spin"></i> Reviewing...'
        : '<i class="fa-solid fa-wand-magic-sparkles"></i> Analyze Code';

}

// Progress

function startFakeProgress() {

    progressWrapper.style.display = "block";

    progressFill.style.width = "0%";

    progressLabel.textContent = "Analyzing...";

    let progress = 0;

    const timer = setInterval(() => {

        progress += Math.random() * 8;

        if (progress > 92) {

            progress = 92;

        }

        progressFill.style.width = progress + "%";

        progressLabel.textContent =
            `Analyzing... ${Math.floor(progress)}%`;

    }, 350);

    return timer;

}

function resetProgress() {

    progressFill.style.width = "0%";

    progressLabel.textContent = "";

    progressWrapper.style.display = "none";

}

// Review Code

async function reviewCode() {

    if (reviewing) return;

    if (!code.value.trim()) {

        alert("Please paste your code first.");

        return;

    }

    reviewing = true;

    hideCards();

    resetProgress();

    setLoading(true);

    const progressTimer = startFakeProgress();

    try {

        const response = await fetch("/review", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                language: language.value,
                code: code.value
            })

        });

        let data;

        try {

            data = await response.json();

        }

        catch {

            throw new Error("Invalid response from server.");

        }

        progressFill.style.width = "100%";

        progressLabel.textContent = "Analysis Complete";

        if (!response.ok || !data.success) {

            throw new Error(
                data.error || "Unable to analyze code."
            );

        }

        displayReview(data.review);

        saveReviewHistory({

            language: language.value,

            code: code.value,

            review: data.review,

            date: new Date().toLocaleString()

        });

    }

    catch (error) {

        console.error(error);

        alert(error.message || "Unable to connect to backend.");

    }

    finally {

        clearInterval(progressTimer);

        setTimeout(() => {

            resetProgress();

        }, 500);

        setLoading(false);

        reviewing = false;

    }

}

// Display Review

function displayReview(review) {


    const scoreMatch = review.match(/Overall Score:\s*([^\n]+)/i);

    score.textContent = scoreMatch
        ? scoreMatch[1].trim()
        : "--";

    const bugText = getSection(
        review,
        "Bugs:",
        "Suggestions:"
    );

    const suggestionText = getSection(
        review,
        "Suggestions:",
        "Security Issues:"
    );

    const securityText = getSection(
        review,
        "Security Issues:",
        "Improved Code:"
    );

    bugs.innerHTML = formatList(
        bugText,
        "bug"
    );

    suggestions.innerHTML = formatList(
        suggestionText,
        "suggestion"
    );

    security.innerHTML = formatList(
        securityText,
        "security"
    );

    improvedCode.textContent = getCode(review);

    updateSummary(
        bugText,
        suggestionText,
        securityText
    );

    showCardsSequentially();

    setTimeout(() => {

        scrollToResults();

    }, 300);

}

// Update Summary

function updateSummary(
    bugText,
    suggestionText,
    securityText
) {

    const bugLines = bugText
        .split("\n")
        .filter(line => {

            const text = line.trim().toLowerCase();

            return text.startsWith("-") &&
                !text.includes("no functional") &&
                !text.includes("no bugs");

        });

    const suggestionLines = suggestionText
        .split("\n")
        .filter(line => {

            const text = line.trim().toLowerCase();

            return text.startsWith("-") &&
                !text.includes("no major") &&
                !text.includes("no suggestions");

        });

    bugCount.textContent = bugLines.length;

    suggestionCount.textContent = suggestionLines.length;

    if (

        securityText.toLowerCase().includes("no security") ||

        securityText.toLowerCase().includes("safe") ||

        securityText.trim() === ""

    ) {

        securityStatus.textContent = "Safe";

        securityStatus.style.color = "#22c55e";

    }

    else {

        securityStatus.textContent = "Issues";

        securityStatus.style.color = "#ef4444";

    }

}

// Format List

function formatList(text, type) {

    if (!text || !text.trim()) {

        return createEmptyState(
            "fa-circle-info",
            "No information available."
        );

    }

    const icons = {

        bug: "fa-bug",

        suggestion: "fa-lightbulb",

        security: "fa-shield-halved"

    };

    const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(line => {

            if (!line) return false;

            if (/^[-=]{4,}$/.test(line)) return false;

            if (line.includes("====")) return false;

            if (line.includes("----")) return false;

            return true;

        });

    if (!lines.length) {

        return createEmptyState(
            "fa-circle-info",
            "No information available."
        );

    }

    let html = "<ul class='review-list'>";

    lines.forEach(line => {

        html += `
            <li>
                <i class="fa-solid ${icons[type]}"></i>
                <span>${escapeHTML(
                    line.replace(/^[-•]\s*/, "")
                )}</span>
            </li>
        `;

    });

    html += "</ul>";

    return html;

}

// Extract Section

function getSection(
    text,
    start,
    end
) {

    if (!text) return "";

    const startIndex = text.indexOf(start);

    if (startIndex === -1) {

        return "";

    }

    let endIndex = text.indexOf(
        end,
        startIndex
    );

    if (endIndex === -1) {

        endIndex = text.length;

    }

    return text.substring(

        startIndex + start.length,

        endIndex

    ).trim();

}

// Extract Improved Code

function getCode(text) {

    if (!text) {

        return "No improved code available.";

    }

    const match = text.match(
        /```(?:\w+)?\n?([\s\S]*?)```/
    );

    if (!match) {

        return "No improved code available.";

    }

    return match[1].trim();

}

// Empty State

function createEmptyState(
    icon,
    message
) {

    return `
        <div class="empty-state">
            <i class="fa-solid ${icon}"></i>
            <p>${message}</p>
        </div>
    `;

}

// Copy Improved Code

async function copyImprovedCode() {

    const text = improvedCode.textContent.trim();

    if (

        !text ||

        text === "Your improved code will appear here..." ||

        text === "No improved code available."

    ) {

        alert("No code available to copy.");

        return;

    }

    try {

        await navigator.clipboard.writeText(text);

        copyBtn.innerHTML =
            '<i class="fa-solid fa-check"></i> Copied';

        setTimeout(() => {

            copyBtn.innerHTML =
                '<i class="fa-regular fa-copy"></i> Copy';

        }, 2000);

    }

    catch (error) {

        console.error(error);

        alert("Unable to copy code.");

    }

}

// Download Review

function downloadReview() {

    const report = `Overall Score

${score.textContent}

----------------------------------------

Bugs

${bugs.innerText.trim()}

----------------------------------------

Suggestions

${suggestions.innerText.trim()}

----------------------------------------

Security Issues

${security.innerText.trim()}

----------------------------------------

Improved Code

${improvedCode.textContent}
`;

    const blob = new Blob(
        [report],
        {
            type: "text/plain"
        }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "CodeSense_AI_Review.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}

// Save Review History

function saveReviewHistory(reviewData) {

    let history = JSON.parse(
        localStorage.getItem("reviewHistory")
    ) || [];

    history.unshift(reviewData);

    if (history.length > 10) {

        history = history.slice(0, 10);

    }

    localStorage.setItem(
        "reviewHistory",
        JSON.stringify(history)
    );

    loadReviewHistory();

}

// Load Review History

function loadReviewHistory() {

    const history = JSON.parse(
        localStorage.getItem("reviewHistory")
    ) || [];

    if (!history.length) {

        historyList.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-clock"></i>
                <p>No previous reviews found.</p>
            </div>
        `;

        return;

    }

    historyList.innerHTML = "";

    history.forEach((item, index) => {

        const div = document.createElement("div");

        div.className = "history-item";

        div.innerHTML = `
            <h4>${escapeHTML(item.language)}</h4>

            <small>${escapeHTML(item.date)}</small>

            <p>${
                item.code.length > 60
                ? escapeHTML(item.code.substring(0, 60)) + "..."
                : escapeHTML(item.code)
            }</p>

            <div class="history-actions">

                <button onclick="loadPreviousReview(${index})">
                    Open
                </button>

                <button onclick="deleteHistory(${index})">
                    Delete
                </button>

            </div>
        `;

        historyList.appendChild(div);

    });

}

// Open History

function openHistory() {

    historyPanel.classList.add("active");

    historyOverlay.classList.add("active");

}

// Close History

function closeHistoryPanel() {

    historyPanel.classList.remove("active");

    historyOverlay.classList.remove("active");

}

// Delete History

function deleteHistory(index) {

    let history = JSON.parse(
        localStorage.getItem("reviewHistory")
    ) || [];

    history.splice(index, 1);

    localStorage.setItem(
        "reviewHistory",
        JSON.stringify(history)
    );

    loadReviewHistory();

}

// Load Previous Review

function loadPreviousReview(index) {

    const history = JSON.parse(
        localStorage.getItem("reviewHistory")
    ) || [];

    const item = history[index];

    if (!item) {

        return;

    }

    code.value = item.code;

    language.value = item.language;

    updateCharacterCount();

    displayReview(item.review);

    closeHistoryPanel();

}

// Utility

function escapeHTML(text) {

    if (!text) return "";

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}

// Scroll To Results

function scrollToResults() {

    reviewSection.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}

// Show Cards

function showCardsSequentially() {

    reviewSection.classList.add("show");

    cards.forEach(card => {

        card.classList.remove("show");

    });

    cards.forEach((card, index) => {

        setTimeout(() => {

            card.classList.add("show");

        }, index * 250);

    });

}

// Hide Cards

function hideCards() {

    reviewSection.classList.remove("show");

    cards.forEach(card => {

        card.classList.remove("show");

    });

}

// Reset Review

function resetReview() {

    score.textContent = "--";

    bugCount.textContent = "0";

    suggestionCount.textContent = "0";

    securityStatus.textContent = "Safe";

    securityStatus.style.color = "#22c55e";

    bugs.innerHTML = createEmptyState(

        "fa-circle-info",

        "No analysis yet."

    );

    suggestions.innerHTML = createEmptyState(

        "fa-lightbulb",

        "Suggestions will appear here."

    );

    security.innerHTML = createEmptyState(

        "fa-shield-halved",

        "No security report."

    );

    improvedCode.textContent =

        "Your improved code will appear here...";

}

// Clear Editor

function clearEditor() {

    code.value = "";

    updateCharacterCount();

    resetReview();

    hideCards();

    resetProgress();

}