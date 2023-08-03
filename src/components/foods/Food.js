import React, { useEffect, useState } from 'react';
import { MdFoodBank, MdOutlineBorderColor } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiFoodMenu } from 'react-icons/bi';
import { TfiLocationPin } from 'react-icons/tfi';
import './Food.css';
import renderData from '../../hooks/fetchData'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Food = () => {
  let deleteQuery = `mutation Mutation($id: ID) {
    deleteFood(id: $id) {
      status
      message
    }
  }`
  const id = useParams();
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { foods } = useSelector(data => data)
  console.log(foods);

  let query = `
query Query($id: ID) {
  singleRestaurant(id: $id) {
    status
    message
    data {
      id
      restaurant_name
      foods {
        id
        food_name
        food_price
        food_img_link
        restaurant
      }
    }
  }
}`
  const myFunc = (q, i) => {
    renderData(q, i)
      .then(res => setData(res.singleRestaurant.data))
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    myFunc(query, id)
  }, [query, id])

  return (
    <div className='p-2'>
      {
        data.restaurant_name ?
          <h2 className='text-center mb-4 fw-bolder'><span className='text-danger py-1 px-2 border border-2 border-danger-subtle rounded-2'>{data.restaurant_name}</span> menu <BiFoodMenu /> :</h2>
          :
          <h2 className='text-center mb-4 fw-bolder'>...Loading</h2>
      }
      <div><button className='btn btn-warning order-btn' onClick={() => {
        navigate('/order')
      }}>order <MdFoodBank /></button></div>
      <ul className='foods-wrapper'>
        {
          data.foods && data.foods.length > 0 ? data.foods.map(f => {
            return <li key={f.id} className="d-flex">
              <img src={f.food_img_link} alt={f.food_name} className="food-img img-fluid rounded-start" />
              <div className='food-info-body'>
                <h3 className='fs-1 fw-bold'>{f.food_name}</h3>
                <h5 className='text-danger'>Location: {data.restaurant_name}<TfiLocationPin /></h5>
                <p className='fs-4'>{f.food_price} so'm</p>
                <div className='d-flex gap-2'>
                  <button className='btn btn-danger' onClick={async () => {
                    if (localStorage.getItem('token')) {
                      const res = await renderData(deleteQuery, { id: f.id });
                      if (res.deleteFood.status === 200) {
                        alert(res.deleteFood.message);
                      }
                    } else {
                      alert("You are not admin! You have no access! :(")
                    }
                  }}><RiDeleteBin6Line /></button>
                  <button className='btn btn-warning' onClick={() => {
                    if (localStorage.getItem('token')) {
                      return navigate(`/`)
                    } else {
                      return alert("you are not an admin! you have no access!")
                    }
                  }}><MdOutlineBorderColor /></button>
                  <button className={`btn ${foods.includes(f.id) ? "btn-danger" : " btn-warning"}`} onClick={() => {
                    dispatch({ type: "data", food: f.id })
                  }}>{foods.includes(f.id) ? "decline" : "order"}</button>
                </div>
              </div>
            </li>
          }) : <li className='align-self-center py-5 my-5'>No menu yet...</li>
        }
      </ul>
      <div className='text-center my-5'>
        <button className='btn btn-success' onClick={() => {
          if (localStorage.getItem('token')) {
            navigate('/food')
          } else {
            alert("You are not an admin! You have no access :(")
          }
        }}>+ add food</button>
      </div>
    </div>
  )
}

export default Food