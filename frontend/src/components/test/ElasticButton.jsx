
const ElasticButton = () => {
  const buttonStyle = {
    padding: '15px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    outline: 'none',
    // Smooth transition for the scaling effect
    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', 
    transformOrigin: 'left',
    display: 'inline-block',
  };

  const handleMouseOver = (e) => {
    // Stretch horizontally on hover
    e.target.style.transform = 'scaleX(1.15)'; 
  };

  const handleMouseOut = (e) => {
    // Revert to original size
    e.target.style.transform = 'scaleX(1)';
  };

  return (
    <button
      style={buttonStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      Hover Me
    </button>
  );
};

export default ElasticButton;
