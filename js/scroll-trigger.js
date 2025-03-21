/**
 * Enhanced Scroll Trigger with Smooth Text Changes
 * This script handles text changes that occur based on scroll position
 * while implementing techniques to make changes less noticeable to users
 */

// Global state to track scroll and update status
let hasTriggered = false;
let roundTwoTop = false;
let roundTwoBottom = false;
let roundThreeTop = false;
let hasReachedBottom = false;  
let fifthTriggerActivated = false;
let tensionActivated = false;
let tensionReset = false;
let pageLoadTime = Date.now();
const MINIMUM_TIME = 24000;
let lastScrollTop = 0;
let lastScrollTime = Date.now();
let scrollSpeed = 0;
let currentOpacity = 0;
let tensionAnimationFrame;
let lastViewportHeight = window.innerHeight;
let closingQuestionTimeout;

// Store updated elements to prevent duplicate updates
const updatedElements = new Set();

// Store original text properties
const originalHeights = {};
const originalTexts = {};
const maxHeights = {};

// Define text changes for each trigger phase
const textChangesTop = [
    {
        elementId: `chapter_one_title`,
        newText: `Chapter 1`
    },
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
        newText: `It spawned. Alyssa, your`
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
    },
    {
        elementId: `changing-text-62`,
        newText: `.`
    },
    {
        elementId: `changing-text-63`,
        newText: ``
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
        elementId: `changing-text-37`,
        newText: `You'd only looked away for a second. Didn't you?`
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
    },
    {
        elementId: `changing-text-64`,
        newText: `Taylor's`
    }
];

const textChangesTopTwo = [
    {
        elementId: `chapter_one_title`,
        newText: `The Beginning?`
    },
    {
        elementId: `changing-text-1`,
        newText: `Fuck this.`  
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
        newText: `Your daughter is screaming, but won't let you hold her. The bad guy is always the one who's behind to clean up the mess. Your living room is a disaster. Laundry piles, and dishes tower, and somehow everything you have isn't enough.`
    },
    {
        elementId: `changing-text-6`,
        newText: `Despite your current situation, you spend very little time wondering how you got here. You tell yourself it's because figuring out the reasons and why's behind your reality is for people who don't have children—or maybe, people who have help with theirs, those illustrious "two-parent" households the world told you to want before you could spell. But the truth is, you don't go there because there's a part of you that wonders if you were destined for this, from the start.`
    },
    {
        elementId: `changing-text-9`,
        newText: `You keep going.`
    },
    {
        elementId: `changing-text-12`,
        newText: `You're vacuuming up pieces of glass and remembering your husband down there, on one knee, looking up at you like you held his entire future in your hands. This is not the house you were promised. That house was supposed to be different, supposed to be what you never had growing up. That house was supposed to be safe. And fuck it, things were at least real now, but there is a part of you that's so angry you got so close to what you'd always wanted.`
    },
    {
        elementId: `changing-text-13`,
        newText: `Something feels wrong.`
    },
    {
        elementId: `changing-text-17`,
        newText: `A chill creeps up your spine. It hits you, all at once, the weight of this world, the months of embedding safety into the very walls of the place you had to fight to reclaim. Something sags within you. You're so tired. You need to sit down, just for a second. Let yourself rest, be catch-able, just for a second.`
    },
    {
        elementId: `changing-text-20`,
        newText: `You set the vacuum against the island and walk to the couch on the other side of the room. The cushions bend to your weight, and that feels good. The fan's on high, the sound of its blades a hypnotic whoosh whoosh whoosh. A warm weighted feeling settles within you like sand at the bottom of the ocean. It pulls your eyelids closed, and it feels good to feel the breeze on your face and imagine you are somewhere else, just for a second.`
    },
    {
        elementId: `changing-text-22`,
        newText: `You twist your engagement ring around on your finger—you should take it off, but you don't. You actually like your life now, but you don't.`
    },
    {
        elementId: `changing-text-23`,
        newText: `The truth is, you're the one who went up to him all those years ago, in that bar on Wells St. that has since been rightfully condemned. He was standing against the wall, comfortable not being a part of the sweaty throng of 20-somethings grinding on the dance floor. He seemed so cool, so mature, and there was something different about him, in a familiar sort of way. It didn't make sense, but it didn't have to back then. You were hungry for your love story.`
    },
    {
        elementId: `changing-text-26`,
        newText: `You remember grinning at your friends, pointing at this then-stranger. Mine.`
    },
    {
        elementId: `changing-text-28`,
        newText: `And just like that, he was. He held the door for you, actually cared if you texted him when you got home, paid for your drinks when you went out. He wasn't the bad boy with a past. He was from Elmhurst, for fuck's sake. The three years you spent before getting married were a rush—of believing this was real, that was happening, that you were picked for this life. You were so, so desperate to be picked.`
    },
    {
        elementId: `changing-text-30`,
        newText: `Not even your mother knew. That's how you console yourself.`
    },
    {
        elementId: `changing-text-32`,
        newText: `He's perfect, she had said flatly after the first time you brought him home, treating your new love with the enthusiasm of sorting laundry. To her, he was a plot point in your story—your destiny. You didn't care. To you, he was everything.`
    },
    {
        elementId: `changing-text-33`,
        newText: `Isn't that the joke? That within the burning ache you can feel inside you, the never-ending flow of pain and how could you miss this, and you know that you weren't as bad as your mother, after all. You were worse.`
    },
    {
        elementId: `changing-text-34`,
        newText: `Did his parents know who he was? Were they all in on it, sitting at the dinner table the first time you met them? Were there knowing glances over the rims of wine glasses that you missed? When you grabbed his hand, did they smile because you were so in love with him, or because of how he'd use you?`
    }
];

