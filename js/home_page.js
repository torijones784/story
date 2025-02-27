let word_one = document.getElementById('word_one');
let word_two = document.getElementById('word_two');
let word_three = document.getElementById('word_three');
let zoomComplete = false;

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