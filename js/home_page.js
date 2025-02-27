let word_one = document.getElementById('word_one');
let word_two = document.getElementById('word_two');
let word_three = document.getElementById('word_three');
let zoomComplete = false;
let animationFrameId = null;

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
    if (zoomComplete) return;

    const bgContainer = document.querySelector('.bg-container');
    const startTime = performance.now();
    const duration = 20000;
    const startScale = 1;
    const endScale = 1.1;
    
    bgContainer.style.animation = 'candleFlicker 6s infinite';
    bgContainer.style.transition = 'none';

    function zoomStep(currentTime) {
        const elapsed = currentTime - startTime;
        
        if (elapsed >= duration) {
            bgContainer.style.transform = `scale(${endScale})`;
            zoomComplete = true;
            return;
        }
        
        const progress = elapsed / duration;
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentScale = startScale + (endScale - startScale) * easedProgress;
        
        bgContainer.style.transform = `scale(${currentScale})`;
   
        animationFrameId = requestAnimationFrame(zoomStep);
    }

    animationFrameId = requestAnimationFrame(zoomStep);
}

function setVHVariable() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

document.addEventListener('DOMContentLoaded', () => {
    setVHVariable();
    window.addEventListener('resize', setVHVariable);
    headlineReveal();

    const bgContainer = document.querySelector('.bg-container');
    if (bgContainer) {
        bgContainer.style.transform = 'scale(1)';
        
        bgContainer.style.transition = 'transform 20s ease-out';
        
        setTimeout(() => {
            bgContainer.style.transform = 'scale(1.1)';
        }, 500);
    }

    window.addEventListener('scroll', function(e) {
    }, { passive: true });

});