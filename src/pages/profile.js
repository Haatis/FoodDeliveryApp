import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Profile() {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    const response = await axios.get("/api/getOrders");
    setOrders(response.data);
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-center text-2xl font-bold mb-4">
        Aikaisemmat tilaukset
      </h1>
      {orders.length ? (
        <div className="flex flex-col justify-center items-center">
          {orders.map((order) => (
            <div
              key={order.OrderID}
              className="bg-white shadow-md rounded-lg overflow-hidden w-2/4 mb-4"
            >
              <div className="px-4 py-2">
                <h1 className="text-lg font-semibold text-gray-700 text-center">
                  {order.RestaurantName}
                </h1>
              </div>
              <div className="px-4 py-2">
                <p className="text-gray-600 text-sm text-center">
                  {new Date(order.OrderDate).toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm text-center">
                  {order.OrderTotal}€
                </p>
                <p className="text-gray-600 text-sm text-center">
                  {order.OrderItems}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Ei aikaisempia tilauksia</p>
      )}
    </div>
  );
}
