
const WireCommunication = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '300px',
      background: '#f5f7fa',
      borderRadius: '12px',
      padding: '20px'
    }}>
      <svg 
        width="400" 
        height="200" 
        viewBox="0 0 400 200"
        style={{ maxWidth: '100%', height: 'auto' }}
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#053981" strokeWidth="1.0"opacity="0.4" />
          </pattern>
          <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F7F7FA" />
            <stop offset="100%" stopColor="#7E15E7" />
          </linearGradient>
          <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E30A0A" />
            <stop offset="100%" stopColor="#F7F7FA" />
          </linearGradient>
        </defs>
        
        {/* Grid background */}
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Left device */}
        <rect x="47" y="80" width="80" height="60" rx="8" fill="#4a6fa5" stroke="#2c4a7a" strokeWidth="2"/>
        <rect x="53" y="90" width="55" height="30" rx="4" fill="#3a5a8a" />
        <text x="81" y="110" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Device A</text>
        
        {/* Right device */}
        <rect x="290" y="80" width="80" height="60" rx="8" fill="#4a6fa5" stroke="#2c4a7a" strokeWidth="2"/>
        <rect x="300" y="90" width="55" height="30" rx="4" fill="#3a5a8a" />
        <text x="327" y="110" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Device B</text>
        
        {/* Wire */}
        <path 
          d="M 110 100 Q 200 50 290 100" 
          stroke="url(#wireGradient)" 
          strokeWidth="4" 
          fill="none" 
          strokeLinecap="round"
        />
        
        {/* Wire pulse animation */}
        <path 
          d="M 110 100 Q 200 50 290 100" 
          stroke="url(#pulseGradient)" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray="10,10"
        >
          <animate 
            attributeName="stroke-dashoffset" 
            values="0;100" 
            dur="3s" 
            repeatCount="indefinite" 
          />
        </path>
        
        {/* Data packets */}
        <circle 
          cx="110" 
          cy="100" 
          r="6" 
          fill="#ff6b6b" 
          stroke="#ff0000" 
          strokeWidth="1"
        >
          <animate 
            attributeName="cx" 
            values="110;290" 
            dur="3s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="opacity" 
            values="1;0.3;1" 
            dur="1s" 
            repeatCount="indefinite" 
          />
        </circle>
        
        <circle 
          cx="290" 
          cy="100" 
          r="6" 
          fill="#ffa502" 
          stroke="#ff8c00" 
          strokeWidth="1"
        >
          <animate 
            attributeName="cx" 
            values="290;110" 
            dur="2s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="opacity" 
            values="1;0.3;1" 
            dur="1s" 
            repeatCount="indefinite" 
          />
        </circle>
        
        {/* Direction indicators */}
        <text x="200" y="54" textAnchor="middle" fontSize="13" fill="#000">Data Flow</text>
        
        {/* Arrows */}
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="7" 
            refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#FF0000" />
          </marker>
        </defs>
        
        <line x1="110" y1="100" x2="270" y2="100" 
          stroke="#FF0000" strokeWidth="1.75" markerEnd="url(#arrow)" />
        
        {/* Status indicators */}
        <circle cx="125" cy="68" r="6" fill="#03D00A"> <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/> </circle>
        <circle cx="290" cy="68" r="6" fill="#4CAF50"> <animate attributeName="opacity" values="1;0.3;1" dur="1.55s" repeatCount="indefinite"/> </circle>
        
        {/* Labels */}
        <text x="87" y="157" textAnchor="middle" fontSize="12" fill="#000000">Sender</text>
        <text x="330" y="157" textAnchor="middle" fontSize="12" fill="#000000">Receiver</text>
      </svg>
    </div>
  );
};

export default WireCommunication;
