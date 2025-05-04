import Link from "next/link";
import { Button, Text, Heading } from "../../components";
import SundayServiceInfo from "../../components/SundayServiceInfo";
import React, { useState, useEffect } from "react";

export default function ServiceTimesSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/home/service-times');

        if (!response.ok) {
          throw new Error('Failed to fetch service times data');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching service times data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Original UI is preserved while data is loading
  if (loading || error || !data) {
    return (
      <div className="mt-[290px] sm:mt-[90px] flex flex-col items-center self-stretch">
        <div className="container-xs flex flex-col items-center gap-[62px] px-[26px] md:px-5 sm:gap-[31px]">
          <div className="mx-[218px] flex flex-col items-center gap-[22px] self-stretch md:mx-0">
            <Heading
              as="h2"
              className="text-[40px] font-semibold md:text-[38px] sm:text-[36px]"
            >
              Our Service times
            </Heading>
            <Text
              as="p"
              className="self-stretch text-center !font-poppins text-[16px] font-light leading-[120%] !text-charcoal"
            >
              Join us at RCCG Rod of God Parish for uplifting worship and powerful teachings. Our services are a time of fellowship, prayer, and spiritual growth.
            </Text>
          </div>
          <div className="flex gap-6 self-stretch md:flex-col">
            {[1, 2, 3].map((_, index) => (
              <SundayServiceInfo
                key={index}
                serviceTitle="Service"
                serviceDescription="Loading service information..."
                parishHouseText="Parish House Indianapolis."
                serviceDayText="Loading..."
                serviceDateText="Loading..."
              />
            ))}
          </div>
          <Link href="/service-times" className="w-fit">
            <Button
              color="gray_400"
              variant="outline"
              shape="round"
              className="min-w-[196px] rounded-[12px] border border-solid border-gray-400 px-[33px] sm:px-5 hover:bg-[#4D88FF] text-white hover:text-white_color hover:border-[#4D88FF] transition-colors"
            >
              See more
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* service times section */}
      <div className="mt-[290px] sm:mt-[90px] flex flex-col items-center self-stretch">
        <div className="container-xs flex flex-col items-center gap-[62px] px-[26px] md:px-5 sm:gap-[31px]">
          <div className="mx-[218px] flex flex-col items-center gap-[22px] self-stretch md:mx-0">
            <Heading
              as="h2"
              className="text-[40px] font-semibold md:text-[38px] sm:text-[36px]"
            >
              {data.heading}
            </Heading>
            <Text
              as="p"
              className="self-stretch text-center !font-poppins text-[16px] font-light leading-[120%] !text-charcoal"
            >
              {data.description}
            </Text>
          </div>
          <div className="flex gap-6 self-stretch md:flex-col">
            {data.services.map((service, index) => (
              <SundayServiceInfo
                key={index}
                serviceTitle={service.name}
                serviceDescription={service.description}
                parishHouseText={service.location}
                serviceDayText={service.schedule}
                serviceDateText={service.time}
              />
            ))}
          </div>
          <Link href="/service-times" className="w-fit">
            <Button
              color="gray_400"
              variant="outline"
              shape="round"
              className="min-w-[196px] rounded-[12px] border border-solid border-gray-400 px-[33px] sm:px-5 hover:bg-[#4D88FF] text-[#000] hover:text-white_color hover:border-[#4D88FF] transition-colors"
            >
              {data.seeMoreText || "See more"}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