const textChangesBottomTwo = [
    {
        elementId: `changing-text-35`,
        newText: `Where is your daughter?`
    },
    {
        elementId: `changing-text-36`,
        newText: `You jerk upright. Her playmat is empty. Your eyes snag on the patterns she drew on the papers flung around the floor, at the cut on your finger, at the broken picture frame of your mom.`
    },
    {
        elementId: `changing-text-37`,
        newText: `You call out her name. Again. Again. You hate the bitter ice filling your mouth as you say it. It's a spell that does nothing to subside the sinking feeling rooting within your chest.`
    },
    {
        elementId: `changing-text-38`,
        newText: `A part of you knows.`
    },
    {
        elementId: `changing-text-39`,
        newText: `But you never listen.`
    },
    {
        elementId: `changing-text-41`,
        newText: `You never learn.`
    },
    {
        elementId: `changing-text-42`,
        newText: `You tear your house apart until you see her, and within seconds, your arms are around her, your perfect girl. It was only a minute. You'd only looked away for a minute.`
    },
    {
        elementId: `changing-text-44`,
        newText: `You don't see the shadows moving, because you don't want to. The truth is never what you wanted, not really.`
    },
    {
        elementId: `changing-text-45`,
        newText: `Everything is good.`
    },
    {
        elementId: `changing-text-47`,
        newText: `Everything is okay.`
    },
    {
        elementId: `changing-text-48`,
        newText: `Everything is safe.`
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
    },
    {
        elementId: `changing-text-64`,
        newText: `Your girl's`
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
        newText: `You need to get a grip. You are a mother. The days of waking up mid-afternoon, lost in last night's haze are behind you. You can't lose it anymore, you can't be the one who doesn't know anymore. You gave that up, willingly and knowingly, when you had her. Your daughter needs to be able to look to you and you need to be able to hold her gaze.`
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
        newText: `Sure, laundry piles, dishes tower, there's glass on the floor.`
    },
    {
        elementId: `changing-text-22`,
        newText: `What aren't you seeing?`
    },
    {
        elementId: `changing-text-23`, 
        newText: `Why shouldn't your daughter scream at it all?`
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
        newText: `When will you learn?`
    },
    {
        elementId: `changing-text-33`, 
        newText: `You never listen.`
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
        elementId: `changing-text-36`, 
        newText: `Something you thought you'd run from.`
    },
    {
        elementId: `changing-text-37`, 
        newText: `Your daughter lifts her head up from your chest and turns to look over her shoulder.`
    },
    {
        elementId: `changing-text-38`, 
        newText: `You turn your gaze to the shadows you can't ignore.`
    },
    {
        elementId: `changing-text-39`, 
        newText: `You are very, very afraid.`
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

/**
 * CORE TEXT CHANGE SYSTEM
 * Functions for managing text changes without visible layout shifts
 */

// Check if element is in viewport (for opportunistic updates)
function isInViewport(element) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0
    );
}

