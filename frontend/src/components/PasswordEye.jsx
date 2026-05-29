
const PasswordEye = ({ isVisible, onClick, size = 24 }) => {
  const eyeIcon = isVisible ? (
    // Eye visible (show password)
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    // Eye hidden (hide password)
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-label={isVisible ? "Hide password" : "Show password"}
    >
      {eyeIcon}
    </button>
  );
};

export default PasswordEye;
