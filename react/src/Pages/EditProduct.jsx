import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [form, setForm] = useState({
    title: product?.title || "",
    price: product?.price || "",
    description: product?.description || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://fakestoreapi.com/products/${id}`, form);
      toast.success("Product updated successfully!");
      setTimeout(() => navigate("/table"), 1500);
    } catch {
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <ToastContainer position="top-right" autoClose={2000} />
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col">
          Product Name:
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </label>

        <label className="flex flex-col">
          Price:
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </label>

        <label className="flex flex-col">
          Description:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded"
            rows={4}
            required
          />
        </label>

        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate("/table")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;