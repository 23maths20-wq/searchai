// Fix back button cache issue
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        window.location.reload();
    }
});
// ============ AUTH SYSTEM (Local Storage) ============

function switchTab(tab, btn) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    
    btn.classList.add('active');
    document.getElementById(`${tab}Form`).classList.add('active');
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('✅ Login successful!');
        window.location.href = 'dashboard.html';
    } else {
        alert('❌ Invalid email or password');
    }
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.find(u => u.email === email)) {
        alert('❌ Email already exists!');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name, email, password,
        plan: 'free',
        joined: new Date().toISOString(),
        searches: 0,
        credits: 20
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    alert('🎉 Account created!');
    window.location.href = 'dashboard.html';
}

function socialLogin(provider) {
    // Demo social login
    const user = {
        id: Date.now(),
        name: 'Demo User',
        email: `demo@${provider}.com`,
        plan: 'free',
        joined: new Date().toISOString(),
        searches: 0,
        credits: 20,
        provider: provider
    };
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert(`✅ Logged in with ${provider}!`);
    window.location.href = 'dashboard.html';
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}