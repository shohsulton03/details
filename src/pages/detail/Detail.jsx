import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { request } from "../../api";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get(`/product/get/${id}`);
        if (response.data) {
          setData(response.data);
        } else {
          navigate("/not-found");
        }
      } catch {
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-700 font-semibold">
        Yuklanmoqda...
      </div>
    );
  }

  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "increment" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 rounded-xl shadow-md overflow-hidden">
        <div className="relative flex items-center justify-center bg-gray-200 p-6">
          <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded">
            NEW
          </span>
          <span className="absolute top-4 right-4 bg-gray-700 text-white text-xs font-bold px-3 py-1 rounded">
            -50%
          </span>
          <img
            src={data?.image || "https://via.placeholder.com/400"}
            alt={data?.name || "Mahsulot rasmi"}
            className="rounded-lg max-h-[400px] object-contain"
          />
        </div>

        {/* Mahsulot Tafsilotlari */}
        <div className="p-6 md:p-8">
          <div className="flex space-x-4 text-center mb-4">
            {"Days Hours Minutes Seconds".split(" ").map((label, index) => (
              <div key={label}>
                <p className="text-xl font-bold">
                  {"02 12 45 05".split(" ")[index]}
                </p>
                <span className="text-sm text-gray-500">{label}</span>
              </div>
            ))}
          </div>

          <h1 className="text-3xl font-extrabold text-gray-800 mb-3">
            {data?.name}
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {data?.description ||
              "Bu mahsulot haqida batafsil ma'lumot hozircha mavjud emas."}
          </p>

          <div className="flex items-center space-x-4 mb-6">
            <span className="text-3xl font-bold text-blue-500">
              ${data?.price}
            </span>
            <span className="text-xl text-gray-400 line-through">
              ${data?.oldPrice || "400.00"}
            </span>
          </div>

          <div className="mb-6">
            <span className="text-gray-800 font-semibold block mb-2">
              Rangni tanlang:
            </span>
            <div className="flex space-x-3">
              {"bg-black bg-gray-300 bg-red-500"
                .split(" ")
                .map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 border rounded-full ${color}`}
                  ></button>
                ))}
            </div>
          </div>

          <div className="flex items-center mb-6">
            <button
              className="w-10 h-10 flex items-center justify-center text-white bg-blue-500 rounded-full hover:bg-blue-600"
              onClick={() => handleQuantityChange("decrement")}
            >
              -
            </button>
            <span className="mx-4 text-gray-800 font-semibold">{quantity}</span>
            <button
              className="w-10 h-10 flex items-center justify-center text-white bg-blue-500 rounded-full hover:bg-blue-600"
              onClick={() => handleQuantityChange("increment")}
            >
              +
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex-1 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition text-lg font-semibold">
              Add to Cart
            </button>
            <button
              className={`w-12 h-12 flex items-center justify-center rounded-lg shadow transition-transform transform hover:scale-105 ${
                data?.isInWishlist
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              title="Sevimlilarga qo‘shish"
            >
              {data?.isInWishlist ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
