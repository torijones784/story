let word_one = document.getElementById('word_one');
let word_two = document.getElementById('word_two');
let word_three = document.getElementById('word_three');
let zoomLevel = 1;
let zoomingIn = true;
let animationActive = true;
let zoomAnimationId = null;

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

function animateBackgroundZoom() {
    const bgContainer = document.querySelector('.bg-container');
    
    function performZoom() {
        if (!animationActive) return;
        
        if (zoomingIn) {
            zoomLevel += 0.0005;
            if (zoomLevel >= 1.1) {
                zoomingIn = false;
            }
        } else {
            zoomLevel -= 0.0005;
            if (zoomLevel <= 1) {
                zoomingIn = true;
            }
        }

        bgContainer.style.transform = `scale(${zoomLevel})`;
        
        zoomAnimationId = requestAnimationFrame(performZoom);
    }

    zoomAnimationId = requestAnimationFrame(performZoom);
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            if (!animationActive) {
                animationActive = true;
                requestAnimationFrame(performZoom);
            }
        } else {
            animationActive = false;
            if (zoomAnimationId) {
                cancelAnimationFrame(zoomAnimationId);
                zoomAnimationId = null;
            }
        }
    });
    
    observer.observe(document.querySelector('.landing_page'));
}


document.addEventListener('DOMContentLoaded', () => {
    headlineReveal();
    const bgContainer = document.querySelector('.bg-container');
    if (bgContainer) {
        bgContainer.style.animation = 'candleFlicker 6s infinite';
        bgContainer.style.transformOrigin = 'center center';
        
        animateBackgroundZoom();
    }
});