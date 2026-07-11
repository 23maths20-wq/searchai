-// Fix back button cache issue
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        window.location.reload();
    }
});
// ═══════════════════════════════════════════════════════
// 🚀 SEARCHAI - COMPLETE CONFIG FILE
// ═══════════════════════════════════════════════════════
// Made by 13yr old Genius 💪
// Multi-API Support: Groq + OpenRouter (Both FREE!)
// ═══════════════════════════════════════════════════════

const CONFIG = {

    // ═══════════════════════════════════════════════════
    // 🤖 AI APIs (ALL FREE - Multiple backup)
    // ═══════════════════════════════════════════════════
    APIs: {
        
        // ─────────────────────────────────────
        // 1️⃣ GROQ (Primary - Fastest & Best)
        // Get FREE key: console.groq.com
        // Limit: 14,400 requests/day
        // ─────────────────────────────────────
        groq: {
            enabled: true,
            key: 'YOUR_GROQ_API_KEY_HERE',
            url: 'https://api.groq.com/openai/v1/chat/completions',
            model: 'llama-3.3-70b-versatile',
            name: 'Groq Llama 3.3 (Fast)',
            icon: '⚡',
            priority: 1
        },

        // ─────────────────────────────────────
        // 2️⃣ OPENROUTER (Backup - Many models)
        // Get FREE key: openrouter.ai
        // Many FREE models available
        // ─────────────────────────────────────
        openrouter: {
            enabled: true,
            key: 'YOUR_OPENROUTER_API_KEY_HERE',
            url: 'https://openrouter.ai/api/v1/chat/completions',
            model: 'mistralai/mistral-7b-instruct:free',  // FREE model
            name: 'OpenRouter Mistral (Free)',
            icon: '🌐',
            priority: 2,
            siteUrl: 'https://yourwebsite.com',  // ← Apni website URL
            siteName: 'SearchAI'
        }

    },

    // ═══════════════════════════════════════════════════
    // 🎯 ALL AVAILABLE MODELS (User Can Choose)
    // ═══════════════════════════════════════════════════
    MODELS: {
        // GROQ MODELS
        'groq-llama-3.3': {
            api: 'groq',
            model: 'llama-3.3-70b-versatile',
            name: '⚡ Llama 3.3 70B (Fastest)',
            speed: 'Very Fast',
            quality: 'Excellent'
        },
        'groq-llama-3.1': {
            api: 'groq',
            model: 'llama-3.1-8b-instant',
            name: '🚀 Llama 3.1 8B (Ultra Fast)',
            speed: 'Ultra Fast',
            quality: 'Good'
        },
        'groq-mixtral': {
            api: 'groq',
            model: 'mixtral-8x7b-32768',
            name: '🎯 Mixtral 8x7B (Balanced)',
            speed: 'Fast',
            quality: 'Excellent'
        },
        'groq-gemma': {
            api: 'groq',
            model: 'gemma2-9b-it',
            name: '💎 Gemma 2 9B (Smart)',
            speed: 'Fast',
            quality: 'Very Good'
        },

        // OPENROUTER FREE MODELS
        'openrouter-mistral': {
            api: 'openrouter',
            model: 'mistralai/mistral-7b-instruct:free',
            name: '🌟 Mistral 7B (Free)',
            speed: 'Medium',
            quality: 'Good'
        },
        'openrouter-llama': {
            api: 'openrouter',
            model: 'meta-llama/llama-3.2-3b-instruct:free',
            name: '🦙 Llama 3.2 (Free)',
            speed: 'Medium',
            quality: 'Good'
        },
        'openrouter-gemma': {
            api: 'openrouter',
            model: 'google/gemma-2-9b-it:free',
            name: '💠 Gemma 2 (Free)',
            speed: 'Medium',
            quality: 'Very Good'
        },
        'openrouter-phi': {
            api: 'openrouter',
            model: 'microsoft/phi-3-mini-128k-instruct:free',
            name: '🔷 Phi-3 Mini (Free)',
            speed: 'Fast',
            quality: 'Good'
        }
    },

    // Default model (user can change)
    DEFAULT_MODEL: 'groq-llama-3.3',

    // ═══════════════════════════════════════════════════
    // 📱 YOUR SOCIAL MEDIA LINKS
    // ═══════════════════════════════════════════════════
    SOCIAL: {
        youtube: 'https://youtube.com/@yourchannel',        // ← EDIT
        instagram: 'https://instagram.com/yourprofile',     // ← EDIT
        twitter: 'https://twitter.com/yourprofile',         // ← EDIT
        facebook: 'https://facebook.com/yourprofile',       // ← EDIT
        whatsapp: 'https://wa.me/919999999999',             // ← EDIT (apna number)
        telegram: 'https://t.me/yourchannel',               // ← EDIT
        discord: 'https://discord.gg/yourinvite',           // ← EDIT
        github: 'https://github.com/yourusername',          // ← EDIT
        linkedin: 'https://linkedin.com/in/yourprofile',    // ← EDIT
        tiktok: 'https://tiktok.com/@yourprofile',          // ← EDIT
        snapchat: 'https://snapchat.com/add/yourprofile',   // ← EDIT
        email: 'mailto:youremail@gmail.com'                 // ← EDIT
    },

    // ═══════════════════════════════════════════════════
    // 💰 MONEY MAKING LINKS
    // ═══════════════════════════════════════════════════
    MONEY: {
        adsenseId: 'ca-pub-XXXXXXXXXXXXXXXX',              // ← Baad me
        adsenseSlot: 'XXXXXXXXXX',                          // ← Baad me
        buyMeCoffee: 'https://buymeacoffee.com/yourname',   // ← EDIT
        upiId: 'yourname@paytm',                            // ← EDIT (apna UPI)
        paypalLink: 'https://paypal.me/yourname',           // ← EDIT
        patreon: 'https://patreon.com/yourname',            // ← EDIT
        kofi: 'https://ko-fi.com/yourname'                  // ← EDIT
    },

    // ═══════════════════════════════════════════════════
    // 🛒 AFFILIATE LINKS (Earn commission!)
    // ═══════════════════════════════════════════════════
    AFFILIATES: {
        amazon: 'https://amazon.in/?tag=YOUR_TAG',          // ← Amazon Associates
        flipkart: 'https://flipkart.com/?affid=YOUR_ID',    // ← Flipkart Affiliate
        meesho: 'https://meesho.com',
        myntra: 'https://myntra.com'
    },

    // ═══════════════════════════════════════════════════
    // ⚙️ APP SETTINGS
    // ═══════════════════════════════════════════════════
    APP: {
        name: 'SearchAI',
        version: '2.0',
        maker: 'Made by 13yr old Genius 🚀',
        description: 'Smart AI Search Engine',
        
        // Free tier limits
        freeSearchesPerDay: 20,
        freeChatsPerDay: 10,
        
        // Premium pricing
        premiumPriceMonthly: 399,      // ₹399/month
        premiumPriceYearly: 3999,      // ₹3999/year
        businessPriceMonthly: 1499,    // ₹1499/month
        
        // Referral rewards
        referralBonus: 50,             // 50 credits per referral
        signupBonus: 20                // 20 free credits on signup
    }
};

