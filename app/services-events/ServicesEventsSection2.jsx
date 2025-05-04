"use client";

import { Text, Img, Heading, Slider, Button } from "../../components";
import React, { useState, useEffect } from "react";
import { formatTextWithNewlines } from "@/lib/textUtils";

export default function ServicesEventsSection2() {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/services-events/upcoming-events', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch upcoming events data');
        }

        const result = await response.json();
        console.log('Fetched upcoming events data:', result);
        setData(result);
      } catch (err) {
        console.error('Error fetching upcoming events data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up an interval to refresh data every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Get content directly from backend data
  // The API returns { heading, events } structure based on mapDBToUpcomingEventsSection
  const title = data?.heading || "";
  const eventsToDisplay = data?.events || [];

  return (
    <>
      {/* services events section */}
      <div className="mt-[196px] flex flex-col gap-[72px] md:mt-28 sm:mt-20 md:gap-[54px] sm:gap-9">
        <div className="container-xs md:px-5">
          <div className="flex items-start justify-between md:flex-wrap sm:flex-col">
            <Heading
              as="h2"
              className="text-[40px] font-semibold lg:text-[36px] md:text-[32px] sm:text-[28px]"
            >
              {formatTextWithNewlines(title, { noWrapper: true })}
            </Heading>
            <div className="flex gap-4 self-end mt-4 sm:self-start sm:mt-6">
              <Button
                onClick={() => {
                  sliderRef?.current?.slidePrev();
                }}
                shape="circle"
                className="w-[60px] rounded-[30px] border border-solid border-gray-400 px-[18px] hover:bg-[#4D88FF] hover:text-white_color hover:border-[#4D88FF] transition-colors"
              >
                <Img src="img_arrow_left.svg" width={24} height={24} />
              </Button>
              <Button
                onClick={() => {
                  sliderRef?.current?.slideNext();
                }}
                shape="circle"
                className="w-[60px] rotate-[-180deg] rounded-[30px] border border-solid border-gray-400 px-[18px] hover:bg-[#4D88FF] hover:text-white_color hover:border-[#4D88FF] transition-colors"
              >
                <Img src="img_arrow_left.svg" width={24} height={24} />
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-full overflow-x-hidden">
          {loading ? (
            <div className="w-full flex justify-center items-center py-20">
              <Text size="textlg" as="p" className="text-[24px] font-normal !text-charcoal">
                Loading events...
              </Text>
            </div>
          ) : eventsToDisplay.length === 0 ? (
            <div className="w-full flex justify-center items-center py-20">
              <Text size="textlg" as="p" className="text-[24px] font-normal !text-charcoal">
                No upcoming events at this time. Check back soon!
              </Text>
            </div>
          ) : (
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
              className="w-full md:px-5 sm:px-2"
              items={eventsToDisplay.map((event, index) => (
                <React.Fragment key={index}>
                  <div className="px-3 md:px-2 sm:px-4">
                    <div className="flex flex-col justify-center border border-solid border-gray-300 bg-white_color md:p-5">
                      <Img
                        src={event.image ? (typeof event.image === 'string' && event.image.startsWith('/') ? event.image : `/images/${event.image}`) : "/images/img_edwin_andrade_4.png"}
                        width={416}
                        height={260}
                        alt={event.title}
                        className="h-[500px] w-full object-cover"
                      />
                      <div className="flex flex-col gap-[22px] p-[18px]">
                        <div className="flex flex-col items-start gap-2">
                          <Text
                            size="textlg"
                            as="p"
                            className="text-[24px] font-normal !text-charcoal lg:text-[22px] md:text-[20px] sm:text-[18px]"
                          >
                            {formatTextWithNewlines(event.title, { noWrapper: true })}
                          </Text>
                          <Text
                            size="textmd"
                            as="p"
                            className="text-[20px] font-normal !text-gray-600_01 lg:text-[18px] md:text-[16px]"
                          >
                            {formatTextWithNewlines(event.date, { noWrapper: true })}
                          </Text>
                        </div>
                        <div className="flex flex-col items-start gap-2">
                          <Text
                            size="textmd"
                            as="p"
                            className="text-[20px] font-normal !text-gray-600_01 lg:text-[18px] md:text-[16px]"
                          >
                            {formatTextWithNewlines(event.description, { noWrapper: true })}
                          </Text>
                        </div>
                        <div className="flex items-center gap-2">
                          <Img
                            src="img_navigation_house_03.svg"
                            width={24}
                            height={24}
                            alt="Navigation"
                            className="h-[24px]"
                          />
                          <Text
                            size="textmd"
                            as="p"
                            className="text-[20px] font-normal !text-blue-a400 lg:text-[18px] md:text-[16px]"
                          >
                            {event.location || "Parish House Indianapolis."}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            />
          )}
        </div>
      </div>
    </>
  );
}
