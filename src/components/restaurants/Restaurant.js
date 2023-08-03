import React, { useEffect, useState } from 'react';
import './Restaurant.css';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineBorderColor } from 'react-icons/md';
import { CgEnter } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import renderData from '../../hooks/fetchData.js';



const Restaurant = () => {
    let navigate = useNavigate()
    let [data, setData] = useState(null);

    let query = `query Query {
        restaurants {
          status
          message
          data {
            id
            restaurant_name
            restaurant_img_link
            foods {
              id
              food_name
              food_price
              food_img_link
              restaurant_id
              restaurant
            }
          }
        }
      }`
    let deleteQuery = `mutation Mutation($id: ID) {
        deleteRestaurant(id: $id) {
          status
          message
        }
      }`

    const myFunc = (query) => {
        renderData(query)
            .then(res => setData(res.restaurants.data))
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        myFunc(query)
    }, [query, data])

    function addRestaurant() {
        if (!localStorage.getItem('token')) {
            return alert("You are not admin! You have no access :)")
        }
        navigate('/restaurant');
    }

    return (
        <>
            <h1 className='text-center mb-3'>Restaurants</h1>
            <ul className='restaurants-wrapper'>
                {
                    !data ? <li className='bg-transparent d-flex justify-content-center align-items-center'><div className='loader-wrapper'><span className="loader"></span></div></li> : data?.length > 0 ? data.map(r => {
                        return (<li key={r.id} className="card">
                            <img src={`${r.restaurant_img_link}`} alt={r.restaurant_name} className="card-img-top" />
                            <div className='card-body'>
                                <h3 className='card-title mb-2'>{r.restaurant_name}</h3>
                                <div className='d-flex justify-content-around align-items-center'>
                                    <button className='btn btn-danger' onClick={async () => {
                                        if (localStorage.getItem('token')) {
                                            const res = await renderData(deleteQuery, { id: r.id });
                                            if (res.deleteRestaurant.status === 200) {
                                                alert(res.deleteRestaurant.message);
                                            }
                                        } else {
                                            alert("You are not admin! You have no access! :(")
                                        }
                                    }}><RiDeleteBin6Line /></button>
                                    <button className='btn btn-warning' onClick={() => {
                                        navigate(`/restaurant/${r.id}`)
                                    }}><MdOutlineBorderColor /></button>
                                    <button className='btn btn-primary' onClick={() => {
                                        navigate(`/foods/${r.id}`)
                                    }}>Visit<CgEnter /></button>
                                </div>
                            </div>
                        </li>)
                    }) : <li>No data....</li>
                }
            </ul>
            <div className='text-center my-5'>
                <button className='btn btn-success' onClick={addRestaurant}>+ add restaurant</button>
            </div>
        </>
    )
}

export default Restaurant