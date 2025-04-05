import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login form submitted:', formData);

    // Set the user as logged in (this will be detected by Header component)
    localStorage.setItem('userLoggedIn', 'true');

    // Simulate a successful login
    toast.success('Login successful!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeButton: false,
      pauseOnHover: true,
      draggable: true,
    });

    // Dispatch a custom event to notify other components of login
    const loginEvent = new Event('userLoggedIn');
    window.dispatchEvent(loginEvent);

    // Redirect to home after login
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an account? <button onClick={() => navigate('/signin')}>Sign Up</button>
      </p>

      <ToastContainer closeButton={false} />
    </div>
  );
};

export default Login;