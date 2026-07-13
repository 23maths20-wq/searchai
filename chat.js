// Fix back button cache issue
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        window.location.reload();
    }
});
// ============ STATE ============
let currentChatId = null;
let messages = [];
let currentPersonality = 'normal';
let allChats = JSON.parse(localStorage.getItem('allChats')) || [];

// ============ INITIALIZE ============
window.onload = () => {
    loadTheme();
    populatePersonalities();
    renderChatHistory();
    
    // Load last chat
    if (allChats.length > 0) {
        loadChat(allChats[0].id);
    }
};

// ============ PERSONALITIES ============
function populatePersonalities() {
    const select = document.getElementById('personalitySelect');
    Object.keys(PERSONALITIES).forEach(key => {
        const p = PERSONALITIES[key];
        select.innerHTML += `<option value="${key}">${p.icon} ${p.name}</option>`;
    });
}

function changePersonality() {
    currentPersonality = document.getElementById('personalitySelect').value;
    const p = PERSONALITIES[currentPersonality];
    document.getElementById('currentPersonality').textContent = `${p.icon} ${p.name}`;
}

// ============ MESSAGES ============
async function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Clear welcome
    if (!currentChatId) {
        newChat();
    }
    
    // Clear input
    input.value = '';
    input.style.height = 'auto';
    
    // Add user message
    addMessage('user', message);
    
    // Save to messages
    messages.push({role: 'user', content: message});
    
    // Show typing
    showTyping();
    
    try {
        // Get AI response
        const response = await callAI(message);
        
        // Remove typing
        removeTyping();
        
        // Add AI message
        addMessage('ai', response);
        messages.push({role: 'assistant', content: response});
        
        // Save chat
        saveChat();
        
    } catch (error) {
        removeTyping();
        addMessage('ai', '❌ Sorry, something went wrong. Please try again!');
    }
}

function addMessage(role, content) {
    const container = document.getElementById('messagesContainer');
    
    // Remove welcome if exists
    const welcome = container.querySelector('.welcome-screen');
    if (welcome) welcome.remove();
    
    const avatar = role === 'user' ? '👤' : PERSONALITIES[currentPersonality].icon;
    
    // Format content (markdown-like)
    let formatted = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^- (.*$)/gm, '<li>$1</li>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
    
    formatted = formatted.replace(/(<li>.*?<\/li>)/gs, m => `<ul>${m}</ul>`);
    if (!formatted.startsWith('<')) formatted = `<p>${formatted}</p>`;
    
    const msgHTML = `
        <div class="message ${role}">
            <div class="msg-avatar">${avatar}</div>
            <div class="msg-content">
                ${formatted}
                ${role === 'ai' ? `
                    <div class="msg-actions">
                        <button onclick="copyMsg(this)">📋 Copy</button>
                        <button onclick="readMsg(this)">🔊 Read</button>
                        <button onclick="regenerate()">🔄 Regenerate</button>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', msgHTML);
    container.scrollTop = container.scrollHeight;
}

