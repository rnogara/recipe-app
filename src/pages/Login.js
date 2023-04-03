import React from 'react';

function Login() {
  return (
    <div>
      <form
        onSubmit={ (e) => { e.preventDefault(); } }
      >
        <input
          type="email"
          data-testid="email-input"
          name="email"
        />
        <input
          type="text"
          data-testid="password-input"
          name="password"
        />
        <button
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
