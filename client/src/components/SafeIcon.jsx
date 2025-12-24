import React from 'react';

const SafeIcon = ({ icon: Icon, ...props }) => {
  // Check if Icon is a valid component
  if (!Icon || typeof Icon !== 'function') {
    return (
      <div 
        className={`flex items-center justify-center ${props.className || ''}`}
        style={{ width: props.size || '1rem', height: props.size || '1rem' }}
      >
        <span className="text-xs">⚡</span>
      </div>
    );
  }

  try {
    return <Icon {...props} />;
  } catch (error) {
    console.log('Icon rendering error:', error);
    // Fallback to a simple div with text
    return (
      <div 
        className={`flex items-center justify-center ${props.className || ''}`}
        style={{ width: props.size || '1rem', height: props.size || '1rem' }}
      >
        <span className="text-xs">⚡</span>
      </div>
    );
  }
};

export default SafeIcon;