// ============ AI CALL (Using Secure Backend) ============
async function callAI(query) {
    const personality = PERSONALITIES[currentPersonality];
    const systemPrompt = personality.prompt;
    
    // Prepare messages with system prompt
    const messagesToSend = [
        {role: 'system', content: systemPrompt},
        ...messages.slice(-10) // Last 10 messages for context
    ];
    
    // Try Groq backend first
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: messagesToSend,
                model: 'llama-3.3-70b-versatile'
            })
        });
        
        if (!response.ok) {
            throw new Error('Groq failed');
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
        
    } catch (error) {
        console.log('Groq failed, trying OpenRouter backup...');
        
        // Try OpenRouter backend as backup
        try {
            const response = await fetch('/api/openrouter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: messagesToSend,
                    model: 'mistralai/mistral-7b-instruct:free'
                })
            });
            
            if (!response.ok) {
                throw new Error('OpenRouter failed');
            }
            
            const data = await response.json();
            return data.choices[0].message.content;
            
        } catch (e) {
            console.error('All APIs failed:', e);
            throw new Error('All APIs failed');
        }
    }
}
// ============ TYPING INDICATOR ============
function showTyping() {
    const container = document.getElementById('messagesContainer');
    const typingHTML = `
        <div class="message ai typing-message">
            <div class="msg-avatar">${PERSONALITIES[currentPersonality].icon}</div>
            <div class="msg-content">
                <div class="typing">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', typingHTML);
    container.scrollTop = container.scrollHeight;
}

function removeTyping() {
    const typing = document.querySelector('.typing-message');
    if (typing) typing.remove();
}

// ============ CHAT MANAGEMENT ============
function newChat() {
    currentChatId = Date.now();
    messages = [];
    document.getElementById('messagesContainer').innerHTML = `
        <div class="welcome-screen">
            <div class="welcome-icon">🤖</div>
            <h1>New Chat Started</h1>
            <p>What would you like to know?</p>
        </div>
    `;
}

function saveChat() {
    if (messages.length === 0) return;
    
    const chatData = {
        id: currentChatId,
        title: messages[0].content.slice(0, 40) + '...',
        messages: messages,
        personality: currentPersonality,
        timestamp: new Date().toISOString()
    };
    
    // Update or add
    const idx = allChats.findIndex(c => c.id === currentChatId);
    if (idx >= 0) {
        allChats[idx] = chatData;
    } else {
        allChats.unshift(chatData);
    }
    
    // Keep only 50 chats
    allChats = allChats.slice(0, 50);
    localStorage.setItem('allChats', JSON.stringify(allChats));
    renderChatHistory();
}

function loadChat(chatId) {
    const chat = allChats.find(c => c.id === chatId);
    if (!chat) return;
    
    currentChatId = chat.id;
    messages = chat.messages;
    currentPersonality = chat.personality || 'normal';
    document.getElementById('personalitySelect').value = currentPersonality;
    changePersonality();
    
    // Render messages
    const container = document.getElementById('messagesContainer');
    container.innerHTML = '';
    messages.forEach(msg => {
        addMessage(msg.role === 'user' ? 'user' : 'ai', msg.content);
    });
    
    renderChatHistory();
}

function renderChatHistory() {
    const list = document.getElementById('chatList');
    if (allChats.length === 0) {
        list.innerHTML = '<p style="color: var(--text-light); font-size: 12px; text-align: center; padding: 20px;">No chats yet</p>';
        return;
    }
    
    list.innerHTML = allChats.map(chat => `
        <div class="chat-item ${chat.id === currentChatId ? 'active' : ''}" 
             onclick="loadChat(${chat.id})">
            <span class="chat-item-icon">💬</span>
            <span class="chat-item-text">${chat.title}</span>
            <span onclick="event.stopPropagation(); deleteChat(${chat.id})" 
                  style="cursor:pointer;">🗑️</span>
        </div>
    `).join('');
}

function deleteChat(chatId) {
    if (!confirm('Delete this chat?')) return;
    allChats = allChats.filter(c => c.id !== chatId);
    localStorage.setItem('allChats', JSON.stringify(allChats));
    if (chatId === currentChatId) newChat();
    renderChatHistory();
}

function clearChat() {
    if (confirm('Clear current chat?')) {
        messages = [];
        newChat();
    }
}

function exportChat() {
    const text = messages.map(m => 
        `${m.role.toUpperCase()}: ${m.content}\n`
    ).join('\n');
    
    const blob = new Blob([text], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${Date.now()}.txt`;
    a.click();
}

// ============ HELPERS ============
function quickAsk(text) {
    document.getElementById('messageInput').value = text;
    sendMessage();
}

function copyMsg(btn) {
    const text = btn.closest('.msg-content').innerText;
    navigator.clipboard.writeText(text);
    btn.textContent = '✅ Copied!';
    setTimeout(() => btn.textContent = '📋 Copy', 2000);
}

function readMsg(btn) {
    const text = btn.closest('.msg-content').innerText;
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

function regenerate() {
    if (messages.length < 2) return;
    // Remove last AI message
    messages.pop();
    // Get last user message
    const lastUser = messages[messages.length - 1].content;
    // Remove last AI from UI
    document.querySelectorAll('.message.ai:last-child').forEach(m => m.remove());
    // Regenerate
    document.getElementById('messageInput').value = lastUser;
    messages.pop();
    sendMessage();
}

function startVoiceChat() {
    if (!('webkitSpeechRecognition' in window)) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR();
    r.lang = 'en-US';
    
    const btn = document.querySelector('.voice-btn');
    btn.textContent = '🔴';
    
    r.onresult = e => {
        document.getElementById('messageInput').value = e.results[0][0].transcript;
        sendMessage();
    };
    
    r.onend = () => btn.textContent = '🎤';
    r.start();
}

function handleEnter(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

function loadTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }
}