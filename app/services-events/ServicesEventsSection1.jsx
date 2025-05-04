"use client";

import { Text, Img, Slider, Heading, Button } from "../../components";
import React, { useState, useEffect } from "react";
import { formatTextWithNewlines } from "@/lib/textUtils";

// Default monthly programs for server-side rendering
const defaultMonthlyPrograms = [
  {
    day: "First Sunday",
    time: "10:00 AM - 12:30 PM",
    title: "Holy Communion Service",
    description: "Join us as we partake in the Lord's Supper, remembering Christ's sacrifice and celebrating our communion with Him and each other."
  },
  {
    day: "Last Friday",
    time: "10:00 PM - 1:00 AM",
    title: "Holy Ghost Night",
    description: "Experience a powerful night of prayer, worship, and ministry of the Holy Spirit. Come expecting a divine encounter."
  },
  {
    day: "Third Sunday",
    time: "10:00 AM - 12:30 PM",
    title: "Thanksgiving Service",
    description: "A special service dedicated to giving thanks to God for His faithfulness and blessings in our lives and church community."
  }
];

// Default content
const defaultContent = {
  title: "Monthly Programs",
  description: "Join us for our monthly special services and events. These gatherings provide unique opportunities for spiritual growth, fellowship, and experiencing God's presence in powerful ways.",
  monthlyPrograms: defaultMonthlyPrograms
};

export default function ServicesEventsSection1() {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);
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
          const response = await fetch('/api/services-events/monthly-programs');
          
          if (!response.ok) {
            throw new Error('Failed to fetch monthly programs data');
          }
          
          const result = await response.json();
          setData(result);
        } catch (fetchError) {
          console.log('API not available yet, using default data');
          // Just use default data if API doesn't exist yet
        }
      } catch (err) {
        console.error('Error fetching monthly programs data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isClient]);
  
  // The API returns data based on mapDBToMonthlyProgramsSection structure
  // { heading, monthlyPrograms }
  let title = data?.heading || "Monthly Programs";
  const programsToDisplay = data?.monthlyPrograms || defaultMonthlyPrograms;
  
  // Add console logging to debug the data
  console.log('Monthly Programs Data:', data);
  
  // Handle escaped newlines
  if (title) title = title.replace(/\\n/g, '\n');

  return (
    <>
      {/* services events section */}
      <div className="mt-[196px] flex flex-col items-center gap-[74px] md:mt-28 sm:mt-20 md:gap-[55px] sm:gap-[37px]">
        <div className="container flex flex-col items-start px-14 md:px-5">
          <div className="flex w-[66%] flex-col items-start gap-8 md:w-full sm:pl-0 md:pl-6 lg:pl-6">
            <Heading
              size="headings"
              as="h2"
              className="text-[32px] font-semibold lg:text-[30px] md:text-[28px] sm:text-[24px]"
            >
              {formatTextWithNewlines(title, { noWrapper: true })}
            </Heading>
          </div>
        </div>
        <div className="flex w-full flex-col gap-12 self-end md:gap-10 sm:gap-8">
          <div className="mx-auto flex w-full gap-6 overflow-x-hidden md:mx-0 md:flex-col">
            <Slider
              autoPlay
              autoPlayInterval={2000}
              responsive={{
                0: { items: 1 },
                551: { items: 1 },
                768: { items: 1 },
                1051: { items: 3 },
              }}
              paddingLeft={0}
              paddingRight={0}
              disableDotsControls
              activeIndex={sliderState}
              onSlideChanged={(e) => {
                setSliderState(e?.item);
              }}
              ref={sliderRef}
              className="w-full sm:px-0"
              items={programsToDisplay.map((program, index) => (
                <React.Fragment key={index}>
                  <div className="px-3 md:px-2 sm:px-4">
                    <div className="flex flex-col justify-center gap-[138px] rounded-[16px] border border-solid border-gray-300 bg-white_color px-[18px] py-[42px] md:gap-[103px] md:p-5 sm:gap-[69px] w-full">
                      <div className="flex flex-col items-start gap-2">
                        <Text
                          size="textlg"
                          as="p"
                          className="text-[24px] font-medium !text-gray-900 lg:text-[22px] md:text-[20px] sm:text-[18px]"
                        >
                          {formatTextWithNewlines(program.title, { noWrapper: true })}
                        </Text>
                        <Text
                          as="p"
                          className="text-[16px] font-normal leading-[19px] !text-gray-600_01"
                        >
                          {formatTextWithNewlines(program.description, { noWrapper: true })}
                        </Text>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <Img
                            src="img_navigation_house_03_gray_900_02.svg"
                            width={20}
                            height={20}
                            alt="Navigation"
                            className="h-[20px]"
                          />
                          <Text
                            as="p"
                            className="text-[16px] font-normal !text-gray-900_02"
                          >
                            Parish House Indy
                          </Text>
                        </div>
                        <div className="flex items-center gap-2">
                          <Img
                            src="img_calendar_calendar_gray_900_02.svg"
                            width={20}
                            height={20}
                            alt="Calendar"
                            className="h-[20px]"
                          />
                          <Text
                            as="p"
                            className="text-[16px] font-normal !text-gray-900_02"
                          >
                            {program.day}
                          </Text>
                        </div>
                        <div className="flex items-center gap-3">
                          <Img
                            src="img_search.svg"
                            width={20}
                            height={20}
                            alt="Search"
                            className="h-[20px]"
                          />
                          <Text
                            as="p"
                            className="text-[16px] font-normal !text-gray-900_02"
                          >
                            {program.time}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            />
          </div>
        </div>
        <div className="container-xs flex items-center justify-between w-full mt-6 md:px-5">
          <Img
            src="img_status.svg"
            width={46}
            height={30}
            alt="Status"
            className="h-[30px] w-[4%] rounded-[50%]"
          />
          <div className="flex gap-4 px-8 sm:px-5">
            <Button
              shape="circle"
              onClick={() => {
                sliderRef?.current?.slidePrev();
              }}
              className="w-[60px] rounded-[30px] border border-solid border-gray-400 px-[18px] hover:bg-[#4D88FF] hover:text-white_color hover:border-[#4D88FF] transition-colors"
            >
              <Img src="img_arrow_left.svg" width={24} height={24} />
            </Button>
            <Button
              shape="circle"
              onClick={() => {
                sliderRef?.current?.slideNext();
              }}
              className="w-[60px] rotate-[-180deg] rounded-[30px] border border-solid border-gray-400 px-[18px] hover:bg-[#4D88FF] hover:text-white_color hover:border-[#4D88FF] transition-colors"
            >
              <Img src="img_arrow_left.svg" width={24} height={24} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