// ═══════════════════════════════════════════════════════
// 🎭 AI PERSONALITIES (For Chat Mode)
// ═══════════════════════════════════════════════════════
const PERSONALITIES = {
    normal: {
        icon: '🤖',
        name: 'Normal AI',
        prompt: 'You are a helpful AI assistant. Give clear, accurate answers.'
    },
    professional: {
        icon: '👔',
        name: 'Professional',
        prompt: 'You are a professional business consultant. Give formal, expert answers with proper structure.'
    },
    funny: {
        icon: '😂',
        name: 'Funny',
        prompt: 'You are a hilarious comedian AI. Make every answer funny with jokes and humor. Keep it light!'
    },
    teacher: {
        icon: '👨‍🏫',
        name: 'Teacher',
        prompt: 'You are a patient teacher. Explain concepts step by step like teaching a student. Use examples.'
    },
    kid: {
        icon: '👶',
        name: 'Kid Friendly',
        prompt: 'Explain everything like the user is 10 years old. Use simple words, fun examples, and analogies.'
    },
    expert: {
        icon: '🎓',
        name: 'Expert',
        prompt: 'You are a world-class expert. Give detailed, technical, in-depth answers with references.'
    },
    friend: {
        icon: '🤗',
        name: 'Best Friend',
        prompt: 'You are the user\'s best friend. Be casual, use slang, be super supportive and caring.'
    },
    debate: {
        icon: '⚖️',
        name: 'Debate Mode',
        prompt: 'Give TWO opposite perspectives on any question. Present both sides fairly, then give a balanced conclusion.'
    },
    creative: {
        icon: '🎨',
        name: 'Creative',
        prompt: 'You are super creative and imaginative. Give unique, out-of-the-box answers with creative flair.'
    },
    coder: {
        icon: '💻',
        name: 'Coder',
        prompt: 'You are an expert programmer. Give code examples, technical solutions, and best practices.'
    },
    motivator: {
        icon: '💪',
        name: 'Motivator',
        prompt: 'You are an energetic motivational coach. Inspire the user, be positive, and encourage them!'
    },
    storyteller: {
        icon: '📖',
        name: 'Storyteller',
        prompt: 'Convert every answer into an engaging story. Make information memorable through narratives.'
    }
};

