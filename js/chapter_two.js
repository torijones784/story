function capitalizeLetters() {

const letters = [
    {
        elementId: `letter_one`,
        newText: `B`
    },
    {
        elementId: `letter_two`,
        newText: `M`
    }
]

setTimeout(() => {
    letters.forEach(change => {
                const letter = document.getElementById(change.elementId);
                    letter.textContent = change.newText;
            });
}, 2000); // Increase timeout
}

document.addEventListener('DOMContentLoaded', () => {
    capitalizeLetters();
});