import CityCard from "@/components/CityCard";
import axios from "axios";
import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [cities, setCities] = useState([]);
  const fetchCities = async () => {
    const response = await axios.get("/api/getData");
    setCities(response.data);
  };
  useEffect(() => {
    fetchCities();
  }, []);
  return (
    <>
      <div className="mt-10">
        <h1 className="sm:text-2xl text-xl text-center">
          Löydät meidät näistä sekä monista muista kaupungeista!
        </h1>
        <div className="xl:w-4/5 mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 mb-4 sm:mx-11 ">
            {cities.map((city, index) => (
              <CityCard
                city={city.CityName}
                image={city.CityImage}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
