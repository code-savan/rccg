import { Text } from "../../components";
import React, { useState, useEffect } from "react";
import { formatDisplayText } from "@/lib/homeFormData";

export default function AboutUsSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/home/about');
        
        if (!response.ok) {
          throw new Error('Failed to fetch about section data');
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching about section data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <div className="mt-[50px] flex h-[594px] items-end justify-center self-stretch bg-gray-100 py-24 md:h-auto md:py-5">
        <div className="container-xs mt-[68px] flex justify-center px-14 md:px-5">
          <div className="animate-pulse flex w-[60%] flex-col items-center gap-2 rounded-[20px] bg-gray-200 px-[52px] py-[58px] md:w-full md:p-5">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-4/5 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mt-[50px] flex h-[300px] items-center justify-center self-stretch">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-semibold">Error loading about section</h2>
          <p>Please try again later</p>
        </div>
      </div>
    );
  }

  // If no data is available, show nothing
  if (!data) return null;

  return (
    <>
      {/* about us section */}
      <div className="mt-[50px] flex h-[594px] items-end justify-center self-stretch bg-[url(/images/img_group_6.png)] bg-cover bg-no-repeat py-24 md:h-auto md:py-5">
        <div className="container-xs mt-[68px] flex justify-center px-14 md:px-5">
          <div className="flex w-[60%] flex-col items-center gap-2 rounded-[20px] bg-gray-900_02 px-[52px] py-[58px] md:w-full md:p-5">
            <Text
              size="textlg"
              as="p"
              className="!font-poppins text-[24px] font-medium md:text-[22px]"
            >
              {data.title}
            </Text>
            <div 
              className="mb-[18px] self-stretch text-center font-poppins text-[16px] sm:text-[13px] font-normal leading-[160%]"
              dangerouslySetInnerHTML={{ __html: formatDisplayText(data.content) }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
