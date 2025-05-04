import { Text, Heading } from "../../components";
import React, { useState, useEffect } from "react";
import { formatTextWithNewlines } from "@/lib/textUtils";

export default function AboutUsSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/about-us/hero');
        
        if (!response.ok) {
          throw new Error('Failed to fetch hero section data');
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching hero section data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // The API returns data based on mapDBToHeroSection structure
  // { heading, subheading, backgroundImage }
  let title = data?.heading || "There's a home for\neveryone in christ.";
  let subtitle = data?.subheading || "At RCCG Rod of God Parish, we accept everyone.";
  const backgroundImage = data?.backgroundImage || "/images/aboutushero.png";
  
  // Add console logging to debug the data
  console.log('Hero Section Data:', data);
  
  // Handle escaped newlines
  title = title.replace(/\\n/g, '\n');
  subtitle = subtitle.replace(/\\n/g, '\n');

  return (
    <>
      {/* about us section */}
      <div className="flex h-[670px] items-start justify-center bg-cover bg-no-repeat py-[168px] md:h-auto md:py-16 sm:py-12 overflow-hidden"
           style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="container-xs mb-[148px] flex justify-center md:mb-16 sm:mb-10 md:px-5">
          <div className="flex w-full flex-col items-start gap-5 lg:px-24 md:px-12 sm:px-5">
            <Heading
              size="headinglg"
              as="h1"
              className="text-[64px] font-semibold leading-[100%] !text-white_color lg:text-[56px] md:text-[48px] sm:text-[36px] xs:text-[30px]"
            >
              {formatTextWithNewlines(title)}
            </Heading>
            <Text
              size="textlg"
              as="p"
              className="text-[24px] font-normal lg:text-[22px] md:text-[20px] sm:text-[18px]"
            >
              {formatTextWithNewlines(subtitle)}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
