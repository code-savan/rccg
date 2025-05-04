"use client";

import { Img, Text } from "../../components";
import React, { useState, useEffect } from "react";

export default function CommunityHighlightsSection() {
  // Add state to track the currently displayed image
  const [activeImage, setActiveImage] = useState({
    src: "/images/H1.jpeg",
    alt: "Active",
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default images
  const defaultImages = [
    { src: "/images/H1.jpeg", alt: "H1" },
    { src: "/images/H2.jpeg", alt: "H2" },
    { src: "/images/H3.jpeg", alt: "H3" },
    { src: "/images/H4.jpeg", alt: "H4" },
    { src: "/images/H5.jpeg", alt: "H5" },
    { src: "/images/H6.jpeg", alt: "H6" },
    { src: "/images/H7.jpeg", alt: "H7" },
    { src: "/images/H8.jpeg", alt: "H8" },
    { src: "/images/H9.jpeg", alt: "H9" },
    { src: "/images/H10.jpeg", alt: "H10" },
    { src: "/images/H11.jpeg", alt: "H11" },
    { src: "/images/H12.jpeg", alt: "H12" },
    { src: "/images/H13.jpeg", alt: "H13" },
    { src: "/images/H14.jpeg", alt: "H14" },
    { src: "/images/H15.jpeg", alt: "H15" },
    { src: "/images/H16.jpeg", alt: "H16" },
    { src: "/images/H17.jpeg", alt: "H17" },
    { src: "/images/H18.jpeg", alt: "H18" },
    { src: "/images/H19.jpeg", alt: "H19" },
    { src: "/images/H20.jpeg", alt: "H20" },
    { src: "/images/H21.jpeg", alt: "H21" },
    { src: "/images/H22.jpeg", alt: "H22" },
    { src: "/images/H23.jpeg", alt: "H23" },
    { src: "/images/H24.jpeg", alt: "H24" },
    { src: "/images/H25.jpeg", alt: "H25" },
    { src: "/images/H26.jpeg", alt: "H26" },
    { src: "/images/H27.jpeg", alt: "H27" },
    { src: "/images/H28.jpeg", alt: "H28" },
    { src: "/images/H29.jpeg", alt: "H29" }
  ];

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
      } catch (err) {
        console.error('Error fetching highlights data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Use default data or fetched data
  const title = data?.title || "COMMUNITY HIGHLIGHTS";
  const subtitle = data?.subtitle || "See what's happening in our church community.";
  const images = data?.highlights || defaultImages;

  // Helper function to ensure image paths have the correct format
  const formatImagePath = (imagePath) => {
    if (!imagePath) return "/images/defaultNoData.png";

    // If it's already a full URL or starts with a slash, return as is
    if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
      return imagePath;
    }

    // Otherwise, add the /images/ prefix
    return `/images/${imagePath}`;
  };

  return (
    <>
      {/* community highlights section */}
      <div className="mt-[366px] sm:mt-[90px] self-stretch">
        <div className="flex flex-col items-center bg-charcoal lg:py-40 md:py-5 sm:py-5">
          <div className="container-xs mb-[72px] flex flex-col sm:pt-6 items-center gap-[20px] md:px-5 sm:gap-0">
            <div className="flex flex-col items-center gap-[22px] self-stretch">
              <Text
                as="h2"
                className="text-center text-[40px] font-semibold !text-white_color lg:text-[36px] md:text-[32px] sm:text-[28px]"
              >
                {title}
              </Text>
              <Text
                as="p"
                className="text-center !font-poppins text-[16px] font-light leading-[130%] !text-white_color md:text-[15px] sm:text-[14px]"
              >
                {subtitle}
              </Text>
            </div>
            <div className="flex flex-col gap-[50px] self-stretch">
              <div className="relative h-[846px] w-full">
                <Img
                  src={formatImagePath(activeImage.src)}
                  width={1280}
                  height={752}
                  alt={activeImage.alt}
                  className="absolute bottom-0 left-0 right-0 mx-auto h-[752px] w-full flex-1 rounded-[20px] object-cover object-top"
                />
              </div>
              <div className="flex items-center justify-center gap-[22px] md:gap-[18px]
              sm:gap-[10px] overflow-x-auto w-full">
                {images.map((image, index) => {
                  const imgSrc = image.src || image;
                  const imgAlt = image.alt || `Highlight ${index + 1}`;

                  return (
                    <div
                      key={index}
                      className="h-[40px] sm:h-[30px] w-[40px] sm:w-[30px] cursor-pointer"
                      onClick={() => setActiveImage({
                        src: formatImagePath(imgSrc),
                        alt: imgAlt
                      })}
                      style={{width: "40px", height: "40px"}}
                    >
                      <Img
                        src={formatImagePath(imgSrc)}
                        width={40}
                        height={40}
                        alt={imgAlt}
                        className={`h-full w-full rounded-[4px] sm:rounded-sm object-cover ${
                          activeImage.src === formatImagePath(imgSrc) ? "" : "opacity-50"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
