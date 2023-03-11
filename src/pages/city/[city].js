import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
//import image next
import Image from "next/image";
import RestaurantCard from "@/components/RestaurantCard";
export default function CityPage() {
  const router = useRouter();
  const { city } = router.query;
  const [RestaurantData, setRestaurantData] = useState(null);

  const fetchRestaurantData = async () => {
    const response = await axios.get(`/api/getRestaurants?city=${city}`);
    setRestaurantData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    if (city) {
      fetchRestaurantData();
    }
  }, [city]);

  return (
    <div className="xl:w-4/5 mx-auto text-center">
      <h1 className="text-3xl font-bold">{city}</h1>
      <p className="text-lg mt-2 mb-2">Ravintolat</p>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 lg:gap-4 mb-4 sm:mx-11 ">
        {RestaurantData &&
          RestaurantData.map((restaurant, index) => (
            <RestaurantCard
              restaurant={restaurant.RestaurantName}
              image={restaurant.RestaurantImage}
              key={index}
            />
          ))}
      </div>
    </div>
  );
}
