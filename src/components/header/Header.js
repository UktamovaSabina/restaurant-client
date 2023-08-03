import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {

  const navigate = useNavigate()
  const [auth, setAuth] = useState(false);
  const [login, setLogin] = useState('login');

  useEffect(()=>{
    if (localStorage.getItem('token')) {
      setAuth(true)
      setLogin('logout')
    }
  }, [auth, login])

  return (
    <div className='d-flex justify-content-between align-items-center header-container mb-5 mt-3'>
      <div className='btn-group'>
        <button className='btn btn-primary' onClick={()=>{
          if(!localStorage.getItem('token')){
            return navigate('/login')
          } else {
            localStorage.clear('token')
            alert("You are logged out!")
            window.location.reload()
          }
        }}>{login}</button>
        <button className='btn btn-danger' onClick={()=>{
          navigate('/')
        }}>home</button>
      </div>
      <span className='text-primary border py-1 px-2 border-2 border-primary-subtle rounded-2'>you are {auth ? "an admin" : "a client"}</span>
      <button onClick={()=>{
        auth ? navigate('/orders') : navigate('/cart')
      }} className='btn btn-secondary'>{auth ? "see all orders" : "korzinka"}</button>
    </div>
  )
}

export default Header