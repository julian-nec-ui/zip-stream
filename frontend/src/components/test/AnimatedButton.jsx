import './AnimatedButton.css';

const AnimatedButton = ({ children, onClick }) => {
  return (
    <button
      className="animated-button"
      onClick={onClick}
    >
      <span className="button-content">
        <span className="button-text">{children}</span>
        <svg
          className="animated-svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>

      </span>
    </button>
  );
};

export default AnimatedButton;
