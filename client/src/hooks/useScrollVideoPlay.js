import { useEffect, useRef, useState } from 'react';

const useScrollVideoPlay = (options = {}) => {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  
  const {
    threshold = 0.6,
    rootMargin = '50px',
    autoplayOnce = true
  } = options;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (!hasPlayed && autoplayOnce) {
              const iframe = entry.target.querySelector('iframe');
              if (iframe) {
                const currentSrc = iframe.src;
                const videoId = currentSrc.match(/embed\/([^?]+)/)?.[1];
                
                if (videoId) {
                  iframe.src = `https://www.youtube.com/embed/${videoId}?start=1&autoplay=1&mute=1`;
                  setHasPlayed(true);
                }
              }
            }
          } else {
            setIsInView(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [threshold, rootMargin, hasPlayed, autoplayOnce]);

  return { videoRef, isInView, hasPlayed };
};

export default useScrollVideoPlay;