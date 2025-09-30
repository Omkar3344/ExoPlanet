// Enhanced Script.js with Interactive Components and Charts

// Initialize stars canvas
function initStarsCanvas() {
    const canvas = document.getElementById('starsCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars = [];
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            opacity: Math.random(),
            speed: Math.random() * 0.5
        });
    }
    
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
            
            // Twinkling effect
            star.opacity += (Math.random() - 0.5) * 0.02;
            star.opacity = Math.max(0.1, Math.min(1, star.opacity));
            
            // Slow movement
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(drawStars);
    }
    
    drawStars();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Create planet preview visualization
function initPlanetPreview() {
    const preview = document.getElementById('planetPreview');
    if (!preview) return;
    
    const orbit = document.createElement('div');
    orbit.className = 'planet-orbit';
    
    const planet = document.createElement('div');
    planet.className = 'planet';
    
    orbit.appendChild(planet);
    preview.appendChild(orbit);
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced navbar with scroll effects
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Change navbar background
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Interactive stats animation with realistic counting
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const suffix = stat.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current).toLocaleString() + suffix;
        }, stepTime);
    });
}

// Enhanced Intersection Observer with stagger animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate-in');
            }, index * 100);
            
            // Trigger specific animations
            if (entry.target.classList.contains('hero-stats')) {
                setTimeout(animateStats, 500);
            }
            
            if (entry.target.classList.contains('performance-charts')) {
                setTimeout(initializeCharts, 800);
            }
            
            if (entry.target.classList.contains('model-metrics')) {
                setTimeout(animateMetrics, 600);
            }
        }
    });
}, observerOptions);

// Interactive exoplanet cards with detailed hover effects
function initializeExoplanetCards() {
    document.querySelectorAll('.exoplanet-card').forEach((card, index) => {
        // Add unique data
        const planetData = {
            name: card.querySelector('h3').textContent,
            distance: `${Math.floor(Math.random() * 500 + 50)} ly`,
            habitability: Math.floor(Math.random() * 100),
            discovered: `20${Math.floor(Math.random() * 23).toString().padStart(2, '0')}`
        };
        
        card.setAttribute('data-planet', JSON.stringify(planetData));
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(64, 224, 255, 0.3)';
            
            // Show additional info on hover
            const infoPanel = this.querySelector('.planet-info-panel');
            if (infoPanel) {
                infoPanel.style.opacity = '1';
                infoPanel.style.transform = 'translateY(0)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            
            const infoPanel = this.querySelector('.planet-info-panel');
            if (infoPanel) {
                infoPanel.style.opacity = '0';
                infoPanel.style.transform = 'translateY(20px)';
            }
        });
        
        // Interactive click with modal
        card.addEventListener('click', function() {
            showPlanetModal(planetData);
        });
    });
}

// Planet modal functionality
function showPlanetModal(planetData) {
    const modal = document.createElement('div');
    modal.className = 'planet-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${planetData.name}</h2>
            <div class="modal-body">
                <div class="planet-visual">
                    <div class="planet-sphere"></div>
                </div>
                <div class="planet-details">
                    <p><strong>Distance:</strong> ${planetData.distance}</p>
                    <p><strong>Habitability Score:</strong> ${planetData.habitability}%</p>
                    <p><strong>Discovered:</strong> ${planetData.discovered}</p>
                    <div class="habitability-bar">
                        <div class="habitability-fill" style="width: ${planetData.habitability}%"></div>
                    </div>
                </div>
            </div>
            <button class="view-details-btn">View Full Analysis</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Modal controls
    modal.querySelector('.close-modal').onclick = () => modal.remove();
    modal.querySelector('.view-details-btn').onclick = () => {
        window.location.href = 'exoplanet-detail.html';
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// Performance Charts using Chart.js-like functionality
function initializeCharts() {
    // Model Accuracy Chart
    createChart('accuracyChart', {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            datasets: [{
                label: 'Model Accuracy',
                data: [85, 87, 90, 92, 94, 96],
                borderColor: '#40E0FF',
                backgroundColor: 'rgba(64, 224, 255, 0.1)',
                tension: 0.4
            }]
        }
    });
    
    // Habitability Distribution Chart
    createChart('habitabilityChart', {
        type: 'doughnut',
        data: {
            labels: ['Habitable', 'Potentially Habitable', 'Not Habitable'],
            datasets: [{
                data: [15, 35, 50],
                backgroundColor: ['#00FF88', '#FFB347', '#FF6B6B'],
                borderWidth: 0
            }]
        }
    });
    
    // Performance Metrics Chart
    createChart('metricsChart', {
        type: 'bar',
        data: {
            labels: ['Precision', 'Recall', 'F1-Score', 'AUC'],
            datasets: [{
                label: 'Performance Metrics',
                data: [0.94, 0.91, 0.92, 0.96],
                backgroundColor: 'rgba(64, 224, 255, 0.8)',
                borderColor: '#40E0FF',
                borderWidth: 2
            }]
        }
    });
}

// Simple chart creation function
function createChart(canvasId, config) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { type, data } = config;
    
    // Simple implementation for demonstration
    // In production, you'd use Chart.js or similar library
    drawSimpleChart(ctx, type, data);
}

function drawSimpleChart(ctx, type, data) {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    if (type === 'line') {
        drawLineChart(ctx, data, width, height);
    } else if (type === 'bar') {
        drawBarChart(ctx, data, width, height);
    } else if (type === 'doughnut') {
        drawDoughnutChart(ctx, data, width, height);
    }
}

