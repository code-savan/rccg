"use client";

import { Img, Text, Heading } from "../../components";
import React, { useState, useEffect } from "react";
import { formatTextWithNewlines } from "@/lib/textUtils";

// Default content for server-side rendering
const defaultContent = {
  title: "Services & Events",
  subtitle: "Welcome to our vibrant community of faith! At RCCG Rod of God Parish, we offer various services and events designed to help you grow spiritually, connect with others, and experience God's presence in meaningful ways.",
  image: "/images/img_rectangle_18556.png"
};

export default function WelcomeSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch data from the API
  useEffect(() => {
    // Only fetch data on the client side
    if (!isClient) return;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        // Use a try-catch block to handle the case where the API doesn't exist yet
        try {
          const response = await fetch('/api/services-events/welcome');
          
          if (!response.ok) {
            throw new Error('Failed to fetch welcome data');
          }
          
          const result = await response.json();
          setData(result);
        } catch (fetchError) {
          console.log('API not available yet, using default data');
          // Just use default data if API doesn't exist yet
        }
      } catch (err) {
        console.error('Error fetching welcome data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isClient]);

  // The API returns { heading, subheading, backgroundImage } structure based on mapDBToWelcomeSection
  let title = data?.heading || "Welcome to the\nRod of God Parish\nService Itenarary.";
  let subtitle = data?.subheading || "At RCCG Rod of God Parish, we accept everyone.";
  const image = data?.backgroundImage || "img_pexels_jibarofoto_2014773.png";
  
  // Handle escaped newlines
  title = title.replace(/\\n/g, '\n');
  subtitle = subtitle.replace(/\\n/g, '\n');

  return (
    <>
      {/* welcome section */}
      <div className="flex items-center bg-gray-900_02 px-14 py-16 md:flex-col md:px-8 md:py-12 sm:px-5 sm:py-10">
        <div className="mb-[132px] flex flex-1 flex-col items-start gap-5 self-end md:mb-10 md:self-stretch">
          <Heading
            size="headinglg"
            as="h1"
            className="text-[64px] font-semibold leading-[100%] !text-white_color lg:text-[56px] md:text-[48px] sm:text-[40px] xs:text-[32px]"
          >
            {formatTextWithNewlines(title, { noWrapper: true })}
          </Heading>
          <Text
            size="textlg"
            as="p"
            className="text-[24px] font-normal lg:text-[22px] md:text-[20px] sm:text-[18px]"
          >
            {formatTextWithNewlines(subtitle, { noWrapper: true })}
          </Text>
        </div>
        <Img
          src={image ? (image.startsWith('/') ? image : `/images/${image}`) : "/images/img_pexels_jibarofoto_2014773.png"}
          width={628}
          height={516}
          alt="Pexels"
          className="mb-6 h-[516px] w-[46%] rounded-[20px] object-contain lg:h-[460px] md:h-auto md:w-full md:max-w-[600px] sm:max-w-full"
        />
      </div>
    </>
  );
}
