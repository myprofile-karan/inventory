import { useState } from "react";
import axios from "axios";
import AllProducts from "./AllProducts";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Header from "./Header";

function Inventory() {
  const [users, setUsers] = useState([]);

  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState();
  const [sum, setSum] = useState(0);

  function Calculation() {
    if (name != "" && price != "" && qty != "") {
      axios
        .post("http://localhost:3000/product", { name, price, qty, sum })
        .then((result) => {
          toast.success("Product added", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log(result);
        })
        .catch((error) => console.log(error));
    }

    users.push({ name, qty, price, sum });
    console.log(users);

    const total = users.reduce((total, user) => {
      total += Number(user.sum);
      return total;
    }, 0);
    // you want this
    setTotal(total);
    // Clear the input fields
    setName("");
    setQty("");
    setPrice("");
    setSum("");
  }

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice)) {
      setPrice(newPrice);
      calculateTotal(newPrice, qty);
    }
  };

  // Event handler for quantity selection
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setQty(newQuantity);
      calculateTotal(price, newQuantity);
    }
  };

  // Calculate the total based on price and quantity
  const calculateTotal = (price, qty) => {
    const newTotal = price * qty;
    setSum(newTotal);
  };

  return (
    <div className="w-full text-center bg-gray-100 h-screen ">
      <Header />
      <br />
      <div className="w-[85%] bg-white shadow-md mx-auto py-6 px-4 rounded-lg">
        <div className="md:py-6">
          <h3 className="py-3 w-full text-3xl text-blue-700 font-semibold text-left ">
            Add Products
          </h3>
          <table className="w-full md:py-4">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    className="bg-gray-100 rounded-md py-1 px-2 focus:outline-gray-400"
                    placeholder="Item Name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="bg-gray-100 rounded-md py-1 px-2 focus:outline-gray-400"
                    placeholder="Enter Price"
                    value={price}
                    onChange={handlePriceChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="bg-gray-100 rounded-md py-1 px-2 focus:outline-gray-400"
                    placeholder="Enter Qty"
                    value={qty}
                    onChange={handleQuantityChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={sum}
                    className="bg-gray-100 rounded-md py-1 px-2 focus:outline-gray-400"
                    placeholder="Enter Total"
                    id="total_cost"
                    name="total_cost"
                    disabled
                  />
                </td>
                <td>
                  <button
                    className="px-10 py-1 rounded-md bg-blue-500 text-white "
                    type="submit"
                    onClick={Calculation}
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <AllProducts users={users} />
        </div>

        <div className="md:px-10 py-3">
          <div className="">
            <h3 className="text-xl font-bold text-red-500">Total</h3>

            <input
              type="text"
              className="py-1 px-2 my-3 bg-gray-300 rounded-md font-semibold"
              placeholder="Enter Total"
              required
              disabled
              value={total}
            />
            <br />
            <Link
              to="/home/review"
              className="text-right px-4 py-1 rounded-md bg-blue-500 text-white"
            >
              Review Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
