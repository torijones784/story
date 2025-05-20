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
        }, 2000)
    } 
    
    headlineReveal();
    
    // Fix background container size
    const bgContainer = document.querySelector('.bg-container');
    const landingPage = document.querySelector('.landing_page');
    
    if (bgContainer && landingPage) {
        // Store the initial size and position of the background
        const initialRect = landingPage.getBoundingClientRect();
        const initialHeight = initialRect.height;
        
        // Force the background to have fixed dimensions based on initial landing page size
        bgContainer.style.height = initialHeight + 'px';
        
        // Lock background in place during scroll
        let lastScrollY = window.scrollY;
        
        function lockBackground() {
            // Don't let the background container's size change during scroll
            bgContainer.style.height = initialHeight + 'px';
            
            // Reset any transforms
            bgContainer.style.transform = 'none';
            
            // Get current landing page position
            const rect = landingPage.getBoundingClientRect();
            
            // If we've scrolled enough to change the landing page position,
            // make sure the background stays within it
            if (rect.top < 0) {
                // Make the background stay at the top of the viewport until landing page is gone
                bgContainer.style.top = Math.abs(rect.top) + 'px';
            } else {
                bgContainer.style.top = '0px';
            }
            
            lastScrollY = window.scrollY;
        }
        
        // Update on scroll
        window.addEventListener('scroll', lockBackground, { passive: true });
    }
});