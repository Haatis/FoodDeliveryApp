import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function RestaurantPage({ onCartItemCountChange }) {
  const router = useRouter();
  const { restaurant } = router.query;
  const [menuData, setMenuData] = useState(null);
  const [cartItems, setCartItems] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchMenuData = async () => {
    const response = await axios.get(`/api/getMenu?restaurant=${restaurant}`);
    setMenuData(response.data);
  };

  useEffect(() => {
    if (restaurant) {
      fetchMenuData();
    }
  }, [restaurant]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    const isLoggedInLocalStorage = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(isLoggedInLocalStorage === "true");
  }, []);

  const handleAddToCart = (menu) => {
    const newCartItems = {
      ...cartItems,
      [menu.MenuID]: {
        ...menu,
        quantity: cartItems[menu.MenuID]
          ? cartItems[menu.MenuID].quantity + 1
          : 1,
      },
    };
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));

    const itemCount = Object.keys(newCartItems).reduce((total, item) => {
      return total + newCartItems[item].quantity;
    }, 0);
    onCartItemCountChange(itemCount);
  };

  useEffect(() => {
    const cartItemsArray = Object.values(cartItems);
    if (cartItemsArray.length > 0) {
      if (cartItemsArray[0].RestaurantName !== restaurant) {
        alert(
          "Voit tilata vain yhdestä ravintolasta kerrallaan. Ostoskori tyhjennetty."
        );
        setCartItems({});
        localStorage.removeItem("cartItems");
        onCartItemCountChange(0);
      }
    }
  }, [restaurant, cartItems]);

  return (
    <div className="xl:w-3/5 mx-auto text-center">
      <h1 className="text-3xl font-bold">{restaurant}</h1>
      <p className="text-lg mt-2 mb-8">Ruokalista</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {menuData &&
          menuData.map((menu, index) => (
            <div key={index} className="border p-4 rounded-lg relative">
              <h2 className="text-xl font-medium mb-2">{menu.MenuName}</h2>
              <p className="text-gray-500">${menu.MenuPrice}</p>
              {isLoggedIn ? (
                <button
                  className="bg-pink-500 text-white absolute bottom-2 right-2 px-2"
                  onClick={() => handleAddToCart(menu)}
                >
                  +
                </button>
              ) : (
                <p className="text-red-500">Log in to add items to cart</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
