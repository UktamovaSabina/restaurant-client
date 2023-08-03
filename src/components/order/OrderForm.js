import './Order.css';
import React, { useState, useEffect } from 'react';
import Order from './Order'
import renderData from '../../hooks/fetchData';
import {foods} from '../../database/data'

const OrderForm = () => {

  const [data, setData] = useState()
  const query = `query Query {
    foods {
      status
      message
      data {
        id
        food_name
        food_price
        food_img_link
        restaurant_id
        restaurant
      }
    }
  }`
  function myFunc(q) {
    renderData(q)
      .then(res => setData(res.foods.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    console.log(data);
    myFunc(query)
  })
  return (
    <div className='p-5'>
      <h2 className='text-center mb-4'>Order food</h2>
      <Order foods={foods} />
      <h2 className='text-center mb-2 text-primary'>Total amount: 0</h2>
      <form action="" className='order-form'>
        <input required className='form-control' type="text" placeholder='enter your username' />
        <input required className='form-control' type="email" placeholder='enter your email' />
        <div className='d-flex justify-content-end px-3'><button className='btn btn-primary'>order</button></div>
      </form>
    </div>
  )
}

export default OrderForm