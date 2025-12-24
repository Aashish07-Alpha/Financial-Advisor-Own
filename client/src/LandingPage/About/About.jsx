import React from 'react';
import "./About.css";
import useScrollVideoPlay from '../../hooks/useScrollVideoPlay';
import { Play } from 'lucide-react';

const About = () => {
  const { videoRef, isInView, hasPlayed } = useScrollVideoPlay({
    threshold: 0.6,
    rootMargin: '50px',
    autoplayOnce: true
  });

  return (
    <div className='about'>
      <div className="about-left" ref={videoRef}>
        <div className={`video-container ${isInView ? 'video-active' : ''}`}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/zZ-VeqYPxoA?start=1&autoplay=0&mute=1"
            title="Financial Planning Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="about-video"
          />
          {/* Play indicator overlay */}
          {!hasPlayed && isInView && (
            <div className="play-overlay">
              <div className="play-button">
                <Play className="play-icon" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="about-right">
        <h3>ABOUT US</h3>
        <h2>Guiding You Towards Financial Freedom</h2>
        <p>At FinAdvise, we are dedicated to helping individuals and businesses achieve financial security and growth. Our expert advisors provide tailored solutions for investments, retirement planning, wealth management, and more.</p>
        <p>With years of experience and a commitment to excellence, we offer personalized financial strategies that align with your goals and aspirations. Our mission is to simplify financial decision-making, ensuring a secure and prosperous future for you and your loved ones.</p>
        <p>Partnering with trusted institutions and leveraging industry insights, we empower our clients with the knowledge and confidence needed to make informed financial choices. Let us guide you on the path to financial success.</p>
      </div>
    </div>
  );
};

export default About;