import React, { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import renderData from '../../hooks/fetchData';

const FoodAdd = () => {

    const navigate = useNavigate();
    const [file, setFile] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [select, setSelect] = useState('');
    const [data, setData] = useState('');

    let query = gql`
    mutation Mutation($name: String, $price: Int, $file: Upload, $select: ID) {
    createFood(food_name: $name, food_price: $price, file: $file, restaurant_id: $select) {
    status
    message
        }
    }`

    let getQuery = `query Query {
        restaurants {
          data {
            id
            restaurant_name
          }
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
        myFunc(getQuery)
        console.log();
    }, [getQuery, data])



    const [uploadFile] = useMutation(query, {
        onCompleted: data => console.log(data)
    })

    const handleFileUpload = () => {
        if (!file || !name) return
        uploadFile({ variables: { file, name, price: +price, select } })
        navigate('/')
    }

    return (
        <div className='p-5'>
            <h2 className='text-center mb-3'>Add Food</h2>
            <form action='' className='food-form'>
                <input className='form-control' type="text" placeholder='enter food name' onInput={(e) => { setName(e.target.value) }} />
                <input className='form-control' type="number" placeholder='enter food price' onInput={(e) => { setPrice(e.target.value) }} />
                <input className='form-control text-field-box' type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                <select className='form-select' onChange={(e) => { setSelect(e.target.value) }}>
                    <option value="fast-food" selected disabled>Fast-food</option>
                    {
                        data? data.map(d => {
                            return <option key={d.id} value={d.id}>{d.restaurant_name}</option>
                        }) : <></>
                    }
                </select>
                <div className='d-flex justify-content-end px-3'>
                    <button type='button' className='btn btn-primary' onClick={handleFileUpload}>Add</button>
                </div>
            </form>
        </div>
    )
}

export default FoodAdd