// Measure and precompute maximum heights needed for all elements
function precomputeMaxHeights() {
    // Get all text changes from the arrays
    const allTextChanges = [
        ...textChangesTop, 
        ...textChangesBottom,
        ...textChangesTopTwo,
        ...textChangesBottomTwo,
        ...textChangesTopThree
    ];
    
    // Create a map of element IDs to their possible text values
    const elementToTextOptions = {};
    
    // Collect all possible texts for each element
    allTextChanges.forEach(change => {
        const { elementId, newText } = change;
        if (!elementToTextOptions[elementId]) {
            elementToTextOptions[elementId] = [];
        }
        elementToTextOptions[elementId].push(newText);
    });
    
    // For each element, find which text creates the tallest element
    Object.keys(elementToTextOptions).forEach(elementId => {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        // Store original text and computed style
        originalTexts[elementId] = element.textContent;
        
        // Create a hidden clone to measure potential heights
        const clone = element.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.visibility = 'hidden';
        clone.style.height = 'auto';
        clone.style.width = element.offsetWidth + 'px';
        clone.style.maxWidth = element.offsetWidth + 'px';
        clone.style.overflow = 'hidden';
        document.body.appendChild(clone);
        
        // Find the maximum height among all potential texts
        let maxHeight = element.offsetHeight;
        elementToTextOptions[elementId].forEach(text => {
            if (text === '') return; // Skip empty text
            
            clone.textContent = text;
            const height = clone.offsetHeight;
            maxHeight = Math.max(maxHeight, height);
        });
        
        // Store max height
        maxHeights[elementId] = maxHeight;
        
        // Set fixed height on the element to prevent layout shifts
        if (maxHeight > 0) {
            element.style.minHeight = maxHeight + 'px';
            element.style.height = maxHeight + 'px';
            element.style.overflow = 'hidden';
            element.style.display = 'block';
        }
        
        // Clean up clone
        document.body.removeChild(clone);
    });
}

// Enhanced text update function with stealth techniques
function smoothUpdateElementText(elementId, newText) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Skip if this update has already been applied
    const updateKey = `${elementId}:${newText}`;
    if (updatedElements.has(updateKey)) return;
    
    // Check if this element is currently visible
    const elementIsVisible = isInViewport(element);
    
    // Track current scroll velocity
    const currentScrollSpeed = scrollSpeed;
    
    // Choose update strategy based on conditions
    if (newText === '') {
        // Special case: empty text - fade out completely
        fadeOutElement(element);
    } 
    else if (!elementIsVisible) {
        // Element not visible - direct update
        stealthUpdate(element, newText);
    }
    else if (currentScrollSpeed > 50) {
        // Fast scrolling - use direct update with short transition
        fastTransitionUpdate(element, newText);
    }
    else {
        // Element is visible and scrolling is normal - use gradual crossfade
        crossFadeUpdate(element, newText);
    }
    
    // Mark this update as completed
    updatedElements.add(updateKey);
}

// Methods for different types of text updates

// Method 1: Completely stealth update (for off-screen elements)
function stealthUpdate(element, newText) {
    // Directly update the text without any transition
    element.textContent = newText;
}

// Method 2: Fast transition for when user is scrolling quickly
function fastTransitionUpdate(element, newText) {
    // Set a very short opacity transition
    element.style.transition = 'opacity 150ms ease-out';
    element.style.opacity = '0.9';
    
    // Update text during the brief opacity change
    setTimeout(() => {
        element.textContent = newText;
        element.style.opacity = '1';
    }, 50);
}

