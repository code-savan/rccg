"use client";

import { Img, Text } from "../../components";
import React, { useState, useEffect } from "react";

export default function CommunityHighlightsSection() {
  const [activeImage, setActiveImage] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/home/highlights');
        
        if (!response.ok) {
          throw new Error('Failed to fetch highlights data');
        }
        
        const result = await response.json();
        setData(result);
        
        // Set the first image as active if there are images
        if (result.highlights && result.highlights.length > 0) {
          setActiveImage(result.highlights[0]);
        }
      } catch (err) {
        console.error('Error fetching highlights data:', err);
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
      <div className="mt-[366px] sm:mt-[90px] self-stretch">
        <div className="flex flex-col items-center bg-charcoal lg:py-40 md:py-5 sm:py-5">
          <div className="container-xs mb-[72px] flex flex-col sm:pt-6 items-center gap-[146px] md:gap-[109px] md:px-5 sm:gap-0">
            <div className="flex flex-col items-center gap-[22px] self-stretch">
              <div className="animate-pulse h-10 bg-gray-600 rounded w-1/3"></div>
              <div className="animate-pulse h-6 bg-gray-600 rounded w-1/2"></div>
            </div>
            <div className="animate-pulse flex flex-col gap-8 w-full">
              <div className="h-64 bg-gray-600 rounded w-full"></div>
              <div className="flex flex-wrap justify-center gap-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="h-16 w-16 bg-gray-600 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mt-[366px] sm:mt-[90px] self-stretch">
        <div className="flex flex-col items-center bg-charcoal lg:py-40 md:py-5 sm:py-5">
          <div className="container-xs mb-[72px] flex items-center justify-center md:px-5">
            <div className="text-red-500 text-center py-16">
              <h2 className="text-xl font-semibold">Error loading highlights</h2>
              <p>Please try again later</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no data is available, show nothing
  if (!data || !data.highlights || data.highlights.length === 0) return null;

  return (
    <>
      {/* community highlights section */}
      <div className="mt-[366px] sm:mt-[90px] self-stretch">
        <div className="flex flex-col items-center bg-charcoal lg:py-40 md:py-5 sm:py-5">
          <div className="container-xs mb-[72px] flex flex-col sm:pt-6 items-center gap-[146px] md:gap-[109px] md:px-5 sm:gap-0">
            <Text
              size="text2xl"
              as="p"
              className="text-center text-[40px] font-medium leading-[100%] md:text-[38px] sm:text-[36px]"
            >
              <>
                Highlights from Our
                <br />
                Community
              </>
            </Text>
            <div className="flex flex-col gap-[50px] self-stretch">
              <div className="relative h-[846px]">
                <Img
                  src={activeImage}
                  width={1280}
                  height={752}
                  alt="Active"
                  className="absolute bottom-0 left-0 right-0 mx-auto h-[752px] w-full flex-1 rounded-[20px] object-cover object-top"
                />
              </div>
              <div className="mx-12 sm:mx-2 flex gap-3 md:mx-0 overflow-x-auto ">
                {data.highlights.map((image, index) => (
                  <Img
                    key={index}
                    src={image}
                    width={186}
                    height={154}
                    alt={`Highlight ${index + 1}`}
                    className={`md:h-[182px] sm:h-[50px] w-1/6 sm:w-1/3 rounded-[12px] sm:rounded-sm object-cover md:w-full cursor-pointer ${
                      activeImage === image ? "" : "opacity-50"
                    }`}
                    onClick={() => setActiveImage(image)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
