function initScrollTrigger() {
    let hasTriggered = false;
    let darknessInitiated = false;
    let roundTwo = false;
    let pageLoadTime = Date.now();
    const MINIMUM_TIME = 30000; 
    
    const textChangesTop = [
        {
            elementId: `changing-text`,
            newText: `for the rest of your life,`
        },
        {
            elementId: `changing-text-2`,
            newText: `morphed`
        },
        {
            elementId: `changing-text-3`,
            newText: `It spawned. Your`
        },
        {
            elementId: `changing-text-4`,
            newText: `plague`
        },
        {
            elementId: `changing-text-5`,
            newText: `drunk with power.`
        },
        {
            elementId: `changing-text-10`,
            newText: `Fuck you're tired.`
        },
        {
            elementId: `changing-text-11`,
            newText: `This is your world.`
        },
        {
            elementId: `changing-text-12`,
            newText: `mother, who, if she was here, wouldn't be able to even look at you.`
        },
        {
            elementId: `changing-text-13`,
            newText: `your own personal Prince Charming.`
        },
        {
            elementId: `changing-text-14`,
            newText: `, too much like her father,`
        },
        {
            elementId: `changing-text-15`,
            newText: `today is just not your day, babe.`
        },
        {
            elementId: `changing-text-16`,
            newText: `things`
        },
        {
            elementId: `changing-text-17`,
            newText: `. It's not safe here.`
        },
        {
            elementId: `changing-text-18`,
            newText: `You don't notice that things are different now.`
        }
    ];

    const textChangesBottom = [
        {
            elementId: `changing-text-6`,
            newText: `own. It knows something's wrong, and it's not that you can't find her, there's something else. A possibility you refuse to place. Putting that on the board is an omen in itself.`
        },
        // {
        //     elementId: `changing-text-7`,
        //     newText: `There's nothing to be afraid of.` 
        // },
        // {
        //     elementId: `changing-text-8`,
        //     newText: `Nothing to see, in the shadows.` 
        // },
        // {
        //     elementId: `changing-text-9`,
        //     newText: `Isn't it?`  
        // },
        {
            elementId: `changing-text-19`,
            newText: `If you're not careful, your sentimentality will get to you.`  
        },
        {
            elementId: `changing-text-20`,
            newText: `No, he did not.`
        },
        {
            elementId: `changing-text-21`,
            newText: ``
        },
        {
            elementId: `changing-text-22`,
            newText: `Something inside you knows.`
        },
        {
            elementId: `changing-text-23`,
            newText: `When will you learn?`
        },
        {
            elementId: `changing-text-24`,
            newText: `When will you listen?`
        },
        {
            elementId: `changing-text-25`,
            newText: `your mind`
        },
        {
            elementId: `changing-text-26`,
            newText: `your world.`
        }
    ]; 

    const textChangesTopTwo = [
        {
            
        }
    ];

    function checkScroll() { 
        const timeSpent = Date.now() - pageLoadTime;
        if (timeSpent < MINIMUM_TIME) {
            return;
        }

        const scrollPosition = window.scrollY + window.innerHeight;
        const totalHeight = document.documentElement.scrollHeight;
        const scrollPercentage = (scrollPosition / totalHeight) * 100;

        if (scrollPercentage > 99 && !hasTriggered) { 
            hasTriggered = true;
            
            textChangesTop.forEach(change => {
                const element = document.getElementById(change.elementId);
                if (element) {
                    element.textContent = change.newText;
                }
            });

            const closingQuestion = document.getElementById('closing_question');
            if (closingQuestion) {
                setTimeout(() => {
                    closingQuestion.classList.add('visible');
                }, 17000);
            }

            fetch('/api/trigger-state', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ trigger: 'yes' })
            })
            .then(response => response.json())
            .catch(error => {
                console.error('Error updating server:', error);
            });
        }

        if (scrollPercentage < 50 && hasTriggered === true) { 
            
            roundTwo = true;

            closingQuestion.classList.remove('visible');

            textChangesBottom.forEach(change => {
                const element = document.getElementById(change.elementId);
                if (element) {
                    element.textContent = change.newText;
                }
            });

            fetch('/api/trigger-state', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ trigger: 'yes' })
            })
            .then(response => response.json())
            .catch(error => {
                console.error('Error updating server:', error);
            });
        }

        if (scrollPercentage > 50 && hasTriggered === true && roundTwo === true) {
            
        }
    } 

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                checkScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    checkScroll();
}

document.addEventListener('DOMContentLoaded', initScrollTrigger);