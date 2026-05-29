
const CircularArrow = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      width: '30px',
      height: '30px'
    }}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 100 100"
        // style={{ 
        //   animation: 'spin 2s linear infinite'
        // }}
      >
        {/* Partial circle (80% of 360deg = 288deg) */}
        <circle 
          cx="50" 
          cy="50" 
          r="40" 
          fill="none" 
          stroke="#FFFCFC" 
          strokeWidth="10" 
          strokeDasharray="198 360"
          strokeLinecap="arrow"
        />
        
        {/* Arrowhead that follows the circle */}
        <g transform="translate(50,10)">
          <polygon 
            points="0,-30 16,0 16,0 0,20 0,-20 16,0 16,0 0,-30" 
            fill="#FFFCFC"
            transform="rotate(0)"
          />
        </g>
      </svg>
      
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(-360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export default CircularArrow;