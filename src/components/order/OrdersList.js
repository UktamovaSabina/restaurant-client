import React from 'react'

const OrdersList = () => {
  return (
    <div className='p-5'>
      <h2 className='text-center mb-3'>Orders List</h2>
      <div className='table-responsive'>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>#</th>
            <th>username</th>
            <th>email</th>
            <th>total amount</th>
            <th>status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>sabina</td>
            <td>sabina@gmail.com</td>
            <td>100000so'm</td>
            <td>pending</td>
            <td><button className='btn btn-primary'>verify</button></td>
          </tr>
          <tr>
            <td>2</td>
            <td>kikish</td>
            <td>kikish@gmail.com</td>
            <td>200000so'm</td>
            <td>pending</td>
            <td><button className='btn btn-success'>verified</button></td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default OrdersList