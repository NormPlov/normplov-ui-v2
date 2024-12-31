import Image from "next/image";
import { MapPin } from "lucide-react";

type props = {
  kh_name: string;
  en_name: string;
  location: string;
  popular_major: string;
  logo_url: string;
  onClick?: () => void;
};

export default function CardUniversity({
  kh_name,
  en_name,
  location,
  popular_major,
  logo_url,
  onClick,
}: props) {
  return (
    <div>
      <div
        className={`flex lg:p-6 md:p-6 p-2 lg:h-48 md:h-48 h-32 w-full flex-row items-center bg-white border border-gray-100 shadow-sm rounded-2xl  md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 `}
        onClick={onClick}
      >
        <Image
          className="object-contain lg:w-40 lg:h-40 md:w-40 md:h-40 w-24 h-24 mr-2 rounded-t-lg md:rounded-none md:rounded-s-lg"
          src={
            logo_url
              ? `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${logo_url}` // If logo_url exists, use the actual image
              : '/assets/itc.png' // Placeholder image when logo_url is not available
          }
          alt={kh_name}
          width={200}
          height={200}
          unoptimized // Disables Next.js image optimization
        />

        <div className="flex  w-[73%] flex-col justify-between  lg:p-2 md:p-2 p-0 leading-normal truncate">
          <h1 className="lg:mb-2 md:mbb-2 mb-1 text-lg md:text-2xl lg:text-2xl  font-bold tracking-tight text-textprimary dark:text-white truncate">
            {kh_name}
          </h1>
          <h2 className="lg:mb-2 md:mbb-2 mb-1 text-sm md:text-xl lg:text-xl  text-gray-600 truncate">
            {en_name}
          </h2>
          <div className="flex  space-x-2">
            <MapPin className="lg:w-5 lg:h-5 md:w-5 md:h-5 w-4 h-4 text-emerald-500 lg:mt-1 md:mt-1 -mt-0" />
            <p className="lg:mb-2 w-[95%] md:mbb-2 mb-1 text-sm md:text-lg lg:text-lg font-normal text-gray-600 dark:text-gray-400 truncate">
              {location}
            </p>
          </div>
          <div className="lg:mb-2 md:mbb-2 mb-2 text-sm md:text-lg block md:hidden lg:hidden  lg:text-lg text-textprimary">
            ជំនាញពេញនិយម ៖
            <span className="text-sm md:text-lg lg:text-lg ml-2 text-secondary bg-secondary bg-opacity-10 text-opacity-80 max-w-fit px-1 lg:px-2 rounded-xl">
              {popular_major}
            </span>
          </div>
          <div className="flex justify-between items-center ">
            <div className="text-sm md:text-lg hidden md:flex lg:flex lg:text-lg text-textprimary">
              ជំនាញពេញនិយម ៖
              <span className="text-sm md:text-lg lg:text-lg ml-2 text-secondary bg-secondary bg-opacity-10 text-opacity-80 max-w-fit px-1 lg:px-2 rounded-xl">
                {popular_major}
              </span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