function drawLineChart(ctx, data, width, height) {
    const margin = 40;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;
    
    const values = data.datasets[0].data;
    const max = Math.max(...values);
    const min = Math.min(...values);
    
    ctx.strokeStyle = data.datasets[0].borderColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    values.forEach((value, index) => {
        const x = margin + (index / (values.length - 1)) * chartWidth;
        const y = margin + ((max - value) / (max - min)) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Add points
    ctx.fillStyle = data.datasets[0].borderColor;
    values.forEach((value, index) => {
        const x = margin + (index / (values.length - 1)) * chartWidth;
        const y = margin + ((max - value) / (max - min)) * chartHeight;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
    });
}

function drawBarChart(ctx, data, width, height) {
    const margin = 40;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;
    
    const values = data.datasets[0].data;
    const max = Math.max(...values);
    const barWidth = chartWidth / values.length * 0.8;
    const barSpacing = chartWidth / values.length * 0.2;
    
    ctx.fillStyle = data.datasets[0].backgroundColor;
    
    values.forEach((value, index) => {
        const x = margin + index * (barWidth + barSpacing);
        const barHeight = (value / max) * chartHeight;
        const y = margin + chartHeight - barHeight;
        
        ctx.fillRect(x, y, barWidth, barHeight);
    });
}

function drawDoughnutChart(ctx, data, width, height) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    const innerRadius = radius * 0.6;
    
    const values = data.datasets[0].data;
    const total = values.reduce((sum, val) => sum + val, 0);
    const colors = data.datasets[0].backgroundColor;
    
    let currentAngle = -Math.PI / 2;
    
    values.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
        ctx.closePath();
        
        ctx.fillStyle = colors[index];
        ctx.fill();
        
        currentAngle += sliceAngle;
    });
}

// Interactive model metrics animation
function animateMetrics() {
    const metrics = document.querySelectorAll('.metric-bar');
    metrics.forEach((bar, index) => {
        setTimeout(() => {
            const fill = bar.querySelector('.metric-fill');
            const percentage = fill.getAttribute('data-percentage');
            fill.style.width = percentage + '%';
        }, index * 200);
    });
}

// About page navigation fix
function initializeNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === 'about.html') {
                e.preventDefault();
                // Scroll to about section or show about modal
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    showAboutModal();
                }
            }
        });
    });
}

function showAboutModal() {
    const modal = document.createElement('div');
    modal.className = 'about-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>About Our Mission</h2>
            <div class="about-content">
                <p>Our advanced machine learning model analyzes exoplanet data to determine habitability potential. Using cutting-edge algorithms and comprehensive datasets, we provide accurate assessments of distant worlds.</p>
                <div class="mission-stats">
                    <div class="mission-stat">
                        <h3>5,000+</h3>
                        <p>Exoplanets Analyzed</p>
                    </div>
                    <div class="mission-stat">
                        <h3>96%</h3>
                        <p>Model Accuracy</p>
                    </div>
                    <div class="mission-stat">
                        <h3>24/7</h3>
                        <p>Continuous Monitoring</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// Interactive search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-btn');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const query = document.querySelector('.search-input').value;
    if (query.trim()) {
        // Filter exoplanets based on search
        filterExoplanets(query);
    }
}

function filterExoplanets(query) {
    const cards = document.querySelectorAll('.exoplanet-card');
    cards.forEach(card => {
        const planetName = card.querySelector('h3').textContent.toLowerCase();
        if (planetName.includes(query.toLowerCase())) {
            card.style.display = 'block';
            card.classList.add('search-highlight');
        } else {
            card.style.display = 'none';
        }
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            mobileToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Parallax effects for realistic feel
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Hero parallax
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        // Background stars
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            const speed = 0.1 + (index % 3) * 0.05;
            star.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Loading screen
function initializeLoader() {
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.classList.add('loaded');
            }, 500);
        }
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize canvas and visual elements
    initStarsCanvas();
    initPlanetPreview();
    
    // Observe elements for animations
    const animateElements = document.querySelectorAll(
        '.hero-stats, .exoplanet-card, .step-item, .performance-charts, .model-metrics, .analysis-item'
    );
    
    animateElements.forEach(el => observer.observe(el));
    
    // Initialize all interactive components
    initializeExoplanetCards();
    initializeNavigation();
    initializeSearch();
    initializeMobileMenu();
    initializeParallax();
    initializeLoader();
    
    // Initialize filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const cards = document.querySelectorAll('.exoplanet-card');
            
            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Add interactive hover effects to buttons
    document.querySelectorAll('.btn, .contact-btn, .learn-more-btn, .cta-button').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(64, 224, 255, 0.4)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(64, 224, 255, 0.2)';
        });
    });
});

// Add dynamic CSS animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
        animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    @keyframes slideInUp {
        0% {
            opacity: 0;
            transform: translateY(50px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .search-highlight {
        border: 2px solid #40E0FF;
        animation: glow 1.5s ease-in-out infinite alternate;
    }
    
    @keyframes glow {
        from { box-shadow: 0 0 20px rgba(64, 224, 255, 0.4); }
        to { box-shadow: 0 0 30px rgba(64, 224, 255, 0.8); }
    }
    
    .metric-fill {
        transition: width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a0a;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    }
    
    .loader::before {
        content: '';
        width: 50px;
        height: 50px;
        border: 3px solid rgba(64, 224, 255, 0.3);
        border-top: 3px solid #40E0FF;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(dynamicStyles);

// Error handling and fallbacks
window.addEventListener('error', function(e) {
    console.log('An error occurred:', e.error);
    // Fallback functionality could be added here
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals
        document.querySelectorAll('.planet-modal, .about-modal').forEach(modal => {
            modal.remove();
        });
    }
});