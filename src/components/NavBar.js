import Link from "next/link";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import CartList from "@/components/CartList";

export default function NavBar({ cartItemCount, onCartItemCountChange }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);

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

      <div className="absolute right-0 pr-4 flex items-center">
        <div
          onMouseEnter={() => setIsCartHovered(true)}
          onMouseLeave={() => setIsCartHovered(false)}
          className="mr-10"
        >
          <button className=" relative ">
            <Link href="/cart">
              <FaShoppingCart className="text-2xl mt-1" />
            </Link>
            <div className="bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center absolute top-0 right-0 -mt-2 -mr-5">
              {cartItemCount}
            </div>
          </button>
          {isCartHovered && cartItemCount > 0 && (
            <div className="bg-white rounded-lg shadow-lg absolute top-full  right-5 -mt-1 z-50">
              <CartList onCartItemCountChange={onCartItemCountChange} />
            </div>
          )}
        </div>

        {isLoggedIn ? (
          <>
            <Link href="/profile">
              <FaUser className="text-2xl mr-10" />
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
