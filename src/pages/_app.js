import "@/styles/globals.css";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      const cartItems = JSON.parse(storedCartItems);
      const itemCount = Object.keys(cartItems).reduce((total, item) => {
        return total + cartItems[item].quantity;
      }, 0);
      setCartItemCount(itemCount);
    } else {
      setCartItemCount(0);
    }
  }, []);

  const handleCartItemCountChange = (newCount) => {
    setCartItemCount(newCount);
  };

  return (
    <>
      <Head>
        <title>Woltora</title>
        <meta name="description" content="Woltora" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar
        cartItemCount={cartItemCount}
        onCartItemCountChange={handleCartItemCountChange}
      />
      <Component
        {...pageProps}
        onCartItemCountChange={handleCartItemCountChange}
      />
    </>
  );
}
