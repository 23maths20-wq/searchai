// 🔥 FIX BACK BUTTON CACHE ISSUE
window.addEventListener('pageshow', function(event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        window.location.reload();
    }
});

// Force reload on back button
if (performance.navigation.type === 2) {
    location.reload(true);
}
// ============ CONFIG ============
// API key is now handled securely by backend (/api/chat)

// ============ STATE ============
let isDarkMode = false;
let isIncognito = false;
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
let deferredPrompt = null;

// ============ INITIALIZE ============
window.onload = () => {
    loadTheme();
    displayHistory();
    document.getElementById('searchInput').focus();
};

// ============ SEARCH ============
function doSearch() {
    const query = document.getElementById('searchInput').value.trim();
    
    if (!query) {
        shakeSearchBox();
        return;
    }
    
    if (!isIncognito) {
        saveHistory(query);
    }
    
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}

function feelingLucky() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
        shakeSearchBox();
        return;
    }
    window.location.href = `search.html?q=${encodeURIComponent(query)}&quick=true`;
}

// ============ KEY EVENTS ============
function handleKeyUp(event) {
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearBtn');
    
    if (input.value.length > 0) {
        clearBtn.classList.remove('hidden');
    } else {
        clearBtn.classList.add('hidden');
        hideSuggestions();
    }
    
    if (event.key === 'Enter') doSearch();
    if (event.key === 'Escape') clearSearch();
}

// ============ SUGGESTIONS ============
const popularSuggestions = [
    'What is artificial intelligence',
    'How to learn coding',
    'Best programming languages 2024',
    'How to make money online',
    'What is machine learning',
    'Latest technology news',
    'How does blockchain work',
    'Best AI tools 2024',
    'How to become a developer',
    'Python vs JavaScript',
];

function showSuggestions() {
    const query = document.getElementById('searchInput').value.trim();
    const div = document.getElementById('suggestions');
    
    if (!query) {
        hideSuggestions();
        return;
    }
    
    const filtered = popularSuggestions
        .filter(s => s.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
    
    const historyMatch = searchHistory
        .filter(s => s.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3);
    
    const all = [...new Set([...historyMatch, ...filtered])].slice(0, 6);
    
    if (all.length === 0) {
        hideSuggestions();
        return;
    }
    
    div.innerHTML = all.map(s => `
        <div class="suggestion-item" onclick="selectSuggestion('${s.replace(/'/g, "\\'")}')">
            <span>🔍</span>
            <span>${s}</span>
        </div>
    `).join('');
    
    div.style.display = 'block';
}

function hideSuggestions() {
    document.getElementById('suggestions').style.display = 'none';
}

function selectSuggestion(text) {
    document.getElementById('searchInput').value = text;
    hideSuggestions();
    doSearch();
}

// ============ CLEAR ============
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearBtn').classList.add('hidden');
    hideSuggestions();
    document.getElementById('searchInput').focus();
}

// ============ SHAKE ANIMATION ============
function shakeSearchBox() {
    const box = document.getElementById('searchBox');
    box.style.animation = 'shake 0.5s ease';
    box.style.borderColor = '#ea4335';
    
    setTimeout(() => {
        box.style.animation = '';
        box.style.borderColor = '';
    }, 500);
    
    if (!document.getElementById('shakeStyle')) {
        const style = document.createElement('style');
        style.id = 'shakeStyle';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============ QUICK SEARCH ============
function searchOn(platform) {
    const query = document.getElementById('searchInput').value.trim();
    
    if (!query) {
        document.getElementById('searchInput').focus();
        shakeSearchBox();
        return;
    }
    
    const urls = {
        youtube: `https://youtube.com/results?search_query=${encodeURIComponent(query)}`,
        images: `https://google.com/search?tbm=isch&q=${encodeURIComponent(query)}`,
        news: `https://news.google.com/search?q=${encodeURIComponent(query)}`,
        maps: `https://maps.google.com/search?q=${encodeURIComponent(query)}`,
        wikipedia: `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query)}`,
        reddit: `https://reddit.com/search?q=${encodeURIComponent(query)}`,
        twitter: `https://twitter.com/search?q=${encodeURIComponent(query)}`,
        amazon: `https://amazon.com/s?k=${encodeURIComponent(query)}`
    };
    
    if (urls[platform]) {
        window.open(urls[platform], '_blank');
    }
}

// ============ VOICE SEARCH ============
function startVoice() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Voice search not supported in this browser!');
        return;
    }
    
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    
    const voiceBtn = document.getElementById('voiceBtn');
    voiceBtn.innerHTML = '🔴';
    voiceBtn.style.animation = 'pulse 1s infinite';
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('searchInput').value = transcript;
        doSearch();
    };
    
    recognition.onend = () => {
        voiceBtn.innerHTML = '🎤';
        voiceBtn.style.animation = '';
    };
    
    recognition.onerror = () => {
        voiceBtn.innerHTML = '🎤';
        voiceBtn.style.animation = '';
    };
    
    recognition.start();
}

