// User login/registration system
document.addEventListener('DOMContentLoaded', function() {
    // Find the "Log in" link in the header
    const loginLink = document.querySelector('.right a:last-child');
    
    if (!loginLink) {
        console.error('Login link not found');
        return;
    }
    
    // Check if user is already logged in
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    // Update login link text if user is already logged in
    if (loggedInUser) {
        loginLink.textContent = loggedInUser.name;
    }
    
    // Create and add the login/register modal
    function createLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'login-modal';
        modal.id = 'login-modal';
        
        modal.innerHTML = `
            <div class="login-container">
                <button class="close-btn" id="close-login">&times;</button>
                
                <div class="login-header">
                    <h2>${loggedInUser ? 'User Profile' : 'Log In/Register'}</h2>
                </div>
                
                ${loggedInUser ? createUserProfileContent() : createLoginRegisterContent()}
            </div>
        `;
        
        // Add modal styles
        const modalStyles = document.createElement('style');
        modalStyles.innerHTML = `
            /* Login Modal Styles */
            .login-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.6);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .login-modal.active {
                opacity: 1;
                visibility: visible;
            }
            
            .login-container {
                background-color: white;
                width: 90%;
                max-width: 500px;
                border-radius: 12px;
                padding: 30px;
                position: relative;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                transform: translateY(20px);
                transition: transform 0.3s ease;
            }
            
            .login-modal.active .login-container {
                transform: translateY(0);
            }
            
            .close-btn {
                position: absolute;
                top: 15px;
                right: 15px;
                font-size: 28px;
                background: none;
                border: none;
                cursor: pointer;
                color: #333;
            }
            
            .login-header {
                text-align: center;
                margin-bottom: 25px;
            }
            
            .login-header h2 {
                font-size: 28px;
                font-weight: 500;
                color: #333;
            }
            
            .login-tabs {
                display: flex;
                justify-content: center;
                margin-bottom: 25px;
                border-bottom: 1px solid #eee;
            }
            
            .tab-btn {
                padding: 10px 20px;
                background: none;
                border: none;
                font-size: 18px;
                font-weight: 500;
                color: #666;
                cursor: pointer;
                position: relative;
                transition: color 0.3s ease;
            }
            
            .tab-btn.active {
                color: #17689c;
            }
            
            .tab-btn.active::after {
                content: '';
                position: absolute;
                bottom: -1px;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: #17689c;
            }
            
            .tab-content {
                display: none;
            }
            
            .tab-content.active {
                display: block;
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-group label {
                display: block;
                font-size: 16px;
                margin-bottom: 8px;
                color: #666;
            }
            
            .form-group input {
                width: 100%;
                padding: 12px 15px;
                border: 1px solid #ddd;
                border-radius: 8px;
                font-size: 16px;
                background-color: #f5f5f5;
            }
            
            .form-group input:focus {
                outline: none;
                border-color: #17689c;
            }
            
            .login-btn {
                width: 100%;
                padding: 12px;
                background-color: #17689c;
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 18px;
                font-weight: 400;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            
            .login-btn:hover {
                background-color:rgb(7, 42, 138);
            }
            
            .divider {
                text-align: center;
                margin: 25px 0;
                position: relative;
            }
            
            .divider::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 0;
                width: 100%;
                height: 1px;
                background-color: #eee;
            }
            
            .divider span {
                position: relative;
                background-color: white;
                padding: 0 15px;
                color: #666;
                font-size: 14px;
            }
            
            .social-login {
                display: flex;
                justify-content: center;
                gap: 15px;
            }
            
            .social-btn {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: 1px solid #ddd;
                background: none;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: transform 0.2s ease;
            }
            
            .social-btn:hover {
                transform: translateY(-3px);
            }
            
            .social-btn img {
                width: 25px;
                height: 25px;
                object-fit: contain;
            }
            
            .user-profile {
                padding: 20px 0;
                text-align: center;
            }
            
            .user-avatar {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                margin: 0 auto 20px;
                background-color: #f0f0f0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 36px;
                color: #17689c;
                font-weight: bold;
            }
            
            .user-info {
                margin-bottom: 30px;
            }
            
            .user-info h3 {
                font-size: 24px;
                margin-bottom: 5px;
                color: #333;
            }
            
            .user-info p {
                color: #666;
                font-size: 16px;
            }
            
            .logout-btn {
                background-color: #e74c3c;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            
            .logout-btn:hover {
                background-color: #c0392b;
            }
            
            @media (max-width: 768px) {
                .login-container {
                    padding: 25px 20px;
                }
                
                .login-header h2 {
                    font-size: 24px;
                }
                
                .tab-btn {
                    font-size: 16px;
                    padding: 8px 15px;
                }
                
                .form-group input {
                    padding: 10px 12px;
                }
                
                .login-btn {
                    padding: 10px;
                    font-size: 16px;
                }
                
                .social-btn {
                    width: 45px;
                    height: 45px;
                }
                
                .social-btn img {
                    width: 22px;
                    height: 22px;
                }
                
                .user-avatar {
                    width: 80px;
                    height: 80px;
                    font-size: 30px;
                }
            }
        `;
        
        document.head.appendChild(modalStyles);
        document.body.appendChild(modal);
        
        return modal;
    }
    
    // Create user profile content for logged in users
    function createUserProfileContent() {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        const initials = user.name.split(' ').map(part => part[0]).join('').toUpperCase();
        
        return `
            <div class="user-profile">
                <div class="user-avatar">${initials}</div>
                <div class="user-info">
                    <h3>${user.name}</h3>
                    <p>${user.email}</p>
                </div>
                <button class="logout-btn" id="logout-btn">Log Out</button>
            </div>
        `;
    }
    
    // Create login/register content for non-logged in users
    function createLoginRegisterContent() {
        return `
            <div class="login-tabs">
                <button class="tab-btn active" data-tab="login">Log In</button>
                <button class="tab-btn" data-tab="signup">Sign Up</button>
            </div>
            
            <!-- Login Form -->
            <div class="tab-content active" id="login-tab">
                <form id="login-form">
                    <div class="form-group">
                        <label for="email">Email/Mobile Number</label>
                        <input type="text" id="email" placeholder="Enter your email or mobile number">
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password">
                    </div>
                    
                    <button type="submit" class="login-btn">Continue</button>
                </form>
                
                <div class="divider">
                    <span>or log in with</span>
                </div>
                
                <div class="social-login">
                    <button class="social-btn apple"><img src="images/apple.png" alt="Apple"></button>
                    <button class="social-btn google"><img src="images/google.png" alt="Google"></button>
                    <button class="social-btn instagram"><img src="images/instagram.png" alt="Instagram"></button>
                    <button class="social-btn facebook"><img src="images/facebook.png" alt="Facebook"></button>
                </div>
            </div>
            
            <!-- Registration Form -->
            <div class="tab-content" id="signup-tab">
                <form id="signup-form">
                    <div class="form-group">
                        <label for="signup-name">Full Name</label>
                        <input type="text" id="signup-name" placeholder="Enter your full name">
                    </div>
                    
                    <div class="form-group">
                        <label for="signup-email">Email/Mobile Number</label>
                        <input type="text" id="signup-email" placeholder="Enter your email or mobile number">
                    </div>
                    
                    <div class="form-group">
                        <label for="signup-password">Create Password</label>
                        <input type="password" id="signup-password" placeholder="Create a password">
                    </div>
                    
                    <div class="form-group">
                        <label for="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" placeholder="Confirm your password">
                    </div>
                    
                    <button type="submit" class="login-btn">Sign Up</button>
                </form>
                
                <div class="divider">
                    <span>or sign up with</span>
                </div>
                
                <div class="social-login">
                    <button class="social-btn apple"><img src="images/apple.png" alt="Apple"></button>
                    <button class="social-btn google"><img src="images/google.png" alt="Google"></button>
                    <button class="social-btn instagram"><img src="images/instagram.png" alt="Instagram"></button>
                    <button class="social-btn facebook"><img src="images/facebook.png" alt="Facebook"></button>
                </div>
            </div>
        `;
    }
    
    // Modal reference
    let loginModal;
    
    // Add click listener to login link
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Always check for current login state
        const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
        
        // Create or recreate modal to ensure up-to-date state
        if (loginModal) {
            document.body.removeChild(loginModal);
        }
        
        loginModal = createLoginModal();
        setupModalEvents();
        
        // Show modal
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
    
    // Setup all modal event handlers
    function setupModalEvents() {
        const closeBtn = document.getElementById('close-login');
        const tabBtns = document.querySelectorAll('.tab-btn');
        
        // Close button
        closeBtn.addEventListener('click', function() {
            loginModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Click outside to close
        loginModal.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Tab switching
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all tabs
                tabBtns.forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Add active class to current tab
                this.classList.add('active');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
        
        // Handle login form submission
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                // Get stored users
                const users = JSON.parse(localStorage.getItem('users')) || [];
                
                // Find matching user
                const user = users.find(u => u.email === email && u.password === password);
                
                if (user) {
                    // Store logged in user (excluding password)
                    const loggedInUser = {
                        name: user.name,
                        email: user.email
                    };
                    
                    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                    
                    // Update login link text
                    loginLink.textContent = user.name;
                    
                    // Close modal
                    loginModal.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    alert('Login successful!');
                } else {
                    alert('Invalid email or password. Please try again.');
                }
            });
        }
        
        // Handle signup form submission
        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('signup-name').value;
                const email = document.getElementById('signup-email').value;
                const password = document.getElementById('signup-password').value;
                const confirmPassword = document.getElementById('confirm-password').value;
                
                // Basic validation
                if (!name || !email || !password) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                if (password !== confirmPassword) {
                    alert('Passwords do not match.');
                    return;
                }
                
                // Get existing users
                const users = JSON.parse(localStorage.getItem('users')) || [];
                
                // Check if user already exists
                if (users.some(user => user.email === email)) {
                    alert('An account with this email already exists. Please log in.');
                    return;
                }
                
                // Add new user
                const newUser = {
                    name,
                    email,
                    password
                };
                
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                
                // Auto-login
                const loggedInUser = {
                    name,
                    email
                };
                
                localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                
                // Update login link text
                loginLink.textContent = name;
                
                // Close modal
                loginModal.classList.remove('active');
                document.body.style.overflow = '';
                
                alert('Registration successful! You are now logged in.');
            });
        }
        
        // Handle logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                // Remove logged in user
                localStorage.removeItem('loggedInUser');
                
                // Reset login link text
                loginLink.textContent = 'Log in';
                
                // Close modal
                loginModal.classList.remove('active');
                document.body.style.overflow = '';
                
                alert('You have been successfully logged out.');
            });
        }
    }
}); 