// Method 3: Cross-fade for visible elements
function crossFadeUpdate(element, newText) {
    if (element.textContent === newText) return;
    
    // Add a class to mark this element as transitioning
    element.classList.add('text-transitioning');
    
    // Create and position a clone with the new text
    const parent = element.parentElement;
    const rect = element.getBoundingClientRect();
    const clone = element.cloneNode(true);
    
    // Set up the clone's styles
    clone.style.position = 'absolute';
    clone.style.top = '0';
    clone.style.left = '0';
    clone.style.width = '100%';
    clone.style.height = '100%';
    clone.style.opacity = '0';
    clone.style.transition = 'opacity 800ms ease';
    clone.textContent = newText;
    
    // Position the parent if needed
    const parentPosition = window.getComputedStyle(parent).position;
    if (parentPosition === 'static') {
        parent.style.position = 'relative';
    }
    
    // Add the clone to the DOM
    parent.appendChild(clone);
    
    // Force browser reflow
    clone.offsetHeight;
    
    // Start the fade transition
    element.style.transition = 'opacity 800ms ease';
    element.style.opacity = '0';
    clone.style.opacity = '1';
    
    // Clean up after transition completes
    setTimeout(() => {
        // Update the original element's text
        element.textContent = newText;
        element.style.opacity = '1';
        
        // Remove transition and transitioning class
        element.style.transition = '';
        element.classList.remove('text-transitioning');
        
        // Remove the clone
        if (parent.contains(clone)) {
            parent.removeChild(clone);
        }
        
        // Reset parent positioning if we changed it
        if (parentPosition === 'static') {
            // Give a small delay to prevent flicker
            setTimeout(() => {
                parent.style.position = '';
            }, 50);
        }
    }, 800); // Match the transition duration
}

// Method 4: Fade out completely (for elements that should disappear)
function fadeOutElement(element) {
    element.style.transition = 'opacity 1200ms ease-out, height 1200ms ease-out';
    element.style.opacity = '0';
    
    // Remember height for smooth collapse
    const height = element.offsetHeight;
    
    // Animate height collapse after opacity fade starts
    setTimeout(() => {
        element.style.height = '0px';
        element.style.marginTop = '0px';
        element.style.marginBottom = '0px';
        element.style.paddingTop = '0px';
        element.style.paddingBottom = '0px';
    }, 400);
    
    // Remove from document flow after animation completes
    setTimeout(() => {
        element.style.display = 'none';
    }, 1200);
}

// Additional method for text that changes through phases
function morphText(element, newText) {
    const originalText = element.textContent;
    
    // Only use morphing for similar length texts
    if (Math.abs(originalText.length - newText.length) > originalText.length * 0.3) {
        crossFadeUpdate(element, newText);
        return;
    }
    
    // Use progressive character replacement
    const steps = 8;
    const totalDuration = 800;
    const stepDuration = totalDuration / steps;
    
    let step = 0;
    const morphInterval = setInterval(() => {
        if (step >= steps) {
            clearInterval(morphInterval);
            element.textContent = newText;
            return;
        }
        
        // Build intermediate text
        let intermediateText = '';
        const progress = step / steps;
        
        // For longer texts, we do a progressive sweep
        for (let i = 0; i < Math.max(originalText.length, newText.length); i++) {
            // Calculate the transition point that sweeps across the text
            const transitionPoint = Math.floor(progress * Math.max(originalText.length, newText.length));
            
            if (i < transitionPoint) {
                // Past the transition point - use new text
                intermediateText += i < newText.length ? newText[i] : '';
            } else {
                // Before the transition point - use original text
                intermediateText += i < originalText.length ? originalText[i] : '';
            }
        }
        
        element.textContent = intermediateText;
        step++;
    }, stepDuration);
}

/**
 * CORE SCROLL TRIGGER SYSTEM
 * Functions for detecting scroll position and triggering changes
 */

// Calculate the current scroll percentage
function getScrollPercentage() {
    const viewportHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
    );
    return ((scrollTop + viewportHeight) / documentHeight) * 100;
}

// Function to handle the fade out of multiple elements
function handleFadeOut(elements) {
    elements.forEach(element => {
        if (!element) return;
        fadeOutElement(element);
    });
}

