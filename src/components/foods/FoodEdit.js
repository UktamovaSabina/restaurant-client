import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import renderData from '../../hooks/fetchData';

const FoodEdit = () => {
    const id = useParams();
    const [data, setData] = useState();
    // const [inputValue, setInputValue] = useState('');
    // const navigate = useNavigate();

    const query = `query Query($id: ID) {
        singleFood(id: $id) {
          status
          message
          data {
            id
            food_name
            food_price
            food_img_link
            restaurant
          }
        }
      }`

    function myFunc(q, i) {
        renderData(q, i)
            .then(res => {
                setData(res)
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        myFunc(query, id)
        console.log(data);
    }, [query, id, data])


    return (
        <div className='p-5'>
            <h2 className='text-center mb-3'>Edit Food</h2>
            <div className='text-center mb-3'><img src="https://avatars.mds.yandex.net/i?id=d2e83f8da3e25e328d19263b4dcd6bd1bb9f0e9f-10354418-images-thumbs&n=13" alt="" width={300} className="rounded" /></div>
            <form action="" className='food-form'>
                <input className='form-control' type="text" placeholder='enter food name' />
                <input className='form-control' type="number" placeholder='enter food price' />
                <div className='d-flex justify-content-end px-3'>
                    <button type='submit' className='btn btn-primary'>edit</button>
                </div>
            </form>
        </div>
    )
}

export default FoodEdit