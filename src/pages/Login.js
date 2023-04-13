import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppProvider';
import '../styles/Login.css';

function Login() {
  const [componentEmail, setComponentEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const history = useHistory();
  const { functions: { setEmail, setTitle } } = useContext(AppContext);

  useEffect(() => {
    const minCharacters = 6;
    if (componentEmail.includes('@') && componentEmail.includes('.com')
    && password.length > minCharacters) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [componentEmail, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userEmail = { email: componentEmail };
    setEmail(componentEmail);
    localStorage.setItem('user', JSON.stringify(userEmail));
    history.push('/meals');
    setTitle('Meals');
  };

  return (
    <div className="login-wrapper">
      <form
        onSubmit={ handleSubmit }
      >
        <input
          type="email"
          data-testid="email-input"
          name="email"
          value={ componentEmail }
          onChange={ ({ target }) => setComponentEmail(target.value) }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          data-testid="login-submit-btn"
          disabled={ isDisabled }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
