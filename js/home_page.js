// Get elements
let word_one = document.getElementById('word_one');
let word_two = document.getElementById('word_two');
let word_three = document.getElementById('word_three');

// Create diagnostic overlay
function createDiagnosticOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'diagnostic-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        font-family: monospace;
        padding: 10px;
        z-index: 9999;
        max-width: 300px;
        font-size: 12px;
        border-radius: 5px;
    `;
    document.body.appendChild(overlay);
    return overlay;
}

// Initial headline reveal animation
function headlineReveal() {
    setTimeout(() => {
        word_one.classList.remove('hidden');
        word_one.classList.add('visible');
        
        setTimeout(() => {
            word_two.classList.remove('hidden');
            word_two.classList.add('visible');

            setTimeout(() => {
                word_three.classList.remove('hidden');
                word_three.classList.add('visible');
            }, 1000)
        }, 1000)
    }, 3000)
} 

document.addEventListener('DOMContentLoaded', () => {
    // Run headline animation
    headlineReveal();

    // Create diagnostic overlay
    const diagnosticOverlay = createDiagnosticOverlay();
    
    // Get background container
    const bgContainer = document.querySelector('.bg-container');
    
    // Function to update diagnostic info
    function updateDiagnostics() {
        if (!bgContainer) return;

        // Get computed styles
        const computedStyle = window.getComputedStyle(bgContainer);
        
        // Get transform matrix values
        const transform = computedStyle.transform || computedStyle.webkitTransform;
        let scale = 1;
        if (transform && transform !== 'none') {
            const matrixValues = transform.match(/matrix.*\((.+)\)/);
            if (matrixValues && matrixValues[1]) {
                const values = matrixValues[1].split(', ');
                // In a 2D matrix, scale X is in position 0, scale Y is in position 3
                // In a 3D matrix, scale X is in position 0, scale Y is in position 5
                scale = values.length === 6 ? Math.sqrt(values[0]**2 + values[1]**2) : 
                                             Math.sqrt(values[0]**2 + values[1]**2 + values[2]**2);
            }
        }
        
        // Get element dimensions and position
        const rect = bgContainer.getBoundingClientRect();
        
        // Get scroll position
        const scrollY = window.scrollY;
        
        // Update diagnostic overlay
        diagnosticOverlay.innerHTML = `
            <div><strong>Scroll Position:</strong> ${scrollY}px</div>
            <div><strong>BG Container:</strong></div>
            <div>- Width: ${rect.width.toFixed(2)}px</div>
            <div>- Height: ${rect.height.toFixed(2)}px</div>
            <div>- Top: ${rect.top.toFixed(2)}px</div>
            <div>- Transform Scale: ~${scale.toFixed(3)}</div>
            <div>- Background Size: ${computedStyle.backgroundSize}</div>
            <div>- Background Position: ${computedStyle.backgroundPosition}</div>
            <div>- Background Attachment: ${computedStyle.backgroundAttachment}</div>
            <div><strong>Window:</strong></div>
            <div>- Inner Height: ${window.innerHeight}px</div>
            <div>- Outer Height: ${window.outerHeight}px</div>
            <br>
            <div><em>Toggle this display with 'D' key</em></div>
        `;
    }
    
    // Update on scroll
    window.addEventListener('scroll', function() {
        updateDiagnostics();
    }, { passive: true });
    
    // Update on resize
    window.addEventListener('resize', updateDiagnostics);
    
    // Initial update
    updateDiagnostics();
    
    // Allow toggling the diagnostic display with 'D' key
    document.addEventListener('keydown', function(event) {
        if (event.key.toLowerCase() === 'd') {
            diagnosticOverlay.style.display = 
                diagnosticOverlay.style.display === 'none' ? 'block' : 'none';
        }
    });
    
    // Actually remove all zoom effects
    if (bgContainer) {
        // Force the background to have no transform
        bgContainer.style.transform = 'none';
        bgContainer.style.transition = 'none';
        bgContainer.style.backgroundAttachment = 'scroll';
        
        // Override any other properties that might cause visual changes on scroll
        bgContainer.style.setProperty('transform', 'none', 'important');
        bgContainer.style.setProperty('transition', 'none', 'important');
        bgContainer.style.setProperty('animation', 'none', 'important');
        bgContainer.style.setProperty('background-attachment', 'scroll', 'important');
    }
});

// Fix for 100vh on mobile browsers
function setVhVariable() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set the --vh variable on initial load and resize
window.addEventListener('resize', setVhVariable);
setVhVariable();