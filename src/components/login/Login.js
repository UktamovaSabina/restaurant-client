import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import renderData from '../../hooks/fetchData';
import './Login.css';

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const query = `query Query($username: String, $password: String) {
    admin(username: $username, password: $password) {
      status
      message
      token
    }
  }`

  return (
    <div className='p-3'>
      <h2 className='text-center'>Login</h2>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const { admin: { status, message, token } } = await renderData(query, { username, password });
        if (status === 200) {
          localStorage.setItem('token', token)
          alert(message);
          navigate('/')
          window.location.reload(); 
        } else {
          alert(message);
          setPassword('')
          setUsername('')
        }

      }} id='form1' className="login-form d-flex flex-column justify-content-center align-items-center p-5">
        <input onInput={(e) => setUsername(e.target.value)} value={username} type="text" name="username" id="username" placeholder='enter your username' className='form-control mb-3' />
        <input onInput={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder='enter your password' className='form-control mb-3' />
        <div className='d-flex justify-content-end'>
          <button className='btn btn-primary px-5'>log in</button>
        </div>
      </form>
    </div>
  )
}

export default Login