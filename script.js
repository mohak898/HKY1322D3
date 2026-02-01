/**
 * Greenwood School Website - Core Logic & Professional Interactions
 * Engineered by HIKAT
 */

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    initScrollAnimations();
});

// Navigation Data with Complete Hierarchy
const navLinks = [
    { name: 'Home', path: 'index.html' },
    { name: 'About Us', path: 'about.html' },
    // { name: 'Administration', path: 'administration.html' },
    { name: 'Academics', path: 'academics.html' },
    { name: 'Admissions', path: 'admissions.html' },
    { name: 'Achievements', path: 'achievements.html' },
    { name: 'Events', path: 'events.html' },
    { name: 'Bulletin', path: 'bulletin-board.html' }, // Keeping filename as requested, display name Bulletin
    { name: 'Fee', path: 'fees.html' }, // Display Name Fee
    { name: 'Alumni', path: 'alumni.html' },
    { name: 'Helpdesk', path: 'helpdesk.html' }
];

function loadHeader() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Check if we are inside a subdirectory if pages move there, but assuming flat structure for now

    const headerHTML = `
        <nav class="navbar">
            <div class="logo-container">
                <a href="index.html" class="logo" style="display: flex; align-items: center; gap: 15px;">
                     <img src="assets/logo.png" alt="Greenwood School Logo" style="height: 60px; width: auto; object-fit: contain;">
                     <div style="display: flex; flex-direction: column; justify-content: center;">
                        <span style="font-family: var(--font-heading); font-size: 1.4rem; color: var(--primary-green); letter-spacing: 0.5px; font-weight: 700; line-height: 1;">GREENWOOD</span>
                        <span style="font-family: var(--font-body); font-size: 0.8rem; color: var(--text-grey); letter-spacing: 2px; text-transform: uppercase;">International School</span>
                     </div>
                </a>
            </div>
            
            <div class="mobile-toggle" id="mobile-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
            
            <ul class="nav-links" id="nav-links">
                ${navLinks.map(link => `
                    <li>
                        <a href="${link.path}" class="${isActive(link.path)}">
                            ${link.name}
                        </a>
                    </li>
                `).join('')}
            </ul>
        </nav>
    `;

    // Insert at the beginning of the body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // Init Mobile Menu Logic after injection
    initMobileMenu();
}

function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const nav = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click from bubbling
        nav.classList.toggle('active');
        toggle.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && !nav.contains(e.target) && !toggle.contains(e.target)) {
            nav.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

function loadFooter() {
    const footerHTML = `
        <footer class="main-footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Greenwood School</h3>
                    <p style="margin-bottom: 15px;">Empowering students to become global leaders through excellence in education and character development.</p>
                    <p><strong>Address:</strong> 123 Education Lane, Knowledge City</p>
                    <p><strong>Affiliation:</strong> CBSE (New Delhi)</p>
                </div>
                
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        ${navLinks.slice(0, 5).map(link => `<li><a href="${link.path}">${link.name}</a></li>`).join('')}
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Resources</h3>
                    <ul>
                         ${navLinks.slice(5).map(link => `<li><a href="${link.path}">${link.name}</a></li>`).join('')}
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Contact Us</h3>
                    <p><strong>Phone:</strong> <a href="tel:+919876543210">+91 98765 43210</a></p>
                    <p><strong>Email:</strong> <a href="mailto:info@greenwoodschool.edu">info@greenwoodschool.edu</a></p>
                    <div style="margin-top: 20px; display: flex; gap: 20px;">
                        <!-- Facebook Icon -->
                        <a href="#" aria-label="Facebook">
                            <svg class="social-icon" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.97c0-2.18 1.69-3.23 4.57-3.23.82 0 1.95.14 1.95.14v3.13h-1.09c-1.38 0-1.63.7-1.63 1.55V12h3.29l-.53 3h-2.76v6.8C18.56 20.87 22 16.84 22 12z"/>
                            </svg>
                        </a>
                        <!-- Twitter/X Icon -->
                        <a href="#" aria-label="Twitter">
                            <svg class="social-icon" viewBox="0 0 24 24">
                                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71-.02-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.15.15-.27 0-.54-.02-.8-.06.55 1.71 2.14 2.95 4.04 2.99-1.46 1.15-3.32 1.83-5.29 1.83-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                            </svg>
                        </a>
                        <!-- Instagram Icon -->
                        <a href="#" aria-label="Instagram">
                             <svg class="social-icon" viewBox="0 0 24 24">
                                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} Greenwood School. All Rights Reserved.</p>
                <p class="hikat-credit">
                    Engineered and maintained by 
                    <a href="https://hikat.xyz" target="_blank" style="color: var(--accent-yellow); text-decoration: none; font-weight: 700; border-bottom: 2px solid transparent; transition: all 0.3s;">HIKAT</a>
                </p>
            </div>
        </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function isActive(path) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    // exact match
    return currentPath === path ? 'active-link' : '';
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    // Observe all elements with .animate-on-scroll
    // Also auto-add to cards if they don't have it
    document.querySelectorAll('.card, .animate-on-scroll').forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        if (!el.style.transitionDelay) {
            // Add slight stagger effect based on index (modulo 3 for grids)
            el.style.transitionDelay = `${(index % 3) * 0.1}s`;
        }
        observer.observe(el);
    });
}
