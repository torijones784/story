function initScrollTrigger() {
    let hasTriggered = false;
    let roundTwoTop = false;
    let roundTwoBottom = false;
    let roundThreeTop = false;
    let hasReachedBottom = false;  
    let pageLoadTime = Date.now();
    const MINIMUM_TIME = 10; // Change back
    
    const textChangesTop = [
        {
            elementId: `changing-text-3`,
            newText: `for the rest of your life,`
        },
        {
            elementId: `changing-text-5`,
            newText: `Memory can be such a fickle thing.`
        },
        {
            elementId: `changing-text-11`,
            newText: `morphed`
        },
        {
            elementId: `changing-text-12`,
            newText: `Who's laughing now?`
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
        },
        {
            elementId: `changing-text-61`,
            newText: `Everyone was gone,`
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
            newText: ` Your daughter is screaming. Your living room is a mess. You're vacuuming up pieces of glass and wondering how you got here. This house was not the one you were promised when your husband was down there, on one knee, looking up at you like you held his entire future in his hands. That house was supposed to be what you never had growing up. That house was supposed to feel safe. And fuck it, things were at least real now, but there was still a part of you that was angry that you got so close to what you'd never had.`
        },
        {
            elementId: `changing-text-3`,
            newText: ``
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
            newText: `A chill creeps up your spine. You're so tired. You need to sit down, just for a second. Let yourself rest, be catch-able, just for a second. You set the vacuum against the island and sink into the couch. The fan's on high, the sound of its blades a hypnotic whoosh whoosh whoosh. You have to close your eyes. It feels so good to feel the breeze on your face.`
        },
        {
            elementId: `changing-text-9`,
            newText: `You twist your engagement ring around on your finger—you should take it off, but you don't. You actually like your life now, but you don't.`
        },
        {
            elementId: `changing-text-12`,
            newText: `The truth is, you're the one who went up to him all those years ago, in that bar on Wells St. that has since been rightfully condemned. He was standing against the wall, comfortable not being a part of the sweaty throng of 20-somethings grinding on the dance floor. He seemed so cool, so mature, and there was something different about him, in a familiar sort of way. It didn't make sense, but it didn't have to back then. You were hungry for your love story.`
        },
        {
            elementId: `changing-text-13`,
            newText: `You remember grinning at your friends, pointing at this then-stranger. Mine.`
        },
        {
            elementId: `changing-text-17`,
            newText: `And just like that, he was. He held the door for you, actually cared if you texted him when you got home, paid for your drinks when you went out. He wasn’t the bad boy with a past. He was from Elmhurst, for fuck’s sake. The three years you spent before getting married were a rush—of believing this was real, that was happening, that you were picked for this life. You were so, so desperate to be picked.`
        },
        {
            elementId: `changing-text-20`,
            newText: `Not even your mother knew. That's how you console yourself.`
        },
        {
            elementId: `changing-text-22`,
            newText: `He’s perfect, she had said flatly after the first time you brought him home, treating your new love with the enthusiasm of sorting laundry. To her, he was a plot point in your story—your destiny. You didn’t care. To you, he was everything.`
        },
        {
            elementId: `changing-text-23`,
            newText: `Isn’t that the joke? That within the burning ache you can feel inside you, the never-ending flow of pain and how could you miss this, and you know that you aren’t as bad as your mother, after all. You are worse.`
        },
        {
            elementId: `changing-text-26`,
            newText: `Did his parents know who he was? Were they all in on it, sitting at the dinner table the first time you met them? Were there knowing glances over the rims of wine glasses that you missed? When you grabbed his hand, did they smile because you were so in love with him, or because of what he'd use you to bring onto the world?`
        },
        {
            elementId: `changing-text-28`,
            newText: `Where is your daughter?`
        },
        {
            elementId: `changing-text-30`,
            newText: `You jerk upright. Her playmat is empty. Your eyes snag on the patterns she drew on the papers flung around the floor, at the cut on your finger, at the broken picture frame of your mom.`
        },
        {
            elementId: `changing-text-32`,
            newText: `You call out her name. Again. Again. You hate the bitter ice filling your mouth as you say it. It's a spell that does nothing to subside the sinking feeling rooting within your chest.`
        },
        {
            elementId: `changing-text-33`,
            newText: `A part of you knows.`
        }
    ];
    const textChangesBottomTwo = [
        {
            elementId: `changing-text-34`,
            newText: `But you never listen.`
        },
        {
            elementId: `changing-text-35`,
            newText: `You never learn.`
        },
        {
            elementId: `changing-text-36`,
            newText: `You tear your house apart until you see her, and within seconds, your arms are around her, your perfect girl. It was only a minute. You'd only looked away for a minute.`
        },
        {
            elementId: `changing-text-37`,
            newText: `You don't see the shadows moving, because you don't want to. The truth is never what you wanted, not really.`
        },
        {
            elementId: `changing-text-38`,
            newText: `Everything is good.`
        },
        {
            elementId: `changing-text-39`,
            newText: `Everything is okay.`
        },
        {
            elementId: `changing-text-41`,
            newText: `Everything is safe.`
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

    const textChangesTopThree = [
        {
            elementId: `changing-text-1`,
            newText: `Fuck.`
        },
        {
            elementId: `changing-text-2`,
            newText: ``
        },
        {
            elementId: `changing-text-3`,
            newText: ``
        },
        {
            elementId: `changing-text-4`,
            newText: ``
        },
        {
            elementId: `changing-text-5`,
            newText: `What is even happening? You feel like you're losing your mind—everything is blending, changing, rearraging and it doesn't make sense. None of this makes sense.`
        },
        {
            elementId: `changing-text-6`,
            newText: `You need to get a grip. You are a mother. The days of waking up mid-afternoon, lost in last night's haze are behind you. You can't lose it anymore, you can't be the one who doesn't know anymore. You gave that up, willingly and knowingly, when you had her. Your daughter needs to be able to look to you and you need to be able to hold the ship steady.`
        },
        {
            elementId: `changing-text-9`,
            newText: `Those eyes. Those eyes. Those eyes.`
        },
        {
            elementId: `changing-text-11`,
            newText: ``
        },
        {
            elementId: `changing-text-12`,
            newText: `Get a grip.`
        },
        {
            elementId: `changing-text-13`,
            newText: `Something's not right.`
        },
        {
            elementId: `changing-text-17`,
            newText: `But the thing is, you like your life now.`
        },
        {
            elementId: `changing-text-20`,
            newText: `Sure, laundry piles, dishes towered, there's glass on the floor.`
        },
        {
            elementId: `changing-text-22`,
            newText: `What aren't you seeing?`
        },
        // Time delay and change to "You just wanted to scream at it all" -> moment later when she screams
        {
            elementId: `changing-text-23`, 
            newText: `You just wanted your daughter to scream at it all.`
        },
        {
            elementId: `changing-text-26`, 
            newText: `That fan will not stop squeaking. Something about the sound lodges directly into your brain, you can feel it tapping against the inside of your skull.`
        },
        {
            elementId: `changing-text-28`, 
            newText: `You miss your husband.`
        },
        {
            elementId: `changing-text-30`, 
            newText: `There's something wrong. You can feel it. This isn't going how it's supposed to.`
        },
        {
            elementId: `changing-text-32`, 
            newText: `What aren't you seeing?`
        },
        {
            elementId: `changing-text-33`, 
            newText: `When will you learn?`
        },
        {
            elementId: `changing-text-34`, 
            newText: `You're kneeling on the gravel driveway, and you should feel safe. This is your world, after all. But it's drawing closer. You can feel it. The truth is never what you wanted, but that never made it less true.`
        },
        {
            elementId: `changing-text-35`, 
            newText: `Something you thought you'd banished.`
        },
        {
            elementId: `changing-text-38`, 
            newText: `Something you thought you'd run from.`
        },
        {
            elementId: `changing-text-39`, 
            newText: `Your daughter lifts her head up from your chest and turns to look over her shoulder.`
        },
        {
            elementId: `changing-text-41`, 
            newText: `You turn your gaze to the shadows you can't ignore.`
        },
        {
            elementId: `changing-text-42`, 
            newText: `You're very, very afraid.`
        },
        {
            elementId: `changing-text-56`, 
            newText: ``
        },
        {
            elementId: `changing-text-58`, 
            newText: ``
        },
        {
            elementId: `changing-text-60`, 
            newText: ``
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

        if (scrollPercentage > 80 && !hasTriggered) { 
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
                }, 17000); 
            }
        }

        if (scrollPercentage < 50 && hasReachedBottom && !roundTwoTop) { 
            console.log('Second trigger activated');
            roundTwoTop = true;
            const closingQuestion = document.getElementById('closing_question');
            closingQuestion.classList.remove('visible');

            textChangesBottom.forEach(change => {
                const element = document.getElementById(change.elementId);
                if (element) {
                    element.textContent = change.newText;
                }
            });
        }

        if (scrollPercentage > 80 && hasTriggered && roundTwoTop) {
            console.log('Third trigger activated');

            roundTwoBottom = true;
            textChangesTopTwo.forEach(change => {
                const element = document.getElementById(change.elementId);
                if (element) {
                    element.textContent = change.newText;
                }
            });
        }

        if (scrollPercentage < 50 && hasTriggered && roundTwoBottom && !roundThreeTop) { 
            console.log('Fourth trigger activated');

            roundThreeTop = true;
            textChangesBottomTwo.forEach(change => {
                const element = document.getElementById(change.elementId);
                if (element) {
                    element.textContent = change.newText;
                }
            });
        }

        // if (scrollPercentage > 50 && hasTriggered && roundThreeTop) { 
        //     console.log('Fifth trigger activated');
        //     setTimeout(() => {
        //         roundThreeTop = true;
        //     textChangesTopThree.forEach(change => {
        //         const element = document.getElementById(change.elementId);
        //         if (element) {
        //             element.textContent = change.newText;
        //         }
        //     });
        //     }, 17000); 
            
        // }
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