// ============ CAMERA ============
function startCamera() {
    alert('📷 Image search coming soon! Meanwhile try Google Lens');
    window.open('https://lens.google.com', '_blank');
}

// ============ DARK MODE ============
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.body.classList.add('dark');
        document.body.classList.remove('incognito');
        isIncognito = false;
        document.getElementById('darkIcon').textContent = '☀️';
        document.getElementById('incognitoTag').classList.add('hidden');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        document.getElementById('darkIcon').textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        isDarkMode = true;
        document.body.classList.add('dark');
        document.getElementById('darkIcon').textContent = '☀️';
    }
}

// ============ INCOGNITO ============
function toggleIncognito() {
    isIncognito = !isIncognito;
    
    if (isIncognito) {
        document.body.classList.add('incognito');
        document.body.classList.remove('dark');
        isDarkMode = false;
        document.getElementById('incognitoTag').classList.remove('hidden');
        document.getElementById('recentSearches').classList.add('hidden');
        document.getElementById('incognitoIcon').textContent = '👁️';
        document.title = '🕵️ Incognito - SearchAI';
        showToast('🕵️ Incognito Mode ON - Searches won\'t be saved');
    } else {
        document.body.classList.remove('incognito');
        document.getElementById('incognitoTag').classList.add('hidden');
        document.getElementById('recentSearches').classList.remove('hidden');
        document.getElementById('incognitoIcon').textContent = '🕵️';
        document.title = 'SearchAI - Smart AI Search Engine';
        showToast('👁️ Incognito Mode OFF');
    }
}

// ============ HISTORY ============
function saveHistory(query) {
    searchHistory = searchHistory.filter(item => item !== query);
    searchHistory.unshift(query);
    searchHistory = searchHistory.slice(0, 10);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    displayHistory();
}

function displayHistory() {
    const list = document.getElementById('historyList');
    
    if (searchHistory.length === 0) {
        document.getElementById('recentSearches').style.display = 'none';
        return;
    }
    
    document.getElementById('recentSearches').style.display = 'block';
    list.innerHTML = searchHistory.map(q => `
        <div class="history-chip" onclick="selectHistory('${q.replace(/'/g, "\\'")}')">
            🕐 <span>${q}</span>
        </div>
    `).join('');
}

function selectHistory(query) {
    document.getElementById('searchInput').value = query;
    doSearch();
}

function clearHistory() {
    if (confirm('Clear all search history?')) {
        searchHistory = [];
        localStorage.removeItem('searchHistory');
        displayHistory();
        showToast('🗑️ History cleared!');
    }
}

// ============ SHARE ============
function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: 'SearchAI',
            text: 'Check out this amazing AI search engine!',
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href);
        showToast('🔗 Link copied!');
    }
}

// ============ TOAST ============
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 30px;
        font-size: 14px;
        font-weight: 500;
        z-index: 9999;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: fadeInUp 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ============ PWA INSTALL ============
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    setTimeout(() => {
        document.getElementById('installPrompt').classList.remove('hidden');
    }, 5000);
});

document.getElementById('installBtn')?.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
        hideInstall();
    }
});

function hideInstall() {
    document.getElementById('installPrompt').classList.add('hidden');
}

// ============ SERVICE WORKER ============
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(() => console.log('✅ PWA Ready'))
        .catch(err => console.log('SW Error:', err));
}

// ============ CLOSE SUGGESTIONS ON OUTSIDE CLICK ============
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrap')) {
        hideSuggestions();
    }
});