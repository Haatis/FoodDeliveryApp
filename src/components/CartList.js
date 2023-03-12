import Link from "next/link";
import React, { useState, useEffect } from "react";
export default function CartList({ onCartItemCountChange }) {
  const [cartItemsArray, setCartItemsArray] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      const cartItems = JSON.parse(storedCartItems);
      const array = Object.values(cartItems);
      setCartItemsArray(array);
    }
  }, []);

  const handleDelete = (item) => {
    const newCartItems = cartItemsArray.filter(
      (cartItem) => cartItem.MenuID !== item.MenuID
    );
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    setCartItemsArray(newCartItems);
    const itemCount = newCartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    onCartItemCountChange(itemCount);
  };

  return (
    <div className="flex flex-col items-center p-4">
      {cartItemsArray.map((item) => (
        <div key={item.MenuID} className="w-full border rounded-lg p-2 mb-2">
          <h2 className="text-lg font-medium mb-1 text-gray-500">
            {item.MenuName}
          </h2>
          <p className="text-gray-500">{item.MenuPrice}€</p>
          <p className="mt-1 text-gray-500">Määrä: {item.quantity}</p>
          <p className="mt-1 text-gray-500">{item.RestaurantName}</p>
          <button
            className="bg-red-500 text-white rounded-md px-2 py-1 mt-2"
            onClick={() => handleDelete(item)}
          >
            Poista
          </button>
        </div>
      ))}
      <Link href="/cart">
        <button className="bg-green-500 text-white rounded-md px-2 py-1 mt-2">
          Ostoskori
        </button>
      </Link>
    </div>
  );
}