// Main scroll handler - detects position and triggers text changes
function checkScroll() { 
    const timeSpent = Date.now() - pageLoadTime;
    if (timeSpent < MINIMUM_TIME) {
        return;
    }

    const scrollPercentage = getScrollPercentage();

    // Update scroll metrics for animations
    const currentScrollTop = window.scrollY;
    const scrollDelta = Math.abs(currentScrollTop - lastScrollTop);
    const now = Date.now();
    const timeDelta = now - lastScrollTime;
    
    if (timeDelta > 0) {
        scrollSpeed = Math.min(100, (scrollDelta / timeDelta) * 100);
    }
    
    lastScrollTop = currentScrollTop;
    lastScrollTime = now;

    // First trigger point
    if (scrollPercentage > 80 && !hasTriggered) { 
        console.log('First trigger activated');
        hasTriggered = true;
        hasReachedBottom = true;
        
        // Opportunistically update elements when they're not visible
        checkVisibilityAndUpdate(textChangesTop);
        
        // Set up the closing question to appear after delay
        const closingQuestion = document.getElementById('closing_question');
        if (closingQuestion) {
            closingQuestionTimeout = setTimeout(() => {
                closingQuestion.classList.add('visible');
            }, 10000);
        }
    }

    // Second trigger point
    if (scrollPercentage < 50 && hasReachedBottom && !roundTwoTop) { 
        console.log('Second trigger activated');
        roundTwoTop = true;
        
        // Update text when user scrolls back up
        checkVisibilityAndUpdate(textChangesBottom);
    }

    // Third trigger point
    if (scrollPercentage > 85 && hasTriggered && roundTwoTop && !roundTwoBottom) {
        console.log('Third trigger activated');
        roundTwoBottom = true;
        
        // Update text when user reaches bottom again
        checkVisibilityAndUpdate(textChangesTopTwo);
    }

    // Fourth trigger point
    if (scrollPercentage < 45 && hasTriggered && roundTwoBottom && !roundThreeTop) { 
        console.log('Fourth trigger activated');
        roundThreeTop = true;
        
        // Update text when user scrolls up again
        checkVisibilityAndUpdate(textChangesBottomTwo);
    }
    
    // Fifth trigger point (final transformation)
    if (scrollPercentage > 90 && hasTriggered && roundThreeTop && !fifthTriggerActivated) { 
        fifthTriggerActivated = true;
        console.log('Fifth trigger activated');
    
        setTimeout(() => {
            const chapter_title = document.getElementById(`chapter_one_title`);
            const home_link = document.getElementById(`home_link`)

            if (chapter_title) chapter_title.classList.add('hidden');
            if (home_link) {
                home_link.classList.remove('visible');
                home_link.classList.add('hidden');
            }
            
            // Clear all existing text (simplified from original for clarity)
            const textElements = [];
            for (let i = 1; i <= 64; i++) {
                const element = document.getElementById(`changing-text-${i}`);
                if (element) {
                    textElements.push(element);
                    element.textContent = '';
                }
            }

            // Process final text changes with delays between each
            let cumulativeDelay = 3000;
            let hasChangedText23 = false;
            
            textChangesTopThree.forEach((change, index) => {
                if (change.newText.trim()) {
                    // Word count affects delay duration - longer texts stay visible longer
                    const wordCount = [1, 0, 0, 0, 25, 69, 6, 0, 3, 3, 9, 10, 4, 10, 26, 4, 14, 4, 4, 39, 5, 6, 16, 10, 4, 0, 0, 0, 0, 0, 0, 0][index] || 5;
                    const baseDelay = Math.max(wordCount * 250, 2000);
        
                    if (change.elementId === 'changing-text-6') {
                        cumulativeDelay += 8000; // Extra delay for important narrative moment
                    }
        
                    setTimeout(() => {
                        console.log(`Changing text ${index}`);
                        const element = document.getElementById(change.elementId);
                        
                        if (!element) return;

                        // Reset opacity for visibility
                        element.style.opacity = '1';
                        element.style.transition = 'none';
        
                        if (change.newText === '') {
                            fadeOutElement(element);
                        } 
                        else if (change.elementId === 'changing-text-23' && !hasChangedText23) {
                            element.textContent = change.newText;
                            hasChangedText23 = true;
                            
                            // Special case - text that changes after being displayed
                            setTimeout(() => {
                                element.textContent = 'You just wanted to scream at it all.';
                            }, 2000);
                        }
                        else if (change.elementId === 'changing-text-39') {
                            // Special handling for dramatic reveal - word by word
                            const words = change.newText.split(" ");
                            element.textContent = '';
                            
                            words.forEach((word, index) => {
                                setTimeout(() => {
                                    element.textContent += (index > 0 ? ' ' : '') + word;
                                    
                                    // Final word triggers the ending sequence
                                    if (index === words.length - 1) {
                                        setTimeout(() => {
                                            // Fade out all other text
                                            const finalElements = document.querySelectorAll('[id^="changing-text-"]');
                                            finalElements.forEach(el => {
                                                if (el.id !== 'changing-text-39') {
                                                    handleFadeOut([el]);
                                                }
                                            });

                                            // Fade out any solo text elements
                                            const soloTexts = document.querySelectorAll('.solo_text');
                                            soloTexts.forEach(el => {
                                                el.style.transition = 'opacity 12s ease-out';
                                                el.style.opacity = '0';
                                            });
        
                                            // Start video sequence
                                            const videoOverlay = document.querySelector('.video-overlay');
                                            const backgroundVideo = document.getElementById('background-video');
                                            if (videoOverlay && backgroundVideo) {
                                                videoOverlay.classList.add('active');
                                                
                                                const playPromise = backgroundVideo.play();
                                                if (playPromise !== undefined) {
                                                    playPromise
                                                        .then(() => {
                                                            // Video playing successfully
                                                        })
                                                        .catch(e => {
                                                            console.log('Video autoplay failed:', e);
                                                        });
                                                }
        
                                                // Final sequence transitions
                                                setTimeout(() => {
                                                    setTimeout(() => {
                                                        // Fade to black
                                                        const blackFade = document.querySelector('.black-fade');
                                                        blackFade.classList.add('active');
        
                                                        setTimeout(() => {
                                                            // Show final text and form
                                                            const finalText = document.querySelector('.final-text');
                                                            finalText.classList.add('visible');

                                                            const emailCapture = document.querySelector('.email-capture');
                                                            emailCapture.classList.add('visible');

                                                            const email = document.getElementById(`email`);
                                                            email.classList.add('visible');
        
                                                            console.log('Transitioning to final state');
        
                                                            // Reset scroll position
                                                            window.scrollTo(0,0);
                                                            document.body.classList.add('no-scroll');
        
                                                            // Show navigation links
                                                            const home_link = document.getElementById(`home_link`);
                                                            const about_link = document.getElementById(`about_link`);
        
                                                            setTimeout(() => {
                                                                home_link.classList.remove('hidden', 'float-md-end');
                                                                about_link.classList.remove('hidden');
                                                                about_link.classList.add('visible', 'float-md-end');
                                                                home_link.classList.add('visible', 'float-md-start');
                                                            }, 5000);
                                                        }, 5000); 
                                                    }, 350);
                                                }, 15000);
                                            }
                                        }, 4000);
                                    }
                                }, index * 1200); // Delay between words
                            });
                        }
                        else {
                            // Standard text update
                            element.textContent = change.newText;
                        }
                    }, cumulativeDelay);
        
                    cumulativeDelay += baseDelay;
        
                    if (change.elementId === 'changing-text-23') {
                        cumulativeDelay += 2000; // Extra delay for special text
                    }
                }
            });
        }, 80000); // Long initial delay before final sequence
    }
}

