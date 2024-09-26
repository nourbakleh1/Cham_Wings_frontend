import React, { useEffect, useState } from "react";
import { publicRequest } from "../../lib/publicRequest";
import { useDispatch } from "react-redux";
import { usePrevious } from "../../Hooks/usePrevious";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import Headings from "../../Components/Headings/Headings";
import SpeachToText from "../../Components/Voice_Modal/SpeachToText";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import CustomPagination from "../../Components/Pagination/CustomPagination";

const VisaInfo = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const prev = usePrevious(search);
  const [open5, setOpen5] = useState(false);
  const [page, setPage] = useState(1);
  const [visaData, setVisaData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [totalElement, setTotalElement] = useState(0); // Add total element state

  // Fetch visa info based on the search term and page
  useEffect(() => {
    const fetchVisaInfo = async () => {
      setIsLoading(true); // Set loading true when fetching
      try {
        const response = await publicRequest.get(
          `/api/getallvisa?search=${search}&page=${page}`
        );
        if (response.data.success) {
          setVisaData(response.data.data.data);
          setTotalElement(response.data.data.total); // Set total elements
        }
      } catch (error) {
        console.error("Error fetching visa info:", error);
      } finally {
        setIsLoading(false); // Set loading false when done
      }
    };

    fetchVisaInfo();
  }, [search, page]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (window.sessionStorage.getItem("page")) {
      let pageSaved = JSON.parse(window.sessionStorage.getItem("page"));
      setPage(pageSaved);
    }
    return () => {
      if (window.sessionStorage.getItem("page")) {
        window.sessionStorage.removeItem("page");
      }
      setSearch("");
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col py-20">
      <div className="flex-grow overflow-auto">
        <div className="flex items-center justify-around flex-column p-4 flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-black/20">
          {/* Voice Modal */}
          <SpeachToText
            open5={open5}
            setOpen5={setOpen5}
            search={search}
            setSearch={setSearch}
          />

          <div className="text-left">
            <Headings element={"h1"} color="#ae8a3b">
              Travel Conditions
            </Headings>
          </div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative flex justify-center items-center">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-primary_color"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block p-2 ps-10 text-lg shadow-xl border-r-0 shadow-black_color/40 text-white_color border border-gray-300 rounded-l-lg w-[180px] sm:w-[200px] lg:w-80 bg-black/5 focus:ring-blue-500 focus:border-blue-500 placeholder:text-secoundary_color dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for travel conditions"
            />
            <FontAwesomeIcon
              icon={faMicrophone}
              onClick={() => setOpen5(true)}
              className="text-white/90 bg-primary_color/70 w-[20px] h-[44.4px] lg:h-[44px] px-1 shadow-xl rounded-r-lg border-[0.5px] border-l-0 border-gray-300 shadow-black_color/40"
            />
          </div>
        </div>

        {/* Responsive grid for visa info */}
        {isLoading ? (
          <div className="text-center text-xl font-semibold text-blue-500">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2 px-4 pt-4">
            {visaData.map((visa) => (
              <div key={visa.visainfo_id} className="mb-4">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full px-4 py-2 md:py-4 text-lg sm:text-sm md:text-lg font-medium text-left text-black bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                        <span>
                          From: {visa.departure_airport.airport_name} (
                          {visa.departure_airport.airport_code}) &rarr; To:{" "}
                          {visa.arrival_airport.airport_name} (
                          {visa.arrival_airport.airport_code})
                        </span>
                        <ChevronUpIcon
                          className={`${
                            open ? "transform rotate-180" : ""
                          } w-5 h-5 text-blue-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-lg sm:text-sm md:text-lg text-gray-500 bg-blue-100 mt-2 rounded-lg">
                        <p>
                          <strong>From: </strong>
                          {visa.departure_airport.city},{" "}
                          {visa.departure_airport.country}
                        </p>
                        <p>
                          <strong>To: </strong>
                          {visa.arrival_airport.city},{" "}
                          {visa.arrival_airport.country}
                        </p>

                        {visa.visa_and_residence && (
                          <div className="mt-2">
                            <h3 className="font-semibold">
                              Visa and Residence:
                            </h3>
                            <p>{visa.visa_and_residence.type}</p>
                            <p>{visa.visa_and_residence}</p>
                          </div>
                        )}

                        <p className="mt-2 text-sm text-gray-500">
                          Created at:{" "}
                          {new Date(visa.created_at).toLocaleString()}
                        </p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center mt-auto pb-6">
        {search.trim() === "" && (
          <CustomPagination
            isLoading={isLoading}
            page={page}
            setPage={setPage}
            totalElement={totalElement}
            perPage={15}
          />
        )}
      </div>
    </div>
  );
};

export default VisaInfo;
