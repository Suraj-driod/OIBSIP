// Simple hash function for password (NOT secure for production - use bcrypt on backend)
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(16);
}

// Get users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Register new user
function register(name, email, password) {
    const users = getUsers();
    
    if (users.find(u => u.email === email)) {
        return { success: false, message: 'Email already registered' };
    }
    
    const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: simpleHash(password)
    };
    
    users.push(newUser);
    saveUsers(users);
    
    // Auto login after registration
    setSession(newUser);
    
    return { success: true };
}

// Login user
function login(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email.toLowerCase().trim());
    
    if (!user) {
        return { success: false, message: 'Invalid email or password' };
    }
    
    if (user.password !== simpleHash(password)) {
        return { success: false, message: 'Invalid email or password' };
    }
    
    setSession(user);
    return { success: true };
}

// Set user session
function setSession(user) {
    const session = {
        id: user.id,
        name: user.name,
        email: user.email,
        loginTime: Date.now()
    };
    localStorage.setItem('session', JSON.stringify(session));
}

// Get current user from session
function getCurrentUser() {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : null;
}

// Logout user
function logout() {
    localStorage.removeItem('session');
}

// Check authentication state
function checkAuth(page) {
    const user = getCurrentUser();
    
    if (page === 'dashboard' && !user) {
        // Redirect to login if not authenticated
        window.location.href = 'index.html';
    } else if (page === 'login' && user) {
        // Redirect to dashboard if already logged in
        window.location.href = 'dashboard.html';
    }
}

// Show error message
function showError(message) {
    const errorEl = document.getElementById('errorMsg');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.animation = 'none';
        errorEl.offsetHeight; // Trigger reflow
        errorEl.style.animation = 'shake 0.3s ease';
    }
}
