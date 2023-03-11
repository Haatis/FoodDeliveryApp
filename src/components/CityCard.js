import Image from "next/image";
import Link from "next/link";
export default function CityCard({ city, image }) {
  return (
    <Link className="group relative block bg-black mt-5" href={`/city/${city}`}>
      <Image
        alt="Developer"
        src={`/img/${image}`}
        width={400}
        height={400}
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
      />
      <div className="relative">
        <p className="text-xl font-bold text-white sm:text-2xl absolute bottom-2 left-2">
          {city}
        </p>

        <div className="mt-32 sm:mt-48 lg:mt-64">
          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"></div>
        </div>
      </div>
    </Link>
  );
}
