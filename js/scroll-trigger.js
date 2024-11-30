function initScrollTrigger() {
    let hasTriggered = false;
    let roundTwo = false;
    let hasReachedBottom = false;  
    let pageLoadTime = Date.now();
    const MINIMUM_TIME = 10; // Change back
    
    const textChangesTop = [
        {
            elementId: `changing-text-3`,
            newText: `for the rest of your life,`
        },
        {
            elementId: `changing-text-11`,
            newText: `morphed`
        },
        {
            elementId: `changing-text-14`,
            newText: `It spawned. Your`
        },
        {
            elementId: `changing-text-16`,
            newText: `plague`
        },
        {
            elementId: `changing-text-29`,
            newText: `drunk with power.`
        },
        {
            elementId: `changing-text-1`,
            newText: `Fuck you're tired.`
        },
        {
            elementId: `changing-text-7`,
            newText: `This is your world.`
        },
        {
            elementId: `changing-text-8`,
            newText: `mother, who, if she was here, wouldn't be able to even look at you.`
        },
        {
            elementId: `changing-text-10`,
            newText: `your own personal Prince Charming.`
        },
        {
            elementId: `changing-text-15`,
            newText: `, too much like her father,`
        },
        {
            elementId: `changing-text-19`,
            newText: `today is just not your day, babe.`
        },
        {
            elementId: `changing-text-21`,
            newText: `things`
        },
        {
            elementId: `changing-text-24`,
            newText: `. It's not safe here.`
        },
        {
            elementId: `changing-text-25`,
            newText: `You don't notice that things are different now.`
        }
    ];

    const textChangesBottom = [
        {
            elementId: `changing-text-43`,
            newText: `own. It knows something's wrong, and it's not that you can't find her, there's something else. A possibility you refuse to place. Putting that on the board is an omen in itself.`
        },
        {
            elementId: `changing-text-27`,
            newText: `If you're not careful, your sentimentality will get to you.`  
        },
        {
            elementId: `changing-text-30`,
            newText: `No, he did not.`
        },
        {
            elementId: `changing-text-32`,
            newText: ``
        },
        {
            elementId: `changing-text-39`,
            newText: `Something inside you knows.`
        },
        {
            elementId: `changing-text-41`,
            newText: `When will you learn?`
        },
        {
            elementId: `changing-text-42`,
            newText: `When will you listen?`
        },
        {
            elementId: `changing-text-46`,
            newText: `your mind`
        },
        {
            elementId: `changing-text-51`,
            newText: `your world.`
        }
    ];

const textChangesTopTwo = [
        {
            elementId: `changing-text-1`,
            newText: `Fuck this.`  
        },
        {
            elementId: `changing-text-2`,
            newText: ` You're vacuuming up pieces of glass. Your daughter is screaming. Your living room is a mess. This home was not the one you were promised when your husband was down there, on one knee, looking up at you like you held his entire future in his hands. That home was supposed to be everything you didn't have when you were growing up. That home was supposed to feel safe. And fuck it, at least things were real now, but there was still a part of you that was angry that you got so close to what you'd never had.`
        },
        {
            elementId: `changing-text-4`,
            newText: ``
        },
        {
            elementId: `changing-text-5`,
            newText: `Something feels wrong.`
        },
        {
            elementId: `changing-text-6`,
            newText: `A chill creeps up your spine. You need to sit down, just for a second. Let yourself be catch-able, just for a second. You set the vacuum against the island and sink into the couch. The fan's on high, the sound of its blades a hypnotic whoosh, whoosh, whoosh. It feels so good to stop, just for a second, and feel the breeze on your face.`
        },
        {
            elementId: `changing-text-9`,
            newText: `You twist your engagement ring around on your finger—you should take it off, but you don't. You actually like your life now, but you don't.`
        },
        {
            elementId: `changing-text-12`,
            newText: `You went up to him all those years ago, in that bar on Wells St. that has since been rightfully condemned. He was standing against the wall, comfortable not being a part of the sweaty throng of 20-somethings grinding on the dance floor. He seemed so cool, so mature, and there was something different about him, in a familiar sort of way. It didn't make sense, but it didn't have to back then. You were hungry for your love story.`
        },
        {
            elementId: `changing-text-13`,
            newText: `You grinned at your friends, pointing at this then-stranger. Mine.`
        },
        {
            elementId: `changing-text-17`,
            newText: `And just like that, he was. He held the door for you, actually cared if you texted him when you got home, paid for your drinks when you went out. He wasn’t the bad boy with a past. He was from Elmhurst, for fuck’s sake. The three years you spent before getting married were a rush—of believing this was real, that was happening, that you were picked for this life. You were so, so desperate to be picked.`
        },
        {
            elementId: `changing-text-20`,
            newText: `Did his parents know who he was? Were they all in on it, sitting at the dinner table the first time you met them? Were there knowing glances over the rims of wine glasses that you missed? When you grabbed his hand, did they smile because you loved him, or because of what he'd use her to bring onto the world?`
        },
        {
            elementId: `changing-text-22`,
            newText: `Where is your daughter?`
        },
        {
            elementId: `changing-text-23`,
            newText: `Her playmat is empty. You blink at the patterns she drew on the papers flung around the floor, at the cut on your finger, at the broken picture frame of your mom.`
        },
        {
            elementId: `changing-text-26`,
            newText: `You call out her name. Again. Again. You hate the bitter ice filling your mouth as you say it. It's a spell that does nothing to subside the sinking feeling rooting within your chest.`
        },
        {
            elementId: `changing-text-28`,
            newText: `You see her, and within seconds, your arms are around her, your perfect girl.`
        },
        {
            elementId: `changing-text-30`,
            newText: `You don't see the shadows moving, because you don't want to. The truth is never what you wanted, not really.`
        },
        {
            elementId: `changing-text-32`,
            newText: `Everything is good.`
        },
        {
            elementId: `changing-text-33`,
            newText: `Everything is okay.`
        },
        {
            elementId: `changing-text-34`,
            newText: `Everything is safe.`
        },
        {
            elementId: `changing-text-35`,
            newText: ``
        },
        {
            elementId: `changing-text-36`,
            newText: ``
        },
        {
            elementId: `changing-text-37`,
            newText: ``
        },
        {
            elementId: `changing-text-38`,
            newText: ``
        },
        {
            elementId: `changing-text-39`,
            newText: ``
        },
        {
            elementId: `changing-text-41`,
            newText: ``
        },
        {
            elementId: `changing-text-42`,
            newText: ``
        },
        {
            elementId: `changing-text-44`,
            newText: ``
        },
        {
            elementId: `changing-text-45`,
            newText: ``
        },
        {
            elementId: `changing-text-47`,
            newText: ``
        },
        {
            elementId: `changing-text-48`,
            newText: ``
        },
        {
            elementId: `changing-text-49`,
            newText: ``
        },
        {
            elementId: `changing-text-52`,
            newText: ``
        },
        {
            elementId: `changing-text-53`,
            newText: ``
        },
        {
            elementId: `changing-text-54`,
            newText: ``
        },
        {
            elementId: `changing-text-55`,
            newText: ``
        },
        {
            elementId: `changing-text-56`,
            newText: `There's nothing to be afraid of.`
        },
        {
            elementId: `changing-text-57`,
            newText: ``
        },
        {
            elementId: `changing-text-58`,
            newText: `Nothing to see, in the shadows.`
        },
        {
            elementId: `changing-text-59`,
            newText: ``
        },
        {
            elementId: `changing-text-60`,
            newText: `Isn't it?`
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
            console.log('First trigger activated');
            hasTriggered = true;
            hasReachedBottom = true;
            
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
        }

        if (scrollPercentage < 50 && hasReachedBottom && !roundTwo) { 
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
        }

        if (scrollPercentage > 70 && hasTriggered && roundTwo === true) {
            console.log('Third trigger activated');
            textChangesTopTwo.forEach(change => {
                const element = document.getElementById(change.elementId);
                if (element) {
                    element.textContent = change.newText;
                }
            });
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