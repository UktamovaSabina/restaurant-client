import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import renderData from '../../hooks/fetchData';
import './Restaurant.css';
import { BiEditAlt } from 'react-icons/bi';

let editQuery = `mutation Mutation($name: String, $id: ID) {
    updateRestaurant(restaurant_name: $name, id: $id) {
      status
      message
      data {
        restaurant_name
        id
      }
    }
  }`

const EditRestaurant = () => {
  const id = useParams();
  const [data, setData] = useState('');
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  let query = `query Query($id: ID) {
        singleRestaurant(id: $id) {
          status
          message
          data {
            id
            restaurant_name
            restaurant_img_link
          }
        }
      }`

  function myFunc(q, i) {
    renderData(q, i)
      .then(res => {
        setData(res.singleRestaurant.data)
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    myFunc(query, id)
  }, [query, id])

  return (
    <div className='p-5'>
      <h2 className='text-center mb-3'>Edit name of restaurant <BiEditAlt /> </h2>
      <h3 className='text-center text-danger fw-bold'>{data.restaurant_name}</h3>
      <div className='text-center mb-3'><img src={data.restaurant_img_link} alt="restaurant" width={300} className="rounded" /></div>
      <form action="" className='restaurant-form'>
        <input required className='form-control' type="text" placeholder='enter changed restaurant name' value={inputValue} onInput={(e) => {
          setInputValue(e.target.value)
        }} />
        <div className='d-flex justify-content-end px-3'>
          <button type='submit' className='btn btn-primary' onClick={async (e) => {
            e.preventDefault()
            if (inputValue) {
              const res = await renderData(editQuery, { name: inputValue, id: data.id });
              if (res.updateRestaurant.status === 200) {
                alert(res.updateRestaurant.message);
                return navigate('/')
              } else {
                alert(res.updateRestaurant.message);
                setInputValue('')
              }
            }
          }}>Edit</button>
        </div>
      </form>
    </div>
  )
}

export default EditRestaurant