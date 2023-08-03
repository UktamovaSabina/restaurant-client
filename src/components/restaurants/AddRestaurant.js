import React, { useState } from 'react';
import './Restaurant.css';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const RestaurantCreate = () => {

    const [name, setName] = useState('')
    const [file, setFile] = useState()
    const navigate = useNavigate()
    let query = gql`
    mutation Mutation($name: String, $file: Upload) {
        createRestaurant(restaurant_name: $name, file: $file) {
          status
          message
        }
      }
    `
    
    const [uploadFile] = useMutation(query, {
        onCompleted: data => console.log(data)
    })

    const handleFileUpload = () => {
        if (!file || !name) return
        uploadFile({ variables: { file, name } })
        navigate('/')
    }

    return (
        <div className='p-5'>
            <h2 className='text-center mb-3'>Add restaurant</h2>
            <form action="" className='restaurant-form'>
                <input required className='form-control' type="text" placeholder='enter restaurant name' onInput={(e) => { setName(e.target.value) }} />
                <input required className='form-control text-field-box' type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                <div className='d-flex justify-content-end px-3'>
                    <button type='submit' className='btn btn-primary' onClick={handleFileUpload}>Add</button>
                </div>
            </form>
        </div>
    )
}

export default RestaurantCreate