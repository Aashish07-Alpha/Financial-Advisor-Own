// components/ui/Button.js
export function Button({ children, onClick, className }) {
    return (
      <button
        onClick={onClick}
        className={`bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ${className}`}
      >
        {children}
      </button>
    );
  }
  