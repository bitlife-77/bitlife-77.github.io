/**
 * EDJOJO ACADEMIC VISUALIZER ENGINE
  
 */

// Global Variables
let allModules = [];  
let activeDataset = [];  
let loadedIndex = 0;
const BATCH_SIZE = 24;  
let currentModule = null;  

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// =============================================================
// 1.  (Topology Data)
// =============================================================
document.addEventListener('DOMContentLoaded', () => {
     
    initConstellationBackground();
  
    if (typeof ACADEMIC_DATASET !== 'undefined') {
        allModules = ACADEMIC_DATASET;
        activeDataset = ACADEMIC_DATASET;
        initSystem();
    } else {
        console.error("Critical Error: 'topology_data.js' reference missing.");
        document.body.innerHTML = `
            <div style="display:flex; height:100vh; justify-content:center; align-items:center; flex-direction:column; color:#94a3b8; font-family:sans-serif;">
                <h1 style="color:#e2e8f0;">System Maintenance: 503</h1>
                <p>The Academic Repository is currently updating its index.</p>
                <small>Error: Dataset_Topology_Null</small>
            </div>
        `;
    }
});

function initSystem() {
    const isSimulationPage = document.getElementById('game-frame') !== null;
    
    if (isSimulationPage) {
        setupSimulationPage();
    } else {
        setupRepositoryPage();
    }
}

// =============================================================
// 2. REPOSITORY (INDEX)  
// =============================================================
function setupRepositoryPage() {
    setupSearchEngine();
    setupLazyLoader();
    renderNextBatch();  
}

 
function setupSearchEngine() {
    const input = document.getElementById('search-input');
    if(!input) return;

    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (query.length < 2) {
            activeDataset = allModules;
        } else {
            activeDataset = allModules.filter(item => 
                item.label.toLowerCase().includes(query) || 
                (item.categories && item.categories.some(c => c.toLowerCase().includes(query)))
            );
        }

        loadedIndex = 0;
        const grid = document.getElementById('game-grid');
        if(grid) grid.innerHTML = '';
        
        renderNextBatch();
    });
}

 
function setupLazyLoader() {
    const sentinel = document.getElementById('loading-sentinel');
    if (!sentinel) return;
    
    const loaderIcon = sentinel.querySelector('.loader');

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            if (loadedIndex < activeDataset.length) {
                if(loaderIcon) loaderIcon.style.display = 'block';
                
                setTimeout(() => {
                    renderNextBatch();
                    if(loaderIcon) loaderIcon.style.display = 'none';
                }, 400);
            }
        }
    });

    observer.observe(sentinel);
}

 
function renderNextBatch() {
    const grid = document.getElementById('game-grid');
    if (!grid) return;

    const batch = activeDataset.slice(loadedIndex, loadedIndex + BATCH_SIZE);
    
    if (batch.length === 0 && loadedIndex === 0) {
        grid.innerHTML = '<p style="text-align:center; width:100%; color:#64748b; padding:40px;">No matching study units found in the database.</p>';
        return;
    }

    batch.forEach((module) => {
        const originalID = allModules.indexOf(module);
        
        const card = document.createElement('a');
        card.className = 'game-card';
        card.href = `study.html?id=${originalID}`;
        
        
        card.style.opacity = "0"; 
        card.style.animation = "fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards";

        const safeCategory = (module.categories && module.categories.length > 0) ? module.categories[0] : 'General Study';

        card.innerHTML = `
            <img src="${module.icon}" alt="Module Preview" loading="lazy" onerror="this.src='https://placehold.co/200x200/1e293b/FFF?text=No+Img'">
            <div class="info">
                <strong>${module.label}</strong>
                <span class="cat">${safeCategory}</span>
            </div>
        `;
        grid.appendChild(card);
    });

    loadedIndex += batch.length;
}