// ═══════════════════════════════════════════════════════
// 🔗 LINK CATEGORIES (For Link Mode)
// ═══════════════════════════════════════════════════════
const LINK_CATEGORIES = {
    social: {
        icon: '📱',
        name: 'Social Media',
        links: [
            {name: 'YouTube', url: 'https://youtube.com', icon: '📺', color: '#ff0000'},
            {name: 'Facebook', url: 'https://facebook.com', icon: '👤', color: '#1877f2'},
            {name: 'Instagram', url: 'https://instagram.com', icon: '📷', color: '#e4405f'},
            {name: 'Twitter/X', url: 'https://twitter.com', icon: '🐦', color: '#000000'},
            {name: 'WhatsApp', url: 'https://web.whatsapp.com', icon: '💬', color: '#25d366'},
            {name: 'Telegram', url: 'https://web.telegram.org', icon: '✈️', color: '#0088cc'},
            {name: 'Snapchat', url: 'https://snapchat.com', icon: '👻', color: '#fffc00'},
            {name: 'TikTok', url: 'https://tiktok.com', icon: '🎵', color: '#000000'},
            {name: 'Discord', url: 'https://discord.com', icon: '🎮', color: '#5865f2'},
            {name: 'Reddit', url: 'https://reddit.com', icon: '👾', color: '#ff4500'},
            {name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼', color: '#0077b5'},
            {name: 'Pinterest', url: 'https://pinterest.com', icon: '📌', color: '#e60023'}
        ]
    },
    entertainment: {
        icon: '🎬',
        name: 'Entertainment',
        links: [
            {name: 'Netflix', url: 'https://netflix.com', icon: '🎥', color: '#e50914'},
            {name: 'Prime Video', url: 'https://primevideo.com', icon: '📺', color: '#00a8e1'},
            {name: 'Disney+', url: 'https://disneyplus.com', icon: '🏰', color: '#113ccf'},
            {name: 'Hotstar', url: 'https://hotstar.com', icon: '⭐', color: '#0d1a2c'},
            {name: 'Spotify', url: 'https://spotify.com', icon: '🎵', color: '#1db954'},
            {name: 'Apple Music', url: 'https://music.apple.com', icon: '🎶', color: '#fa243c'},
            {name: 'SoundCloud', url: 'https://soundcloud.com', icon: '☁️', color: '#ff5500'},
            {name: 'Gaana', url: 'https://gaana.com', icon: '🎼', color: '#e72c30'},
            {name: 'JioSaavn', url: 'https://jiosaavn.com', icon: '🎧', color: '#2bc5b4'},
            {name: 'YouTube Music', url: 'https://music.youtube.com', icon: '🎤', color: '#ff0000'}
        ]
    },
    shopping: {
        icon: '🛒',
        name: 'Shopping',
        links: [
            {name: 'Amazon', url: 'https://amazon.in', icon: '📦', color: '#ff9900'},
            {name: 'Flipkart', url: 'https://flipkart.com', icon: '🛍️', color: '#2874f0'},
            {name: 'Myntra', url: 'https://myntra.com', icon: '👗', color: '#ff3f6c'},
            {name: 'Ajio', url: 'https://ajio.com', icon: '👖', color: '#2e2e5c'},
            {name: 'Meesho', url: 'https://meesho.com', icon: '🎀', color: '#f43397'},
            {name: 'Nykaa', url: 'https://nykaa.com', icon: '💄', color: '#fc2779'},
            {name: 'BigBasket', url: 'https://bigbasket.com', icon: '🥬', color: '#84c225'},
            {name: 'Zomato', url: 'https://zomato.com', icon: '🍕', color: '#e23744'},
            {name: 'Swiggy', url: 'https://swiggy.com', icon: '🍔', color: '#fc8019'},
            {name: 'eBay', url: 'https://ebay.com', icon: '🏷️', color: '#e53238'}
        ]
    },
    education: {
        icon: '📚',
        name: 'Education',
        links: [
            {name: 'YouTube EDU', url: 'https://youtube.com/education', icon: '🎓', color: '#ff0000'},
            {name: 'Khan Academy', url: 'https://khanacademy.org', icon: '📖', color: '#14bf96'},
            {name: 'Coursera', url: 'https://coursera.org', icon: '🎯', color: '#0056d3'},
            {name: 'Udemy', url: 'https://udemy.com', icon: '💻', color: '#a435f0'},
            {name: 'Duolingo', url: 'https://duolingo.com', icon: '🦜', color: '#58cc02'},
            {name: 'Wikipedia', url: 'https://wikipedia.org', icon: '📗', color: '#000000'},
            {name: "BYJU'S", url: 'https://byjus.com', icon: '🎒', color: '#552f8f'},
            {name: 'Unacademy', url: 'https://unacademy.com', icon: '✏️', color: '#08bd80'},
            {name: 'Google Scholar', url: 'https://scholar.google.com', icon: '🔍', color: '#4285f4'},
            {name: 'edX', url: 'https://edx.org', icon: '📚', color: '#02262b'}
        ]
    },
    tools: {
        icon: '🛠️',
        name: 'AI Tools',
        links: [
            {name: 'ChatGPT', url: 'https://chat.openai.com', icon: '🤖', color: '#10a37f'},
            {name: 'Claude', url: 'https://claude.ai', icon: '🧠', color: '#d97757'},
            {name: 'Gemini', url: 'https://gemini.google.com', icon: '💎', color: '#4285f4'},
            {name: 'Perplexity', url: 'https://perplexity.ai', icon: '🔮', color: '#20808d'},
            {name: 'Midjourney', url: 'https://midjourney.com', icon: '🎨', color: '#000000'},
            {name: 'DALL-E', url: 'https://openai.com/dall-e', icon: '🖼️', color: '#10a37f'},
            {name: 'Canva', url: 'https://canva.com', icon: '🎭', color: '#00c4cc'},
            {name: 'Notion', url: 'https://notion.so', icon: '📝', color: '#000000'},
            {name: 'Grammarly', url: 'https://grammarly.com', icon: '✍️', color: '#15c39a'},
            {name: 'Google Translate', url: 'https://translate.google.com', icon: '🌐', color: '#4285f4'}
        ]
    },
    news: {
        icon: '📰',
        name: 'News',
        links: [
            {name: 'Google News', url: 'https://news.google.com', icon: '📢', color: '#4285f4'},
            {name: 'BBC News', url: 'https://bbc.com/news', icon: '🌍', color: '#bb1919'},
            {name: 'CNN', url: 'https://cnn.com', icon: '📺', color: '#cc0000'},
            {name: 'NDTV', url: 'https://ndtv.com', icon: '🎬', color: '#c8102e'},
            {name: 'Times of India', url: 'https://timesofindia.com', icon: '📰', color: '#ed1b24'},
            {name: 'The Hindu', url: 'https://thehindu.com', icon: '📄', color: '#000000'},
            {name: 'Al Jazeera', url: 'https://aljazeera.com', icon: '🌐', color: '#faa519'},
            {name: 'Reuters', url: 'https://reuters.com', icon: '🗞️', color: '#ff8000'}
        ]
    },
    developer: {
        icon: '💻',
        name: 'Developer',
        links: [
            {name: 'GitHub', url: 'https://github.com', icon: '🐙', color: '#181717'},
            {name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: '📚', color: '#f48024'},
            {name: 'CodePen', url: 'https://codepen.io', icon: '✏️', color: '#000000'},
            {name: 'MDN Docs', url: 'https://developer.mozilla.org', icon: '📖', color: '#000000'},
            {name: 'W3Schools', url: 'https://w3schools.com', icon: '🏫', color: '#04aa6d'},
            {name: 'freeCodeCamp', url: 'https://freecodecamp.org', icon: '🔥', color: '#0a0a23'},
            {name: 'LeetCode', url: 'https://leetcode.com', icon: '🧩', color: '#ffa116'},
            {name: 'Vercel', url: 'https://vercel.com', icon: '▲', color: '#000000'},
            {name: 'Netlify', url: 'https://netlify.com', icon: '🌐', color: '#00c7b7'},
            {name: 'Firebase', url: 'https://firebase.google.com', icon: '🔥', color: '#ffca28'}
        ]
    },
    finance: {
        icon: '💰',
        name: 'Finance',
        links: [
            {name: 'Google Pay', url: 'https://pay.google.com', icon: '💳', color: '#4285f4'},
            {name: 'PhonePe', url: 'https://phonepe.com', icon: '📱', color: '#5f259f'},
            {name: 'Paytm', url: 'https://paytm.com', icon: '💰', color: '#00baf2'},
            {name: 'PayPal', url: 'https://paypal.com', icon: '💵', color: '#0070ba'},
            {name: 'CRED', url: 'https://cred.club', icon: '💎', color: '#000000'},
            {name: 'Zerodha', url: 'https://zerodha.com', icon: '📈', color: '#387ed1'},
            {name: 'Groww', url: 'https://groww.in', icon: '🌱', color: '#00d09c'},
            {name: 'CoinDCX', url: 'https://coindcx.com', icon: '₿', color: '#0e1f56'}
        ]
    }
};

// ═══════════════════════════════════════════════════════
// 🤖 SMART API HANDLER (Auto-switch between APIs)
// ═══════════════════════════════════════════════════════

async function callAI(query, personality = 'normal', modelId = null) {
    const systemPrompt = PERSONALITIES[personality]?.prompt || PERSONALITIES.normal.prompt;
    const selectedModel = modelId || CONFIG.DEFAULT_MODEL;
    const modelInfo = CONFIG.MODELS[selectedModel];
    
    // Try selected model first
    try {
        if (modelInfo.api === 'groq') {
            return await callGroq(query, systemPrompt, modelInfo.model);
        } else if (modelInfo.api === 'openrouter') {
            return await callOpenRouter(query, systemPrompt, modelInfo.model);
        }
    } catch (error) {
        console.log('Primary API failed, trying backup...');
    }
    
    // Backup: Try Groq if OpenRouter failed
    if (modelInfo.api !== 'groq' && CONFIG.APIs.groq.enabled) {
        try {
            return await callGroq(query, systemPrompt, CONFIG.APIs.groq.model);
        } catch (e) {
            console.log('Groq backup failed');
        }
    }
    
    // Last backup: Try OpenRouter
    if (modelInfo.api !== 'openrouter' && CONFIG.APIs.openrouter.enabled) {
        try {
            return await callOpenRouter(query, systemPrompt, CONFIG.APIs.openrouter.model);
        } catch (e) {
            console.log('OpenRouter backup failed');
        }
    }
    
    throw new Error('All AI APIs failed. Please check your API keys.');
}

// ─────────────────────────────────────
// GROQ API CALL
// ─────────────────────────────────────
async function callGroq(query, systemPrompt, model) {
    const response = await fetch(CONFIG.APIs.groq.url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CONFIG.APIs.groq.key}`
        },
        body: JSON.stringify({
            model: model || CONFIG.APIs.groq.model,
            messages: [
                {role: 'system', content: systemPrompt},
                {role: 'user', content: query}
            ],
            max_tokens: 2000,
            temperature: 0.7
        })
    });
    
    if (!response.ok) throw new Error('Groq API failed');
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// ─────────────────────────────────────
// OPENROUTER API CALL
// ─────────────────────────────────────
async function callOpenRouter(query, systemPrompt, model) {
    const response = await fetch(CONFIG.APIs.openrouter.url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CONFIG.APIs.openrouter.key}`,
            'HTTP-Referer': CONFIG.APIs.openrouter.siteUrl,
            'X-Title': CONFIG.APIs.openrouter.siteName
        },
        body: JSON.stringify({
            model: model || CONFIG.APIs.openrouter.model,
            messages: [
                {role: 'system', content: systemPrompt},
                {role: 'user', content: query}
            ],
            max_tokens: 2000,
            temperature: 0.7
        })
    });
    
    if (!response.ok) throw new Error('OpenRouter API failed');
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// ─────────────────────────────────────
// CHAT API CALL (For conversations with history)
// ─────────────────────────────────────
async function callAIChat(messages, personality = 'normal', modelId = null) {
    const systemPrompt = PERSONALITIES[personality]?.prompt || PERSONALITIES.normal.prompt;
    const selectedModel = modelId || CONFIG.DEFAULT_MODEL;
    const modelInfo = CONFIG.MODELS[selectedModel];
    
    const fullMessages = [
        {role: 'system', content: systemPrompt},
        ...messages.slice(-10)  // Last 10 messages for context
    ];
    
    // Try selected model
    try {
        if (modelInfo.api === 'groq') {
            const response = await fetch(CONFIG.APIs.groq.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${CONFIG.APIs.groq.key}`
                },
                body: JSON.stringify({
                    model: modelInfo.model,
                    messages: fullMessages,
                    max_tokens: 2000
                })
            });
            const data = await response.json();
            return data.choices[0].message.content;
        } else {
            const response = await fetch(CONFIG.APIs.openrouter.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${CONFIG.APIs.openrouter.key}`,
                    'HTTP-Referer': CONFIG.APIs.openrouter.siteUrl,
                    'X-Title': CONFIG.APIs.openrouter.siteName
                },
                body: JSON.stringify({
                    model: modelInfo.model,
                    messages: fullMessages,
                    max_tokens: 2000
                })
            });
            const data = await response.json();
            return data.choices[0].message.content;
        }
    } catch (error) {
        throw new Error('AI response failed: ' + error.message);
    }
}