import React from 'react';
import {SiIfood} from 'react-icons/si'
import { foods } from '../../database/data';
import Order from '../order/Order';

const Cart = () => {
  return (
    <div className='p-5'>
        <h2 className='text-center'>Ordered foods by Sabina <SiIfood/></h2>
        <Order foods={foods}/>
        <div className='text-center'>
        <h3>Your username: Sabina</h3>
        <h4>Your email: sabina@gmail.com</h4>
        </div>
    </div>
  )
}

export default Cart