import { Img, Text, Button, Heading } from "../../components";
import React, { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import Link from "next/link";
import { formatDisplayText } from "@/lib/homeFormData";

export default function HomeWelcomeSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/home/welcome-hero');
        
        if (!response.ok) {
          throw new Error('Failed to fetch welcome hero data');
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching welcome hero data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Text rotation effect
  useEffect(() => {
    if (!data || !data.bibleVerses || data.bibleVerses.length === 0) return;
    
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.bibleVerses.length);
      }, 3000); // Change text every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isPaused, data]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handlePauseToggle = () => {
    setIsPaused((prev) => !prev);
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="w-full px-24 flex flex-col items-start justify-center gap-9 md:flex-col md:px-5">
          <div className="mb-[120px] sm:mb-0 flex flex-1 flex-col items-start gap-14 md:self-stretch sm:gap-7">
            <div className="animate-pulse flex flex-col gap-4">
              <div className="h-12 bg-gray-200 rounded w-3/4"></div>
              <div className="h-12 bg-gray-200 rounded w-2/3"></div>
              <div className="h-12 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mt-4"></div>
              <div className="h-10 bg-gray-200 rounded w-32 mt-6"></div>
            </div>
            <div className="animate-pulse w-full max-w-md">
              <div className="h-24 bg-gray-200 rounded w-full"></div>
              <div className="flex justify-center mt-4 gap-2">
                <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
                <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
                <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
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
      <div className="flex justify-center">
        <div className="w-full px-24 flex flex-col items-start justify-center gap-9 md:flex-col md:px-5">
          <div className="mb-[120px] sm:mb-0 flex flex-1 flex-col items-start gap-14 md:self-stretch sm:gap-7">
            <div className="text-red-500">
              <h2 className="text-xl font-semibold">Error loading content</h2>
              <p>Please try again later</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no data is available, show nothing
  if (!data) return null;

  return (
    <>
      {/* home welcome section */}
      <div className="flex justify-center">
        <div className="w-full px-24 flex flex-col items-start justify-center gap-9 md:flex-col md:px-5">
          <div className="mb-[120px] sm:mb-0 flex flex-1 flex-col items-start gap-14 md:self-stretch sm:gap-7 ">
            <div className="flex flex-col items-start gap-[29px] self-stretch">
              <div className="flex flex-col items-start gap-[23px] self-stretch">
                <Heading
                  as="h1"
                  className="!text-white_color text-[64px] font-semibold leading-[120%] tracking-[-1.28px] lg:text-[51px] md:text-[45px] sm:text-[38px]"
                  dangerouslySetInnerHTML={{ __html: formatDisplayText(data.welcomeTitle) }}
                />
                <Text
                  as="p"
                  className="!text-white_color text-[18px] font-normal leading-[130%] md:text-[16px] sm:text-[14px]"
                >
                  {data.subtitle}
                </Text>
              </div>
              <Link href="/about-us">
                <Button
                  color="white_A700"
                  size="lg"
                  className="min-w-[154px] font-semibold"
                >
                  {data.buttonText}
                </Button>
              </Link>
            </div>
            <div className="flex flex-col gap-[31px] self-stretch rounded-[10px] bg-white_A700_33 p-[30px] backdrop-blur-[25px] md:p-5">
              <div className="flex items-center justify-between self-stretch">
                <div className="flex flex-col gap-[5px]">
                  <Text
                    as="p"
                    className="!text-white_color text-[18px] font-semibold leading-[130%] md:text-[16px] sm:text-[14px]"
                  >
                    Bible Verse
                  </Text>
                  <Text
                    as="p"
                    className="!text-white_color text-[14px] font-normal leading-[130%]"
                  >
                    {data.bibleVerses && data.bibleVerses.length > 0 
                      ? data.bibleVerses[currentIndex].reference 
                      : ""}
                  </Text>
                </div>
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[50%] border border-solid border-white_color">
                  <Button
                    color="white_A700"
                    size="xs"
                    shape="circle"
                    onClick={handlePauseToggle}
                    className="!h-[34px] !w-[34px] !rounded-[50%]"
                  >
                    {isPaused ? (
                      <Play size={16} />
                    ) : (
                      <Pause size={16} />
                    )}
                  </Button>
                </div>
              </div>
              <Text
                as="p"
                className="!text-white_color text-[20px] font-normal italic leading-[130%] md:text-[18px] sm:text-[16px]"
              >
                {data.bibleVerses && data.bibleVerses.length > 0 
                  ? data.bibleVerses[currentIndex].verse 
                  : ""}
              </Text>
              <div className="flex items-center justify-center gap-2 self-stretch">
                {data.bibleVerses && data.bibleVerses.map((_, index) => (
                  <div
                    key={index}
                    className={`h-[10px] w-[10px] cursor-pointer rounded-[50%] ${
                      currentIndex === index
                        ? "bg-white_color"
                        : "bg-white_A700_4c"
                    }`}
                    onClick={() => handleDotClick(index)}
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