// =============================================================
// 3. SIMULATION  
// =============================================================
function setupSimulationPage() {
    const id = getQueryParam('id');
    const titleEl = document.getElementById('game-title');
    const idDisplay = document.getElementById('module-id-display');
    const randomGrid = document.getElementById('random-games');
	

    if (id !== null && allModules[id]) {
        currentModule = allModules[id];      
        titleEl.innerText = `Simulation Unit: ${currentModule.label}`;
        idDisplay.innerText = `#STU-${8490 + parseInt(id)}`; 
        document.title = `Advanced Physics Analysis: Unit ${parseInt(id)}`;

    } else {
        titleEl.innerText = "Module Indexing Error";
        document.getElementById('start-btn').style.display = 'none';
    }

    if(randomGrid) {
        const shuffled = [...allModules].sort(() => 0.5 - Math.random()).slice(0, 16);
        shuffled.forEach(mod => {
            const idx = allModules.indexOf(mod);
            const card = document.createElement('a');
            card.className = 'game-card';
            card.href = `study.html?id=${idx}`;
            card.innerHTML = `
                <img src="${mod.icon}" loading="lazy" onerror="this.src='https://placehold.co/100x100?text=Ref'">
                <div class="info" style="font-size:0.8rem;">Unit ${idx + 1}</div>
            `;
            randomGrid.appendChild(card);
        });
    }
}

 
window.startG4me = function() {
    const curtain = document.getElementById('game-curtain');
    const iframe = document.getElementById('game-frame');
    
    if (currentModule) {
        
        iframe.src = currentModule.src;
        
        
        curtain.style.display = 'none';
        
        
        iframe.focus();

         
        const id = getQueryParam('id');
        document.title = `Study ${parseInt(id)} Started`;
    }
};

 
function initConstellationBackground() {
    const container = document.getElementById('pixi-background');
    if (!container) return;

    try {
        const app = new PIXI.Application({ 
            backgroundAlpha: 0, 
            resizeTo: window,
            antialias: true
        });
        container.appendChild(app.view);

        const particleCount = window.innerWidth < 768 ? 30 : 60; 
        const connectionDistance = 140;
        const particles = [];
        
        let mouseX = -1000;
        let mouseY = -1000;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        for (let i = 0; i < particleCount; i++) {
            const p = new PIXI.Graphics();
            p.beginFill(0x38bdf8, 0.6); 
            p.drawCircle(0, 0, Math.random() * 2 + 1.5);
            p.endFill();
            
            p.x = Math.random() * app.screen.width;
            p.y = Math.random() * app.screen.height;
            p.vx = (Math.random() - 0.5) * 0.4; 
            p.vy = (Math.random() - 0.5) * 0.4;
            
            app.stage.addChild(p);
            particles.push(p);
        }

        const lines = new PIXI.Graphics();
        app.stage.addChild(lines);

        app.ticker.add(() => {
            lines.clear(); 
            
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if(p.x < 0 || p.x > app.screen.width) p.vx *= -1;
                if(p.y < 0 || p.y > app.screen.height) p.vy *= -1;

                const dxMouse = p.x - mouseX;
                const dyMouse = p.y - mouseY;
                const distMouse = Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse);
                
                if (distMouse < 150) {
                    p.x += dxMouse * 0.03;
                    p.y += dyMouse * 0.03;
                }

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);

                    if (dist < connectionDistance) {
                        const alpha = 1 - (dist / connectionDistance);
                        lines.lineStyle(1, 0x38bdf8, alpha * 0.25);
                        lines.moveTo(p.x, p.y);
                        lines.lineTo(p2.x, p2.y);
                    }
                }
            });
        });

    } catch (e) {
        console.warn("Visual engine fallback: WebGL not supported.");
    }
}

 
function toggleFullscreen() {
    const iframe = document.getElementById('game-frame');
    
    if (!iframe || !iframe.src) {
        alert("Please initialize the session first.");
        return;
    }

    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) { /* Safari */
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { /* IE11 */
        iframe.msRequestFullscreen();
    }
}