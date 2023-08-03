import React from 'react';
import './Order.css';

const Order = ({foods}) => {

  return (
    <>
        {
        <ul className="ordered-foods-wrapper mb-5 d-flex flex-wrap justify-content-center gap-2 align-items-center p-2">
          {
            foods.map(f => {
              return <li key={f.food_id}>
                <div className='ordered-img-wrapper'>
                  <img src={f.food_img_link} alt={f.food_name} className="img-fluid rounded" />
                </div>
                <h3>{f.food_name}</h3>
                <p>{f.food_price}</p>
                <button className='btn btn-danger'>cancel</button>
              </li>
            })
          }
        </ul>
      }
    </>
  )
}

export default Order