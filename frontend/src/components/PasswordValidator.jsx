import { useState } from 'react';

const PasswordValidator = () => {
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');

  // Regex pattern that excludes spaces, dots, underscores, hyphens, backticks, quotes, commas, semicolons
  const passwordRegex = /^(?!.*[ ._,\-`"';,:]).*$/;

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    if (newPassword.length === 0) {
      setIsValid(false);
      setError('');
    } else if (passwordRegex.test(newPassword)) {
      setIsValid(true);
      setError('');
    } else {
      setIsValid(false);
      setError('Password cannot contain spaces, dots, underscores, hyphens, backticks, quotes, commas, columns, or semicolons');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h3>Password Validator</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter password"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            border: `1px solid ${isValid ? 'green' : error ? 'red' : '#ccc'}`,
            borderRadius: '4px'
          }}
        />
      </div>
      {error && (
        <div style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>
          {error}
        </div>
      )}
      {password.length > 0 && isValid && (
        <div style={{ color: 'green', fontSize: '14px' }}>
          ✓ Valid password
        </div>
      )}
    </div>
  );
};

export default PasswordValidator;
