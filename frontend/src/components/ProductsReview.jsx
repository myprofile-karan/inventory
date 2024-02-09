import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "./Header";
import { Link } from "react-router-dom";
import AllProducts from "./AllProducts";

function ProductsReview() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data when the component mounts
    axios
      .get("http://localhost:3000/api/products")
      .then((response) => {
        // Assuming your API response has an array of products
        setProducts(response?.data?.productsData);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  const deleteProduct = (id) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDeletion) {
      axios
        .delete(`http://localhost:3000/api/products/delete/${id}`)
        .then((response) => {
          console.log(response.data);
          toast.success("Product deleted", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  };

  return (
    <div className="w-full text-center bg-gray-100 h-screen ">
      <Header />
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Product Review Table
        </h2>
        <table className="min-w-full my-4 bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) &&
              products.map((product) => (
                <tr key={product._id} className="text-center">
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.price}</td>
                  <td className="py-2 px-4 border-b">{product.qty}</td>
                  <td className="py-2 px-4 border-b">{product.sum}</td>
                  <td>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-red-500 px-3 py-1 rounded-md text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Link
          to="/home"
          className="bg-blue-500 px-6 py-1 text-white rounded-md"
        >
          Back
        </Link>
      </div>
    </div>
  );
}

export default ProductsReview;