// Function to check element visibility and update text opportunistically
function checkVisibilityAndUpdate(textChanges) {
    // Process each text change only for elements not currently visible
    textChanges.forEach(change => {
        const element = document.getElementById(change.elementId);
        if (!element) return;
        
        // Create a unique key for this update
        const updateKey = `${change.elementId}:${change.newText}`;
        
        // Skip if already processed
        if (updatedElements.has(updateKey)) return;
        
        // Opportunistically update elements that aren't currently visible
        if (!isInViewport(element)) {
            smoothUpdateElementText(change.elementId, change.newText);
        }
    });
    
    // For visible elements, schedule updates when user is likely distracted
    const visibleChanges = textChanges.filter(change => {
        const element = document.getElementById(change.elementId);
        const updateKey = `${change.elementId}:${change.newText}`;
        return element && isInViewport(element) && !updatedElements.has(updateKey);
    });
    
    // Batch update visible elements during expected user distractions
    if (visibleChanges.length > 0) {
        if (scrollSpeed > 50) {
            // Fast scrolling is a good time to update
            batchUpdateDuringScrolling(visibleChanges);
        } else {
            // Otherwise schedule updates with delays
            batchUpdateWithDelays(visibleChanges);
        }
    }
}

// Batch update texts during fast scrolling
function batchUpdateDuringScrolling(changes) {
    // During fast scrolling, update multiple elements quickly
    changes.forEach((change, index) => {
        setTimeout(() => {
            smoothUpdateElementText(change.elementId, change.newText);
        }, index * 50); // Very short delay between updates
    });
}

