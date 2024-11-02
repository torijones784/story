let part_one_trigger = localStorage.getItem('part_one_trigger') || "no";

function getTriggerState() {
    return localStorage.getItem('part_one_trigger') || "no";
}

function updateTriggerState(newState) {
    part_one_trigger = newState;
    localStorage.setItem('part_one_trigger', newState);
    const triggerDisplays = document.querySelectorAll('.trigger-state');
    triggerDisplays.forEach(display => {
        display.textContent = newState;
    });
}

function handleTriggerClick(event) {
    const newState = event.target.dataset.state || "yes";
    updateTriggerState(newState);
}

document.addEventListener('DOMContentLoaded', () => {
    const currentState = getTriggerState();
    const triggerDisplays = document.querySelectorAll('.trigger-state');
    triggerDisplays.forEach(display => {
        display.textContent = currentState;
    });
});