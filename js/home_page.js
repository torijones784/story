document.addEventListener('DOMContentLoaded', () => {
    // Headline reveal animation
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
        }, 3000)
    } 
    
    headlineReveal();
    
    // Background container fix - both approaches
    const bgContainer = document.querySelector('.bg-container');
    const landingPage = document.querySelector('.landing_page');
    
    if (bgContainer && landingPage) {
        // Approach 1: Ensure background has same height as landing page
        function setBackgroundHeight() {
            // Force the background to match the landing page height exactly
            const landingHeight = landingPage.offsetHeight;
            bgContainer.style.height = landingHeight + 'px';
            
            // Disable all transforms and animations
            bgContainer.style.transform = 'none';
            bgContainer.style.transition = 'none';
            bgContainer.style.animation = 'none';
            bgContainer.style.backgroundAttachment = 'scroll';
        }
        
        // Set initial height
        setBackgroundHeight();
        
        // Update on resize
        window.addEventListener('resize', setBackgroundHeight);
        
        // Approach 2: Reset during scroll to prevent any dynamic changes
        window.addEventListener('scroll', function() {
            // Force no transforms during scroll
            bgContainer.style.transform = 'none';
        }, { passive: true });
    }
    
    // Fix for 100vh on mobile browsers
    function setVhVariable() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Also update background height when viewport size changes
        if (bgContainer && landingPage) {
            bgContainer.style.height = landingPage.offsetHeight + 'px';
        }
    }
    
    // Set the --vh variable on initial load and resize
    window.addEventListener('resize', setVhVariable);
    setVhVariable();
});