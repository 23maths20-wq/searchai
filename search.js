// Fix back button cache issue
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        window.location.reload();
    }
});
// ============ CONFIG ============
const GROQ_API_KEY = CONFIG.APIs.groq.key;

// ============ GET QUERY ============
const params = new URLSearchParams(window.location.search);
const query = params.get('q') || '';

// ============ INITIALIZE ============
window.onload = () => {
    if (!query) {
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('resultsInput').value = query;
    document.title = `${query} - SearchAI`;
    
    loadTheme();
    updateStats();
    getAIAnswer();
    generateRelated();
    loadFacts();
};

// ============ STATS ============
function updateStats() {
    const time = (Math.random() * 0.5 + 0.1).toFixed(2);
    const results = Math.floor(Math.random() * 900000000 + 100000000);
    setTimeout(() => {
        document.getElementById('statsBar').innerHTML = 
            `✨ About <strong>${results.toLocaleString()}</strong> results (${time} seconds)`;
    }, 1000);
}

// ============ AI ANSWER ============
async function getAIAnswer() {
    try {
        const response = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [{
                        role: 'system',
                        content: 'You are a helpful AI search assistant. Give clear, informative, well-formatted answers. Use markdown formatting when needed.'
                    }, {
                        role: 'user',
                        content: query
                    }],
                    max_tokens: 1500
                })
            }
        );
        
        const data = await response.json();
        
        if (data.choices?.[0]?.message?.content) {
            displayAnswer(data.choices[0].message.content);
        } else {
            throw new Error('No answer');
        }
        
    } catch (error) {
        console.error(error);
        document.getElementById('aiAnswerBox').innerHTML = `
            <div class="ai-answer-content">
                <h2>❌ Oops!</h2>
                <p>Could not get AI answer. Please check:</p>
                <ul>
                    <li>Your Groq API key is correct</li>
                    <li>You have internet connection</li>
                    <li>The API is not down</li>
                </ul>
                <br>
                <p>Get free API key from: <strong>console.groq.com</strong></p>
            </div>
        `;
    }
}

function displayAnswer(answer) {
    // Format markdown
    let formatted = answer
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h3>$1</h3>')
        .replace(/^# (.*$)/gm, '<h2>$1</h2>')
        .replace(/^\* (.*$)/gm, '<li>$1</li>')
        .replace(/^- (.*$)/gm, '<li>$1</li>')
        .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
    
    // Wrap lists
    formatted = formatted.replace(/(<li>.*?<\/li>)/gs, (match) => {
        return '<ul>' + match + '</ul>';
    });
    
    document.getElementById('aiAnswerBox').innerHTML = `
        <div class="ai-answer-content">
            <h2>🤖 AI Answer</h2>
            <div>${formatted}</div>
            <div class="ai-actions">
                <button class="ai-btn" onclick="copyAnswer()">📋 Copy</button>
                <button class="ai-btn" onclick="readAloud()">🔊 Read</button>
                <button class="ai-btn" onclick="shareAnswer()">📤 Share</button>
                <button class="ai-btn" onclick="regenerate()">🔄 Regenerate</button>
            </div>
        </div>
    `;
}

// ============ TABS ============
function showTab(tabName, btnElement) {
    // Update buttons
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    
    // Hide all panels
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    
    // Show selected
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Load content
    loadTabContent(tabName);
}

function loadTabContent(tabName) {
    const q = encodeURIComponent(query);
    
    switch(tabName) {
        case 'youtube':
            const yt = document.getElementById('youtubeFrame');
            if (!yt.src) yt.src = `https://www.youtube.com/embed?listType=search&list=${q}`;
            break;
            
        case 'images':
            const img = document.getElementById('imagesFrame');
            if (!img.src) img.src = `https://www.google.com/search?tbm=isch&q=${q}&igu=1`;
            break;
            
        case 'news':
            loadNews();
            break;
            
        case 'wiki':
            loadWikipedia();
            break;
            
        case 'maps':
            const maps = document.getElementById('mapsFrame');
            if (!maps.src) maps.src = `https://maps.google.com/maps?q=${q}&output=embed`;
            break;
            
        case 'shopping':
            const shop = document.getElementById('shopFrame');
            if (!shop.src) shop.src = `https://www.amazon.com/s?k=${q}`;
            break;
    }
}

// ============ NEWS ============
function loadNews() {
    const q = encodeURIComponent(query);
    document.getElementById('newsResults').innerHTML = `
        <div class="news-item" onclick="window.open('https://news.google.com/search?q=${q}', '_blank')">
            <div class="news-icon">📰</div>
            <div class="news-content">
                <h4>Google News: "${query}"</h4>
                <p>Latest news from around the world</p>
            </div>
        </div>
        <div class="news-item" onclick="window.open('https://www.bbc.com/search?q=${q}', '_blank')">
            <div class="news-icon">🌍</div>
            <div class="news-content">
                <h4>BBC News</h4>
                <p>International news coverage</p>
            </div>
        </div>
        <div class="news-item" onclick="window.open('https://twitter.com/search?q=${q}', '_blank')">
            <div class="news-icon">🐦</div>
            <div class="news-content">
                <h4>Twitter Trending</h4>
                <p>Real-time updates and discussions</p>
            </div>
        </div>
        <div class="news-item" onclick="window.open('https://reddit.com/search?q=${q}', '_blank')">
            <div class="news-icon">👾</div>
            <div class="news-content">
                <h4>Reddit</h4>
                <p>Community discussions</p>
            </div>
        </div>
    `;
}

// ============ WIKIPEDIA ============
async function loadWikipedia() {
    const wiki = document.getElementById('wikiResult');
    wiki.innerHTML = '<p>Loading Wikipedia...</p>';
    
    try {
        const res = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
        );
        const data = await res.json();
        
        if (data.extract) {
            wiki.innerHTML = `
                <h2>📚 ${data.title}</h2>
                ${data.thumbnail ? `<img src="${data.thumbnail.source}" alt="${data.title}">` : ''}
                <p>${data.extract}</p>
                <a href="${data.content_urls?.desktop?.page}" target="_blank" class="wiki-link">
                    Read full article on Wikipedia →
                </a>
            `;
        } else {
            wiki.innerHTML = `
                <p>No Wikipedia article found for "${query}".</p>
                <a href="https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query)}" 
                   target="_blank" class="wiki-link">Search Wikipedia →</a>
            `;
        }
    } catch (error) {
        wiki.innerHTML = `
            <a href="https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query)}" 
               target="_blank" class="wiki-link">Search on Wikipedia →</a>
        `;
    }
}

