"use client"
import { Text, Heading } from "../../components";
import React, { useState, useEffect } from "react";
import { formatTextWithNewlines } from "@/lib/textUtils";

export default function GetInvolvedSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/get-involved/hero');

        if (!response.ok) {
          throw new Error('Failed to fetch hero section data');
        }

        const result = await response.json();
        console.log('Hero data:', result);
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
  let title = data?.heading || "Get involved\nwith the church";
  let subtitle = data?.subheading || "At RCCG Rod of God Parish, we accept everyone.";
  const backgroundImage = data?.backgroundImage || "/images/img_group_227.png";

  // Handle escaped newlines
  title = title.replace(/\\n/g, '\n');
  subtitle = subtitle.replace(/\\n/g, '\n');

  return (
    <>
      {/* get involved section */}
      <div className="flex h-[670px] items-start justify-center bg-cover bg-no-repeat py-[168px] md:h-auto md:py-10 sm:py-8"
           style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="container-xs mb-[148px] flex justify-center md:mb-10 sm:mb-5 md:px-5">
          <div className="flex w-full flex-col items-start gap-5 px-24 lg:px-16 md:px-8 sm:px-4">
            <Heading
              size="headinglg"
              as="h1"
              className="text-[64px] font-semibold leading-[100%] !text-white_color lg:text-[56px] md:text-[48px] sm:text-[40px] xs:text-[32px]"
            >
              {formatTextWithNewlines(title, { noWrapper: true })}
            </Heading>
            <Text
              size="textlg"
              as="div"
              className="text-[24px] font-normal lg:text-[22px] md:text-[20px] sm:text-[18px]"
            >
              {subtitle}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
