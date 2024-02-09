import React from 'react'

const AllProducts = ({users}) => {
  console.log(users);
  return (
    <div>
        <h3 className="py-4 md:mt-6 text-3xl text-blue-700 font-semibold text-left">
              Products
            </h3>
          <table className="w-full table table-bordered">
            <thead>
              <tr>
                <th>Item Name</th>

                <th>Price</th>
                <th>Qty</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {users.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.price}</td>

                  <td>{row.qty}</td>
                  <td>{row.sum}</td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  )
}

export default AllProducts