// ============ RELATED SEARCHES ============
function generateRelated() {
    const related = [
        `${query} tutorial`,
        `${query} explained simply`,
        `best ${query} tools`,
        `${query} for beginners`,
        `how to ${query}`,
        `${query} examples`,
        `${query} 2024`,
        `learn ${query} online`
    ];
    
    document.getElementById('relatedList').innerHTML = related.map(item => `
        <div class="related-item" onclick="searchRelated('${item.replace(/'/g, "\\'")}')">
            🔍 ${item}
        </div>
    `).join('');
}

function searchRelated(q) {
    window.location.href = `search.html?q=${encodeURIComponent(q)}`;
}

// ============ FACTS ============
function loadFacts() {
    const facts = [
        `📅 Just searched`,
        `🌍 Worldwide results`,
        `🔒 Search is private`,
        `⚡ Powered by Groq AI`,
        `🚀 Super fast`
    ];
    
    document.getElementById('factsList').innerHTML = facts.map(f => `
        <div class="fact-item">${f}</div>
    `).join('');
}

// ============ ACTIONS ============
function copyAnswer() {
    const text = document.querySelector('.ai-answer-content').innerText;
    navigator.clipboard.writeText(text);
    showToast('📋 Copied!');
}

function readAloud() {
    const text = document.querySelector('.ai-answer-content').innerText;
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speechSynthesis.speak(speech);
    showToast('🔊 Reading aloud...');
}

function shareAnswer() {
    if (navigator.share) {
        navigator.share({
            title: `SearchAI: ${query}`,
            text: document.querySelector('.ai-answer-content').innerText.slice(0, 200),
            url: window.location.href
        });
    } else {
        copyLink();
    }
}

function regenerate() {
    document.getElementById('aiAnswerBox').innerHTML = `
        <div class="ai-loading">
            <div class="ai-spinner"></div>
            <div>
                <h3>🔄 Regenerating...</h3>
                <p>Getting a new answer</p>
            </div>
        </div>
    `;
    getAIAnswer();
}

function shareOnWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`, '_blank');
}

function shareOnTwitter() {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Searched "${query}" on SearchAI!`)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    showToast('🔗 Link copied!');
}

// ============ TOAST ============
function showToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #202124;
        color: white;
        padding: 12px 25px;
        border-radius: 25px;
        font-size: 14px;
        z-index: 9999;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

// ============ NEW SEARCH ============
function newSearch() {
    const q = document.getElementById('resultsInput').value.trim();
    if (q) window.location.href = `search.html?q=${encodeURIComponent(q)}`;
}

document.getElementById('resultsInput').addEventListener('keypress', e => {
    if (e.key === 'Enter') newSearch();
});

// ============ VOICE ============
function startVoice() {
    if (!('webkitSpeechRecognition' in window)) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR();
    r.lang = 'en-US';
    r.onresult = e => {
        window.location.href = `search.html?q=${encodeURIComponent(e.results[0][0].transcript)}`;
    };
    r.start();
}

// ============ DARK MODE ============
function toggleDarkMode() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

function loadTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }
}