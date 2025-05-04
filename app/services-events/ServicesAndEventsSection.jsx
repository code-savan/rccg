"use client";

import { Button, Img, Text, Slider, Heading } from "../../components";
import React, { useState, useEffect } from "react";
import { formatTextWithNewlines } from "@/lib/textUtils";

// Default program items - these must be the same on server and client
const defaultPrograms = [
  {
    title: 'Sunday Service',
    time: '10:00 AM - 12:30 PM',
    description: 'Join us for a powerful service filled with worship, prayer, and the Word of God. All are welcome!'
  },
  {
    title: 'Bible Study',
    time: '7:00 PM - 8:30 PM',
    description: 'Dive deeper into God\'s Word with our interactive Bible study sessions. Everyone is encouraged to participate.'
  },
  {
    title: 'Prayer Meeting',
    time: '6:30 PM - 8:00 PM',
    description: 'Come together in prayer as we intercede for our church, community, and world. Experience the power of corporate prayer.'
  }
];

export default function ServicesAndEventsSection() {
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
          const response = await fetch('/api/services-events/weekly-programs');
          
          if (!response.ok) {
            throw new Error('Failed to fetch weekly programs data');
          }
          
          const result = await response.json();
          setData(result);
        } catch (fetchError) {
          console.log('API not available yet, using default data');
          // Just use default data if API doesn't exist yet
        }
      } catch (err) {
        console.error('Error fetching weekly programs data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isClient]);

  // The API returns data based on mapDBToWeeklyProgramsSection structure
  // { heading, description, weeklyPrograms }
  let title = data?.heading || "Weekly and Monthly\nChurch Programs";
  let description = data?.description || "This team maintains the cleanliness and beauty of God's house, creating a welcoming and reverent environment for worship.";
  let weeklyTitle = "Weekly";
  const weeklyPrograms = data?.weeklyPrograms || [];
  
  // Add console logging to debug the data
  console.log('Weekly Programs Data:', data);
  
  // Handle escaped newlines
  title = title.replace(/\\n/g, '\n');
  description = description.replace(/\\n/g, '\n');

  // Use default programs if no data is available or if we're still loading
  const programsToDisplay = (!loading && weeklyPrograms.length > 0) ? weeklyPrograms : defaultPrograms;

  return (
    <>
      {/* services and events section */}
      <div className="mt-[196px] flex flex-col items-center gap-[74px] md:mt-28 sm:mt-20 md:gap-[55px] sm:gap-[37px]">
        <div className="container-xs flex flex-col items-center px-14 md:px-5">
          <div className="flex w-[66%] flex-col items-center gap-8 md:w-full">
            <Heading
              as="h2"
              className="text-center text-[40px] font-semibold leading-[100%] lg:text-[36px] md:text-[32px] sm:text-[28px]"
            >
              {formatTextWithNewlines(title, { noWrapper: true })}
            </Heading>
            <Text
              as="p"
              className="self-stretch text-center !font-poppins text-[16px] font-light leading-[120%] !text-charcoal"
            >
              {formatTextWithNewlines(description, { noWrapper: true })}
            </Text>
          </div>
        </div>
        <div className="flex w-full flex-col gap-12 self-end md:gap-10 sm:gap-8">
          <div className="container-xs flex flex-col items-start md:px-5">
            <Heading
              size="headings"
              as="h3"
              className="text-[32px] font-semibold lg:text-[30px] md:text-[28px] sm:text-[24px]"
            >
              {weeklyTitle}
            </Heading>
          </div>
          <div className="mx-auto flex w-full gap-6 overflow-x-hidden md:mx-0 md:flex-col">
            {/* Only render slider on client side to avoid hydration errors */}
            {isClient ? (
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
                      <div className="flex flex-col justify-center gap-[138px] rounded-[16px] border border-solid border-gray-300 bg-white_color px-[18px] py-[42px] md:gap-[103px] md:p-5 sm:gap-[69px]">
                        <div className="flex flex-col items-start gap-2">
                          <Text
                            size="textlg"
                            as="p"
                            className="text-[24px] font-normal !text-charcoal lg:text-[22px] md:text-[20px] sm:text-[18px]"
                          >
                            {formatTextWithNewlines(program.title, { noWrapper: true })}
                          </Text>
                          <Text
                            size="textmd"
                            as="p"
                            className="text-[20px] font-normal !text-gray-600_01 lg:text-[18px] md:text-[16px]"
                          >
                            {formatTextWithNewlines(program.time, { noWrapper: true })}
                          </Text>
                        </div>
                        <div className="flex flex-col items-start gap-2">
                          <Text
                            size="textmd"
                            as="p"
                            className="text-[20px] font-normal !text-gray-600_01 lg:text-[18px] md:text-[16px]"
                          >
                            {formatTextWithNewlines(program.description, { noWrapper: true })}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              />
            ) : (
              // Fallback for server-side rendering
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
                {defaultPrograms.map((program, index) => (
                  <div key={index} className="flex flex-col justify-center gap-8 rounded-[16px] border border-solid border-gray-300 bg-white_color px-[18px] py-[42px] md:p-5">
                    <div className="flex flex-col items-start gap-2">
                      <p className="text-[24px] font-normal text-charcoal lg:text-[22px] md:text-[20px] sm:text-[18px]">
                        {program.title}
                      </p>
                      <p className="text-[20px] font-normal text-gray-600_01 lg:text-[18px] md:text-[16px]">
                        {program.time}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <p className="text-[20px] font-normal text-gray-600_01 lg:text-[18px] md:text-[16px]">
                        {program.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
