import React, { useState, useEffect } from "react";

export default function CartPage({ onCartItemCountChange }) {
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
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-8 mb-4">Ostoskori</h1>
      {cartItemsArray.map((item) => (
        <div
          key={item.MenuID}
          className="w-full max-w-lg border rounded-lg p-4 mb-4"
        >
          <h2 className="text-xl font-medium mb-2">{item.MenuName}</h2>
          <p className="text-gray-500">{item.MenuPrice}€</p>
          <p className="mt-2">Määrä: {item.quantity}</p>
          <p className="mt-2">{item.RestaurantName}</p>
          <button
            className="bg-red-500 text-white rounded-md px-2 py-1 mt-2"
            onClick={() => handleDelete(item)}
          >
            Poista
          </button>
        </div>
      ))}
    </div>
  );
}
