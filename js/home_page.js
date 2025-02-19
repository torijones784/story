let word_one = document.getElementById('word_one');
let word_two = document.getElementById('word_two');
let word_three = document.getElementById('word_three');

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
    }, 3500)
} 

document.addEventListener('DOMContentLoaded', () => {
    headlineReveal();
});