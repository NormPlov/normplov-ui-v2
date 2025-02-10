"use client";
import React, { useEffect, useRef, useState } from "react";
import { MapPin, Globe, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { GroupBase, StylesConfig } from "react-select";
import Select from "react-select";
import { useTranslations } from "next-intl";

// Define a specific type for your options
interface OptionType {
  label: string;
  value: string;
}
// Define the major type
type MajorType = {
  uuid: string;
  name: string;
  description: string;
  fee_per_year: number;
  duration_years: number;
  degree: string; // Degree type (e.g., "ASSOCIATE", "BACHELOR", etc.)
  faculty?: string; // Make the faculty field optional
  type: string; // Add other possible values if needed
};

// Type definition for universities
type UniversityType = {
  uuid: string;
  kh_name: string;
  en_name: string;
  location: string;
  province_name: string;
  popular_major: string;
  logo_url: string;
  cover_image: string | null;
  phone: string;
  lowest_price: number;
  highest_price: number;
  latitude: number;
  longitude: number;
  email: string;
  website: string;
  description: string;
  mission: string;
  majors: MajorType[];
  vision: string;
  type: string;
  faculties: {
    uuid: string;
    name: string;
    description: string;
    majors: {
      items: MajorType[];
      metadata: { total_pages: number; page: number };
    };
  }[];
};

// Define the option type for react-select
type SelectOption = {
  value: string;
  label: string;
};

// Button component
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    className={`px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${className}`}
    ref={ref}
    {...props}
  />
));
Button.displayName = "Button";

// Card component
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={`bg-white rounded-xl shadow-sm ${className}`}
    ref={ref}
    {...props}
  />
));
Card.displayName = "Card";

// CardContent component
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div className={`lg:p-6 md:p-4 p-3 ${className}`} ref={ref} {...props} />
));
CardContent.displayName = "CardContent";

