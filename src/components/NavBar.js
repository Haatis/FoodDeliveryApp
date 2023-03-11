import Link from "next/link";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function NavBar({ cartItemCount, onCartItemCountChange }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedInLocalStorage = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(isLoggedInLocalStorage === "true");
  }, []);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      const cartItems = JSON.parse(storedCartItems);
      const itemCount = Object.keys(cartItems).reduce((total, item) => {
        return total + cartItems[item].quantity;
      }, 0);
      onCartItemCountChange(itemCount); // call the onCartItemCountChange function to update the cart item count
    } else {
      onCartItemCountChange(0); // call the onCartItemCountChange function to update the cart item count
    }
  }, [onCartItemCountChange]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <nav className="flex justify-center items-center h-16 bg-pink-600 text-white relative shadow-sm">
      <Link href="/">
        <p className="text-3xl">Woltora</p>
      </Link>
      <div className="absolute right-0 pr-4">
        {isLoggedIn ? (
          <>
            <Link className="mr-9" href="/cart">
              <button className="pr-4 relative">
                <FaShoppingCart className="text-2xl" />
                <div className="bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center absolute top-0 right-0 -mt-1 -mr-1">
                  {cartItemCount}
                </div>
              </button>
            </Link>
            <button className="pr-4" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">
            <p className="pr-4">Login</p>
          </Link>
        )}
      </div>
    </nav>
  );
}