// Batch update texts with longer delays
function batchUpdateWithDelays(changes) {
    // Use longer delays when not scrolling fast
    changes.forEach((change, index) => {
        setTimeout(() => {
            smoothUpdateElementText(change.elementId, change.newText);
        }, 2000 + (index * 800)); // Longer delay between updates
    });
}

/**
 * INITIALIZATION FUNCTION
 * Main entry point that sets up all event listeners and initial state
 */
function initScrollTrigger() {
    // Calculate original heights of all elements
    precomputeMaxHeights();
    
    // Set up video preloading
    document.addEventListener('DOMContentLoaded', () => {
        const video = document.getElementById('background-video');
        if (video) video.load();
    });

    // Clean up video on page unload
    window.addEventListener('beforeunload', () => {
        const video = document.getElementById('background-video');
        if (video) {
            video.pause();
        }
    });

    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
        // Add class to body during scrolling
        document.body.classList.add('is-scrolling');
        
        // Clear any existing scroll timeout
        clearTimeout(window.scrollTimeout);
        
        // Remove class after scrolling stops
        window.scrollTimeout = setTimeout(() => {
            document.body.classList.remove('is-scrolling');
        }, 100);
        
        // Throttle scroll handler
        if (!ticking) {
            window.requestAnimationFrame(() => {
                checkScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Check scroll positions periodically, even when not scrolling
    setInterval(() => {
        checkVisibilityAndUpdate(textChangesTop.concat(
            textChangesBottom,
            textChangesTopTwo,
            textChangesBottomTwo,
            textChangesTopThree
        ));
    }, 2000);
    
    // Initial scroll check
    checkScroll();
    
    // Set up scroll speed monitoring
    setInterval(() => {
        // Gradually reduce scroll speed when not actively scrolling
        if (Date.now() - lastScrollTime > 100) {
            scrollSpeed = Math.max(0, scrollSpeed * 0.8);
        }
    }, 100);
    
    // Initialize random tiny updates to make the site feel "alive"
    initRandomMicroUpdates();
}

// Add subtle random micro-updates to enhance the unsettling feeling
function initRandomMicroUpdates() {
    // Get all paragraph elements that are part of the story
    const paragraphs = document.querySelectorAll('p[id^="changing-text-"]');
    
    // Pick a random paragraph every now and then to add a tiny, nearly imperceptible change
    setInterval(() => {
        // Only apply if triggers have started
        if (!hasTriggered) return;
        
        const randomIndex = Math.floor(Math.random() * paragraphs.length);
        const paragraph = paragraphs[randomIndex];
        
        // Skip if not visible
        if (!isInViewport(paragraph)) return;
        
        // Apply a subtle visual effect
        applySubtleEffect(paragraph);
    }, 15000); // Every 15 seconds
}

// Apply a nearly imperceptible effect to a paragraph
function applySubtleEffect(element) {
    // Options for subtle effects
    const effects = [
        // Subtle letter spacing flicker
        () => {
            const originalSpacing = window.getComputedStyle(element).letterSpacing;
            element.style.transition = 'letter-spacing 2s ease-in-out';
            element.style.letterSpacing = '0.03em';
            
            setTimeout(() => {
                element.style.letterSpacing = originalSpacing;
                
                setTimeout(() => {
                    element.style.transition = '';
                }, 2000);
            }, 2000);
        },
        
        // Brief opacity pulse
        () => {
            element.style.transition = 'opacity 1.5s ease-in-out';
            element.style.opacity = '0.92';
            
            setTimeout(() => {
                element.style.opacity = '1';
                
                setTimeout(() => {
                    element.style.transition = '';
                }, 1500);
            }, 1500);
        }
    ];
    
    // Apply a random effect
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    randomEffect();
}

// Start everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set up smooth scrolling which helps mask text changes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize the main scroll trigger system
    initScrollTrigger();
});