let word_one = document.getElementById('word_one');
let word_two = document.getElementById('word_two');
let word_three = document.getElementById('word_three');

function headlineReveal() {
    setTimeout(() => {
        word_one.classList.remove('hidden');
        word_one.classList.add('visible');
    }, 1000)
} 

document.addEventListener('DOMContentLoaded', () => {
    console.log(word_one)
    headlineReveal();
});