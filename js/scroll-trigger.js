function initScrollTrigger() {
    let hasTriggered = false;
    let roundTwo = false;
    let pageLoadTime = Date.now();
    const MINIMUM_TIME = 10; // Change back
    
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
            elementId: `changing-text-10`,
            newText: `Fuck this.`  
        },
        {
            elementId: `changing-text-27`,
            newText: `You're vacuuming up pieces of glass. Your daughter is screaming. Your living room is a mess. This home was not the one you were promised when your husband was down there, on one knee. That home was supposed to be everything you didn't have when you were growing up. That home was supposed to feel safe.`
        },
        {
            elementId: `changing-text`,
            newText: ``
        },
        {
            elementId: `changing-text-28`,
            newText: ``
        },
        {
            elementId: `changing-text-29`,
            newText: `Something feels wrong.`
        },
        {
            elementId: `changing-text-30`,
            newText: `A chill creeps up your spine. You need to sit down, just for a second. You set the vacuum against the island and sit on the couch. The fan's on high, the sound of it's blades a hypnotic woosh, woosh, woosh. It feels so good to stop, just for a second, and feel the breeze on your face.`
        },
        {
            elementId: `changing-text-31`,
            newText: `You twist your engagement ring around on your finger—you should take it off, but you don't. You actually like your life now, but you don't.`
        },
        {
            elementId: `changing-text-32`,
            newText: `You went up to him all those years ago, in that bar on Wells St. that has since been rightfully condemned. He was standing against the wall, comfortable not being a part of the sweaty throng of 20-somethings grinding on the dance floor. He seemed so cool, so mature, and there was something different about him, in a familiar sort of way. It didn't make sense, but it didn't have to back then. You were hungry for your love story.`
        },
        {
            elementId: `changing-text-33`,
            newText: `You grinned at your friends, pointing at this then-stranger. Mine.`
        },
    ];

    function updateServerState() {
        return fetch('/api/trigger-state?trigger=yes', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.warn('Warning: Server update failed:', error);
            return null;
        });
    }

    function checkScroll() { 
        const timeSpent = Date.now() - pageLoadTime;
        if (timeSpent < MINIMUM_TIME) {
            return;
        }

        const scrollPosition = window.scrollY + window.innerHeight;
        const totalHeight = document.documentElement.scrollHeight;
        const scrollPercentage = (scrollPosition / totalHeight) * 100;

        if (scrollPercentage > 99 && !hasTriggered) { 
            console.log('First trigger activated');
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
                }, 100); 
                // Change back
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

            updateServerState();
        }

        if (scrollPercentage < 50 && hasTriggered === true && !roundTwo) { 
            console.log('Second trigger activated');
            roundTwo = true;
            const closingQuestion = document.getElementById('closing_question');
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

            updateServerState();
        }

        if (scrollPercentage > 50 && hasTriggered === true && roundTwo === true) {
            console.log('Third trigger activated');
            textChangesTopTwo.forEach(change => {
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

            updateServerState();
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