// Button component
const Button1 = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={`inline-flex items-center bg-green-50 justify-between rounded-md  px-4 py-2 text-sm font-medium text-gray-700   focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
));
Button1.displayName = "Button1";

export default function CardUniversityDetail({
  kh_name,
  en_name,
  location,
  logo_url,
  cover_image,
  phone,
  lowest_price,
  highest_price,
  email,
  website,
  description,
  mission,
  vision,
  majors,
  latitude,
  longitude,
  popular_major,
  faculties,
  type,
}: UniversityType) {
  const t = useTranslations("University"); // Hook to access translations
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [selectedDegree, setSelectedDegree] = useState<string>("BACHELOR"); // Default to "BACHELOR"
  const [defaultDegree] = useState<string>("BACHELOR"); // Default to BACHELOR initially

  const [filteredMajors, setFilteredMajors] = useState<MajorType[]>(majors);
  const [googleMapEmbedUrl, setGoogleMapEmbedUrl] = useState<string>("");
  const [selectedPage, setSelectedPage] = useState<number>(1); // Start with page 1
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const [isExpanded1, setIsExpanded1] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isExpandedMission, setIsExpandedMission] = useState(false);
  const [, setIsVisionOverflowing] = useState(false);
  const [isMissionOverflowing, setIsMissionOverflowing] = useState(false);

  const visionRef = useRef<HTMLParagraphElement>(null);
  const missionRef = useRef<HTMLParagraphElement>(null);

  // State to hold the available degrees fetched from the faculties/majors
  const [degreeOptions, setDegreeOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const degrees: string[] = [];

    // Collect unique degree types from faculties
    faculties.forEach((faculty) => {
      faculty.majors.items.forEach((major) => {
        if (!degrees.includes(major.degree)) {
          degrees.push(major.degree);
        }
      });
    });

    // Define degree labels in Khmer
    const degreeLabels: Record<string, string> = {
      BACHELOR: t("BACHELOR"),
      ASSOCIATE: t("ASSOCIATE"),
      SHORT_COURSE: t("SHORT_COURSE"),
      MASTER: t("MASTER"),
      PHD: t("PHD"),
    };

    // Map degrees to options with localized labels
    const degreeOptions = degrees.map((degree) => ({
      value: degree,
      label: degreeLabels[degree] || degree, // Use Khmer label if available, else fallback to the degree name
    }));

    setDegreeOptions(degreeOptions); // Set the degree options

    // Set default degree based on priority
    const degreePriority = [
      "BACHELOR",
      "ASSOCIATE",
      "SHORT_COURSE",
      "MASTER",
      "PHD",
    ];
    const defaultDegree =
      degreePriority.find((priority) => degrees.includes(priority)) || "";

    setSelectedDegree(defaultDegree); // Set default selected degree
  }, [faculties]);

  useEffect(() => {
    // Generate the Google Maps Embed URL using latitude and longitude
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${latitude},${longitude}`;
    setGoogleMapEmbedUrl(mapUrl); // Set the map URL dynamically based on coordinates
  }, [latitude, longitude]);

  // UseEffect to filter majors based on selected degree and faculty
  // Filter majors based on selected degree and faculty, with pagination
  useEffect(() => {
    let majorsToDisplay = faculties
      .flatMap((faculty) => faculty.majors.items)
      .filter((major) => major.degree === selectedDegree);

    if (selectedFaculty) {
      majorsToDisplay = majorsToDisplay.filter((major) =>
        faculties.some(
          (faculty) =>
            faculty.name === selectedFaculty &&
            faculty.majors.items.includes(major)
        )
      );
    }

    // Calculate the total number of pages based on 10 items per page
    setTotalPages(Math.ceil(majorsToDisplay.length / 10)); // 10 items per page

    // Paginate the results
    const paginatedMajors = majorsToDisplay.slice(
      (selectedPage - 1) * 10,
      selectedPage * 10
    );

    setFilteredMajors(paginatedMajors);
  }, [selectedDegree, selectedFaculty, faculties, selectedPage]);

  useEffect(() => {
    // Check if the element is overflowing
    if (textRef.current) {
      setIsOverflowing(
        textRef.current.scrollHeight > textRef.current.clientHeight
      );
    }
  }, [vision]);
  useEffect(() => {
    // Check if the vision text is overflowing
    if (visionRef.current) {
      setIsVisionOverflowing(
        visionRef.current.scrollHeight > visionRef.current.clientHeight
      );
    }

    // Check if the mission text is overflowing
    if (missionRef.current) {
      setIsMissionOverflowing(
        missionRef.current.scrollHeight > missionRef.current.clientHeight
      );
    }
  }, [vision, mission]);

  // Handle Degree Selection Change
  const handleDegreeChange = (selectedOption: SelectOption | null) => {
    setSelectedDegree(selectedOption?.value || ""); // Set to an empty string if no option is selected
  };

  // Handle Faculty Selection Change
  const handleFacultyChange = (selectedOption: SelectOption | null) => {
    setSelectedFaculty(selectedOption?.value || null); // Set to null if no option is selected
  };

  const handlePageChange = (pageNumber: number) => {
    setSelectedPage(pageNumber);
  };

  const [ImgSrc, setImgSrc] = useState<string>(
    logo_url
      ? `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${logo_url}`
      : "/assets/placeholder.png"
  );

  const customStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
    control: (provided) => ({
      ...provided,
      borderRadius: "30px",
      padding: "4px",
      borderColor: "#D1D5DB",
      boxShadow: "none",
      height: "45px",
      fontSize: "17px",
      color: "#034B72",
      paddingLeft: "10px",
      "@media (max-width: 640px)": {
        height: "44px",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "8px",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "#034B72",
      backgroundColor: state.isSelected
        ? "#DCFCE7"
        : state.isFocused
        ? "#DCFCE7"
        : "white",
      borderRadius: "30px",

      cursor: "pointer",
    }),
  };

  return (
    <div className="min-h-screen bg-bglight ">
      {/* Header */}
      <header className="relative">
        <div className="lg:w-full lg:h-[300px] md:w-full md:h-[200px] w-full h-[130px] overflow-hidden">
          <Image
            src={
              cover_image
                ? `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${cover_image}`
                : "/assets/default-image.png" // Path to your default image
            }
            alt={kh_name || "Default Image"}
            width={1000}
            height={1000}
            unoptimized // Optional, depending on your optimization needs
            className="w-full h-full object-cover"
          />
        </div>
        {/* screen laptop and ipad */}
        <div className="hidden max-w-[90%] md:block lg:block  container mx-auto px-4  relative lg:-mt-12 md:-mt-12 -mt-6">
          <div className="bg-white  bg-opacity-40 lg:w-auto lg:h-[290px] md:w-auto md:h-auto w-auto h-[200px] backdrop-blur-lg border rounded-xl lg:p-6 md:p-6 p-3 shadow-sm flex  flex-row md:flex-row items-center lg:gap-6 md:gap-6 gap-2">
            <div className="  lg:w-60 lg:h-60 rounded-full">
              <Image
                src={ImgSrc}
                alt={kh_name}
                width={1000}
                height={1000}
                unoptimized // This disables Next.js image optimization (optional if needed)
                className=" object-contain  lg:w-60 lg:h-60 md:w-32 md:h-32 w-10 h-10  "
                onError={() => setImgSrc("/assets/placeholder.png")}
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="lg:text-5xl md:text-2xl text-lg font-bold text-textprimary mb-3">
                {kh_name ? kh_name : "unknown"}
              </h1>
              <p className="text-gray-600 lg:text-3xl md:text-xl text-sm mb-2">
                {en_name}
              </p>
              <p className="text-textprimary lg:text-2xl md:text-xl text-sm mb-4">
                {location}
              </p>
              <div className="flex  space-x-4">
                <div className="lg:text-2xl space-x-2 text-textprimary md:text-xl text-sm flex">
                  <div>{t("type")} :</div>
                  <div className="bg-primary bg-opacity-10 text-primary lg:text-lg md:text-lg text-sm py-1 px-3 rounded-full">
                    {type === "PRIVATE"
                      ? "Private"
                      : type === "PUBLIC"
                      ? "Public"
                      : type}
                    {type === "TVET" ||
                    (type === "PRIVATE" &&
                      en_name ===
                        "Institute of Science and Technology Advanced Development")
                      ? " Institution"
                      : " University"}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <div className="lg:text-2xl space-x-2 text-textprimary md:text-xl text-sm flex">
                    {t("Popularskills")} :
                  </div>
                  {popular_major && (
                    <div className="bg-secondary bg-opacity-10 text-secondary lg:text-lg md:text-lg text-sm  py-1 px-3 rounded-full ">
                      {popular_major}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* screen phone */}
        <div className="block  md:hidden lg:hidden  container mx-auto px-4  relative lg:-mt-12 md:-mt-12 -mt-6">
          <div className="bg-white    lg:bg-opacity-30 md:bg-opacity-30 bg-opacity-90 lg:w-auto lg:h-[290px] md:w-auto md:h-[230px] w-auto h-auto backdrop-blur-lg border rounded-xl lg:p-6 md:p-6 p-3 shadow-sm lg:flex md:flex  flex-row md:flex-row items-start lg:gap-6 md:gap-6 gap-2">
            <div className="flex space-x-3">
              <div className="flex justify-start items-start">
                <Image
                  src={`${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${logo_url}`}
                  alt="ISTAD Logo"
                  width={200}
                  height={200}
                  unoptimized // This disables Next.js image optimization (optional if needed)
                  className="lg:w-60 lg:h-60 md:w-32 md:h-32 w-16 h-16 object-contain rounded-full lg:border-4 md:border-3  "
                />
              </div>
              <div className="">
                <div className="text-start md:text-left">
                  <h1 className="lg:text-5xl  md:text-2xl  text-lg font-bold text-textprimary mb-0">
                    {kh_name ? kh_name : "unknown"}
                  </h1>
                  <h1 className="lg:text-5xl md:text-2xl  text-md font-bold text-textprimary mb-3">
                    {en_name}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex justify-start space-x-2  items-center">
              <div className="bg-primary bg-opacity-10 text-primary lg:text-lg md:text-lg text-sm py-1 px-4 rounded-full">
                {type === "PRIVATE"
                  ? "Private"
                  : type === "PUBLIC"
                  ? "Public"
                  : type}
                {type === "TVET" ||
                (type === "PRIVATE" &&
                  en_name ===
                    "Institute of Science and Technology Advanced Development")
                  ? " Institution"
                  : " University"}
              </div>
              <div className="bg-secondary lg:text-lg md:text-lg text-sm text-primary lg:py-2 lg:px-6 md:py-2 md:px-6 py-1 px-3 rounded-full bg-opacity-10">
                {popular_major}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container lg:max-w-[90%] md:max-w-[90%]  mx-auto px-4  lg:py-8 md:py-4 py-2.5 grid grid-cols-1 md:grid-cols-3 lg:gap-8 md:gap-4 gap-2.5">
        {/* Sidebar */}
        <div className="md:col-span-1 lg:space-y-3 md:space-y-2 space-y-2.5">
          <Card>
            <CardContent>
              <h2 className="font-bold text-textprimary text-xl mb-4">
                {t("School location")}
              </h2>
              <div className="aspect-[4/3] rounded-xl bg-gray-100 mb-4">
                {/* Map placeholder */}
                <div className="w-full h-full  flex items-center justify-center text-gray-400">
                  {googleMapEmbedUrl && (
                    <iframe
                      src={googleMapEmbedUrl}
                      width="600"
                      height="450"
                      loading="lazy"
                      allowFullScreen
                      className="w-full h-full "
                    ></iframe>
                  )}
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="flex justify-start items-end  ">
                    <MapPin className=" text-gray-400 lg:text-[16px] md:text-[10px] text-[16px]" />
                  </div>
                  <div className=" lg:text-[16px] md:text-sm text-[16px] text-textprimary">
                    {location ? location : "unknown"}
                  </div>
                </div>
                <div className="flex items-center gap-2 ">
                  <Globe className=" text-gray-400 lg:text-[16px] md:text-[10px] text-[16px]" />
                  <a
                    href={`${website}`}
                    className="lg:text-[16px] md:text-sm text-[16px] text-primary "
                  >
                    {website || "Unvailable"}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className=" text-gray-400  lg:text-[16px] md:text-[10px] text-[16px]" />
                  <a
                    href={`tel:${phone}`}
                    className="lg:text-[16px] md:text-sm text-[16px] text-textprimary"
                    target="_blank"
                  >
                    {phone || "Unvailable"}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className=" text-gray-400 lg:text-[16px] md:text-[10px] text-[1px]" />
                  <a
                    href={`mailto:${email}`}
                    className="lg:text-[16px] md:text-sm text-[16px] text-textprimary"
                    target="_blank"
                  >
                    {email || "Unvailable"}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          {mission && (
            <Card>
              <CardContent>
                <h2 className="font-bold text-xl text-primary mb-4">
                  {t("mission")}
                </h2>
                <div className="space-y-2 text-md text-gray-600">
                  <p
                    ref={missionRef}
                    className={`${
                      isExpandedMission ? "" : "line-clamp-3"
                    } overflow-hidden text-ellipsis`}
                  >
                    {mission}
                  </p>
                  {isMissionOverflowing && (
                    <button
                      onClick={() => setIsExpandedMission(!isExpandedMission)}
                      className="text-secondary opacity-70 hover:underline"
                    >
                      {isExpandedMission ? t("Show Less") : t("see more")}
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          {vision && (
            <Card>
              <CardContent>
                <h2 className="font-bold text-xl text-primary mb-4">
                  {t("vission")}
                </h2>
                <div className="space-y-2 text-md text-gray-600">
                  <p
                    ref={textRef}
                    className={`${
                      isExpanded1 ? "" : "line-clamp-3"
                    } overflow-hidden text-ellipsis`}
                  >
                    {vision}
                  </p>
                  {isOverflowing && ( // Only show the button if the text is overflowing
                    <button
                      onClick={() => setIsExpanded1(!isExpanded1)}
                      className="text-secondary opacity-70 font-medium hover:underline"
                    >
                      {isExpanded1 ? t("Show Less") : t("see more")}
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Card>
            <CardContent>
              <h2 className="font-bold text-xl text-textprimary mb-4">
                {t("abbout-scholl")}
              </h2>
              <div className="space-y-2 lg:text-lg md:text-lg text-md text-gray-600">
                <p
                  className={`${
                    isExpanded ? "" : "line-clamp-4"
                  } overflow-hidden text-ellipsis`}
                >
                  {description}
                </p>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-primary  hover:underline"
                >
                  {isExpanded ? t("Show Less") : t("see more")}
                </button>
              </div>
            </CardContent>
          </Card>
          <div className="bg-white lg:p-6 md:p-4 p-3  rounded-xl shadow-sm mt-4 mb-4 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="lg:text-2xl md:text-xl text-xl font-bold text-textprimary">
                {t("Academic skills")}
              </h2>
              <span className="rounded-[8px] text-primary bg-primary bg-opacity-5 text-opacity-80 text-md md:text-lg lg:text-lg max-w-fit px-1 lg:px-2 font-medium">
                {t("price")} {lowest_price}$-{highest_price}$
              </span>
            </div>

            <div className="relative ">
              {/* Degree Filter */}
              <div className="grid w-auto auto-rows-fr grid-cols-1 lg:gap-3 md:gap-2 gap-1 lg:grid-cols-2 md:grid-cols-1 lg:space-x-2">
                <div>
                  <div className="space-y-2">
                    <Select
                      options={degreeOptions}
                      value={degreeOptions.find(
                        (option) => option.value === selectedDegree
                      )}
                      onChange={(selectedOption) => {
                        if (selectedOption) {
                          handleDegreeChange(selectedOption);
                        } else {
                          // Reset to default degree when cleared
                          const degreePriority = [
                            "BACHELOR",
                            "ASSOCIATE",
                            "SHORT_COURSE",
                            "MASTER",
                            "PHD",
                          ];
                          const defaultDegree =
                            degreePriority.find((priority) =>
                              degreeOptions.some(
                                (option) => option.value === priority
                              )
                            ) || "";
                          setSelectedDegree(defaultDegree); // Reset to default
                        }
                      }}
                      placeholder={t("SelectDegree")}
                      styles={customStyles}
                      isSearchable={false}
                      isClearable={selectedDegree !== defaultDegree} // Hide X button when default is selected
                      className="rounded-full text-sm md:text-md lg:text-base mb-4"
                    />
                  </div>
                </div>
                {/* Faculty Filter */}
                <div>
                  <div className="space-y-2">
                    <Select
                      options={faculties.map((faculty) => ({
                        value: faculty.name,
                        label: faculty.name,
                      }))}
                      value={
                        selectedFaculty
                          ? { value: selectedFaculty, label: selectedFaculty }
                          : null
                      }
                      onChange={handleFacultyChange}
                      placeholder={t("select-faculty")}
                      styles={customStyles}
                      isSearchable={false}
                      isClearable
                      className="rounded-full text-sm md:text-md lg:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Main Content - Courses */}
          <div className="md:col-span-2">
            <div className="grid w-auto auto-rows-fr mb-8 grid-cols-1 lg:gap-3 md:gap-3 gap-3 lg:grid-cols-2 md:grid-cols-1">
              {filteredMajors.length > 0
                ? filteredMajors.map((major) => (
                    <div
                      key={major.uuid}
                      className="bg-white rounded-xl shadow-sm p-4 space-y-2"
                    >
                      <h3 className="text-lg font-semibold text-textprimary">
                        {major.name}
                      </h3>
                      <div className="flex justify-between">
                        <p className="text-lg text-gray-600">
                          {t("Duration")} :{" "}
                          <span className=" text-secondary">
                            {major.duration_years}{" "}
                          </span>
                          <span>
                            {major.degree === "SHORT_COURSE"
                              ? t("hours")
                              : t("years")}
                          </span>
                        </p>
                        <p className="text-md text-gray-600">
                          <span className=" text-primary">
                            ${major.fee_per_year}
                          </span>
                          {major.degree === "SHORT_COURSE"
                            ? t("COURSE")
                            : t("Inyears")}
                        </p>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
          {filteredMajors.length == 0 ? (
            <div className=" items-center h-auto  justify-center ">
              <div className=" flex  justify-center items-center w-full lg:h-[400px] md:[300px]  ">
                <div className="  lg:w-[500px] lg:h-[300px] md:w-[300px] w-[300px]  p-4">
                  <Image
                    src="https://cdn.prod.website-files.com/5beab1239ac88487c3a6608f/6514e57fce3e02e011dc4a00_Search%20Empty.avif"
                    width={1000}
                    height={1000}
                    alt=""
                    className="lg:w-full lg:h-full opacity-80 "
                  ></Image>
                </div>
              </div>
              <div>
                <p className="text-center text-xl  lg:-mt-8 mb-8 text-gray-500">
                  {t("notfound")}
                </p>
              </div>
            </div>
          ) : null}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 mb-4 md:mb-0 lg:mb-0 ">
              <button
                onClick={() => handlePageChange(selectedPage - 1)}
                disabled={selectedPage <= 1}
                className="px-4 py-2 bg-primary text-white  disabled:bg-gray-200 rounded-xl"
              >
                {t("Previous")}
              </button>
              <div className="mx-4 w-[40px] h-[40px]  bg-slate-200 rounded-full flex justify-center items-center text-textprimary">
                {selectedPage}
              </div>
              <button
                onClick={() => handlePageChange(selectedPage + 1)}
                disabled={selectedPage >= totalPages}
                className="px-4 py-2 bg-primary text-white  disabled:bg-gray-300 rounded-xl"
              >
                {t("Next")}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
