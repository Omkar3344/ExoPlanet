// Model Page Interactive Elements

document.addEventListener('DOMContentLoaded', () => {
    // Initialize 3D background
    init3DBackground();
    
    // Animate module cards on scroll
    animateModulesOnScroll();
    
    // Add interactive hover effects
    addInteractiveEffects();
});

// Initialize 3D rotating planet background
function init3DBackground() {
    const container = document.getElementById('threeContainer');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create planet
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    
    // Create earth-like material
    const material = new THREE.MeshPhongMaterial({
        color: 0x4a90e2,
        emissive: 0x1a3a5a,
        specular: 0x4fc3f7,
        shininess: 50,
        transparent: true,
        opacity: 0.6
    });
    
    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);
    
    // Add atmosphere glow
    const glowGeometry = new THREE.SphereGeometry(2.2, 64, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x40e0ff,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);
    
    // Add ring
    const ringGeometry = new THREE.TorusGeometry(3, 0.1, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x9b59b6,
        transparent: true,
        opacity: 0.4
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    camera.position.z = 8;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        planet.rotation.y += 0.002;
        planet.rotation.x += 0.001;
        glow.rotation.y += 0.002;
        glow.rotation.x += 0.001;
        ring.rotation.z += 0.005;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Animate modules on scroll
function animateModulesOnScroll() {
    const modules = document.querySelectorAll('.pipeline-module, .process-step, .feature-box');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    modules.forEach(module => observer.observe(module));
}

// Add interactive hover effects
function addInteractiveEffects() {
    // Module cards
    const modules = document.querySelectorAll('.pipeline-module');
    modules.forEach(module => {
        module.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 50px rgba(64, 224, 255, 0.3)';
        });
        
        module.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(64, 224, 255, 0.1)';
        });
    });
    
    // Code examples - add copy functionality
    const codeBlocks = document.querySelectorAll('.code-example');
    codeBlocks.forEach(block => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-code-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        copyBtn.onclick = () => {
            const code = block.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                }, 2000);
            });
        };
        block.appendChild(copyBtn);
    });
}
