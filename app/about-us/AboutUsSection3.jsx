import { Img, Text, Heading } from "../../components";
import React, { useState, useEffect } from "react";
import { formatTextWithNewlines } from "@/lib/textUtils";

export default function AboutUsSection3() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/about-us/nextgen-ministry');
        
        if (!response.ok) {
          throw new Error('Failed to fetch Next Gen Ministry data');
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching Next Gen Ministry data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // The API returns data based on mapDBToNextGenMinistrySection structure
  // { title, description, image }
  let title = data?.title || "THE NEXT GEN MINISTRY";
  let description = data?.description || "At RCCG Rod of God Parish, our Youth Church is a vibrant community where young people grow in faith, purpose, and fellowship. Join us and be part of a movement for God!";
  const image = data?.image || "H13.jpeg";
  
  // Add console logging to debug the data
  console.log('NextGen Ministry Data:', data);
  
  // Handle escaped newlines
  title = title.replace(/\\n/g, '\n');
  description = description.replace(/\\n/g, '\n');

  return (
    <>
      {/* about us section */}
      <div className="mt-[100px] flex flex-col items-center gap-[182px] md:mt-32 sm:mt-24 md:gap-[136px] sm:gap-[91px] overflow-hidden">
        <div className="container-xs flex flex-col items-center px-14 md:px-8 sm:px-5">
          <div className="flex w-[66%] flex-col items-center gap-[22px] md:w-full">
            <Heading
              as="h2"
              className="text-[40px] font-semibold text-center lg:text-[36px] md:text-[32px] sm:text-[28px]"
            >
              {formatTextWithNewlines(title, { noWrapper: true })}
            </Heading>
            <Text
              as="p"
              className="self-stretch text-center !font-poppins text-[16px] font-light leading-[130%] !text-charcoal md:text-[15px] sm:text-[14px]"
            >
              {formatTextWithNewlines(description, { noWrapper: true })}
            </Text>
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <Img
            src={image.startsWith('/') ? image : `/images/${image}`}
            width={1440}
            height={1052}
            alt="NextGen Ministry"
            className="h-[1052px] w-full object-cover md:h-auto"
          />
        </div>
      </div>
    </>
  );
}
