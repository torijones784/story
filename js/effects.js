// BewitchedText.js
const BewitchedText = ({ children, intensity = 'subtle' }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [shouldAnimate, setShouldAnimate] = React.useState(false);
    
    React.useEffect(() => {
      // Randomly trigger the effect sometimes
      const interval = setInterval(() => {
        const shouldTrigger = Math.random() < 0.1;
        if (shouldTrigger) {
          setShouldAnimate(true);
          setTimeout(() => setShouldAnimate(false), 2000);
        }
      }, 8000);
      
      return () => clearInterval(interval);
    }, []);
  
    const getTextShadow = () => {
      if (intensity === 'subtle') {
        return isHovered || shouldAnimate ? '0 0 8px rgba(255, 255, 255, 0.4)' : 'none';
      }
      return isHovered || shouldAnimate ? '0 0 12px rgba(255, 255, 255, 0.6)' : 'none';
    };
  
    return React.createElement('span', {
      style: {
        display: 'inline-block',
        transition: 'all 1s ease',
        opacity: (isHovered || shouldAnimate) ? 0.9 : 1,
        textShadow: getTextShadow(),
        transform: (isHovered || shouldAnimate) ? 'scale(1.01)' : 'scale(1)',
      },
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false)
    }, children);
  };
  
  // AmbientBackdrop.js
  const AmbientBackdrop = () => {
    const canvasRef = React.useRef(null);
    
    React.useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let frame;
      
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      window.addEventListener('resize', resize);
      resize();
      
      const particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 100 + 50,
        vx: Math.random() * 0.2 - 0.1,
        vy: Math.random() * 0.2 - 0.1,
        opacity: Math.random() * 0.05
      }));
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          
          if (p.x < -p.size) p.x = canvas.width + p.size;
          if (p.x > canvas.width + p.size) p.x = -p.size;
          if (p.y < -p.size) p.y = canvas.height + p.size;
          if (p.y > canvas.height + p.size) p.y = -p.size;
          
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${p.opacity})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        
        frame = requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(frame);
      };
    }, []);
  
    return React.createElement('canvas', {
      ref: canvasRef,
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.3,
        mixBlendMode: 'screen',
        zIndex: -1
      }
    });
  };
  
  // Initialize the components
  const initializeEffects = () => {
    // Add ambient backdrop
    const backdropContainer = document.createElement('div');
    document.body.prepend(backdropContainer);
    ReactDOM.render(React.createElement(AmbientBackdrop), backdropContainer);
    
    // Add bewitched text effect to specific elements
    const elementsToEnchant = [
      'changing-text-1',
      'changing-text-3',
      'changing-text-16',
      'changing-text-29',
      'changing-text-43',
      'changing-text-56',
      'changing-text-58',
      'changing-text-60'
    ];
    
    elementsToEnchant.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        const container = document.createElement('span');
        element.parentNode.insertBefore(container, element);
        const content = element.textContent;
        element.remove();
        ReactDOM.render(
          React.createElement(BewitchedText, { intensity: 'subtle' }, content),
          container
        );
      }
    });
  };
  
  // Initialize when document is ready
  document.addEventListener('DOMContentLoaded', initializeEffects);