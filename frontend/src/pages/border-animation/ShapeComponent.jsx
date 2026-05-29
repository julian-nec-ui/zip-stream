
const ShapeComponent = () => {
  const shapeStyle = {
    width: '300px',
    height: '400px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    clipPath: 'path(\'M 10,40 L 70,40 A 10,10 0,0,0 80,30 L 80,10 A 10,10 0,0,1 90,0 L 140,0 A 10,10 0,0,1 150,10 L 150,190 A 10,10 0,0,1 140,200 L 10,200 A 10,10 0,0,1 0,190 L 0,50 A 10,10 0,0,1 10,40 Z\')',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease',
    margin: '20px',
  };

  const contentStyle = {
    textAlign: 'center',
    color: 'white',
    padding: '20px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      padding: '20px'
    }}>
      <div style={shapeStyle}>
        <div style={contentStyle}>
        </div>
      </div>
    </div>
  );
};

export default ShapeComponent;
