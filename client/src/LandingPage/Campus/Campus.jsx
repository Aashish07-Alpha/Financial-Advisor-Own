import React, { useEffect, useRef } from 'react'
import './Campus.css';
import gallery_1 from '../../assets/memo2.jpg'
import gallery_2 from '../../assets/memo1.jpg'
import gallery_3 from '../../assets/memo3.jpg'
import gallery_4 from '../../assets/memo4.jpg'
import white_arrow from '../../assets/white-arrow.png'

const Campus = () => {
  const galleryRef = useRef(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let animationId;
    let scrollPosition = 0;
    let isPaused = false;
    const scrollSpeed = 0.5; // Slower speed for smoother animation

    // Function to get current image width based on screen size
    const getImageWidth = () => {
      if (window.innerWidth <= 480) return 180; // Mobile small
      if (window.innerWidth <= 768) return 200; // Mobile medium
      return 300; // Desktop
    };

    // Function to get current margin between images
    const getImageMargin = () => {
      if (window.innerWidth <= 480) return 12; // Mobile small
      if (window.innerWidth <= 768) return 15; // Mobile medium
      return 20; // Desktop
    };

    const animate = () => {
      if (!isPaused) {
        scrollPosition += scrollSpeed;
        if (gallery) {
          gallery.style.transform = `translateX(-${scrollPosition}px)`;
          
          // Calculate reset position based on current screen size
          const imageWidth = getImageWidth();
          const imageMargin = getImageMargin();
          const totalImageWidth = imageWidth + imageMargin;
          const resetPosition = totalImageWidth * 4; // 4 images
          
          // Smoothly reset to beginning when reaching the end
          if (scrollPosition >= resetPosition) {
            // Instead of jumping back, smoothly transition to the duplicate set
            // This creates the illusion of infinite forward movement
            scrollPosition = 0;
            gallery.style.transition = 'transform 0.1s ease-out';
            gallery.style.transform = `translateX(0px)`;
            
            // Remove transition after reset to maintain smooth animation
            setTimeout(() => {
              if (gallery) {
                gallery.style.transition = 'none';
              }
            }, 100);
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    // Add hover event listeners to pause/resume animation
    const handleMouseEnter = () => {
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isPaused = false;
    };

    // Add event listeners to gallery
    gallery.addEventListener('mouseenter', handleMouseEnter);
    gallery.addEventListener('mouseleave', handleMouseLeave);

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      // Remove event listeners
      gallery.removeEventListener('mouseenter', handleMouseEnter);
      gallery.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className='campus'>
        <div className="gallery" ref={galleryRef}>
            <img src={gallery_1} alt="" />
            <img src={gallery_2} alt="" />
            <img src={gallery_3} alt="" />
            <img src={gallery_4} alt="" />
            {/* Duplicate images for seamless loop */}
            <img src={gallery_1} alt="" />
            <img src={gallery_2} alt="" />
            <img src={gallery_3} alt="" />
            <img src={gallery_4} alt="" />
        </div>
        <button className='btn dark-btn'>See more here <img src={white_arrow} alt="" /></button>
    </div>
  )
}

export default Campus