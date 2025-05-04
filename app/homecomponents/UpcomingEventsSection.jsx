"use client";

import { Text, Img, Heading, Button } from "../../components";
import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { formatTextWithNewlines } from "@/lib/textUtils";

export default function UpcomingEventsSection() {
  const [sliderState, setSliderState] = useState(0);
  const sliderRef = React.useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default event data for reusability
  const defaultEvents = [
    {
      image: "/images/event1.jpeg",
      title: " ",
      description:
        "Join us at RCCG Rod of God Parish for any of our events, a powerful gathering of worship, prayer, and spiritual renewal. Our events are designed to uplift, inspire, and bring us closer to God as a community. Expect heartfelt worship, impactful teachings, and a time of fellowship with believers.",
      location: "Parish House Indianapolis.",
      date: "To Be Dated(TBD)",
    },
    {
      image: "/images/event2.jpeg",
      title: "Coming Soon",
      description:
        "Join us at RCCG Rod of God Parish for any of our events, a powerful gathering of worship, prayer, and spiritual renewal. Our events are designed to uplift, inspire, and bring us closer to God as a community. Expect heartfelt worship, impactful teachings, and a time of fellowship with believers.",
      location: "Parish House Indianapolis.",
      date: "To Be Dated(TBD)",
    },
  ];

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/home/events');
        
        if (!response.ok) {
          throw new Error('Failed to fetch events data');
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching events data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  // Create individual event component
  const Event = ({ event }) => (
    <div className="flex w-full flex-col gap-[30px] px-4 md:px-5">
      <Img
        src={formatImagePath(event.image)}
        width={808}
        height={744}
        alt={event.title}
        className="h-[744px] w-full object-cover md:h-auto"
      />
      <div className="flex flex-col items-start gap-[30px]">
        <Heading
          size="headingxs"
          as="h2"
          className="text-[24px] font-bold !text-gray-900_02 lg:text-[22px] md:text-[20px] sm:text-[18px]"
        >
          {event.title}
        </Heading>
        <Text
          size="textmd"
          as="p"
          className="text-[20px] font-normal leading-[130%] !text-gray-600_01 lg:text-[18px] md:text-[16px] sm:text-[15px]"
        >
          {formatTextWithNewlines(event.description)}
        </Text>
        <div className="flex gap-4 self-stretch sm:flex-col">
          <div className="flex items-center gap-2">
            <Img
              src="/images/img_navigation_house_03.svg"
              width={24}
              height={24}
              alt="Navigation"
              className="h-[24px]"
            />
            <Text
              size="textmd"
              as="p"
              className="text-[20px] font-normal !text-blue-a400 lg:text-[18px] md:text-[16px] sm:text-[15px]"
            >
              {event.location}
            </Text>
          </div>
          <div className="flex flex-1 items-center gap-2 sm:self-stretch">
            <Img
              src="/images/img_calendar_calendar.svg"
              width={24}
              height={24}
              alt="Calendar"
              className="h-[24px]"
            />
            <Text
              size="textmd"
              as="p"
              className="text-[20px] font-normal !text-blue-a400 lg:text-[18px] md:text-[16px] sm:text-[15px]"
            >
              {event.date}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );

  // Use default data or fetched data
  const events = data?.events || defaultEvents;
  const title = data?.title || "Upcoming events";
  const subtitle = data?.subtitle || "";
  
  // Process event descriptions to handle escaped newlines
  events.forEach(event => {
    if (event.description) {
      event.description = event.description.replace(/\\n/g, '\n');
    }
  });

  // Generate slides based on screen size
  const items = events.map((event, index) => (
    <Event event={event} key={`event-${index}`} />
  ));

  return (
    <>
      {/* upcoming events section */}
      <div className="md:mt-[250px] lg:mt-[372px] sm:mt-[90px] flex flex-col gap-[72px] self-stretch md:gap-[54px] sm:gap-9">
        <div className="container-xs lg:px-5 md:px-5">
          <div className="flex items-start justify-center sm:flex-col sm:gap-16">
            <Heading
              as="h2"
              className="text-[40px] font-semibold lg:text-[36px] md:text-[32px] sm:text-[28px] sm:mx-auto"
            >
              {title}
            </Heading>
            <div className="flex flex-1 justify-end gap-4 self-end sm:self-stretch sm:justify-center">
              <Button
                onClick={() => {
                  sliderRef?.current?.slidePrev();
                }}
                shape="circle"
                className="w-[60px] rounded-[30px] border border-solid border-gray-400 px-[18px] hover:bg-[#4D88FF] hover:text-white_color hover:border-[#4D88FF] transition-colors"
              >
                <Img src="/images/img_arrow_left.svg" width={24} height={24} alt="Previous" />
              </Button>
              <Button
                onClick={() => {
                  sliderRef?.current?.slideNext();
                }}
                shape="circle"
                className="w-[60px] rotate-[-180deg] rounded-[30px] border border-solid border-gray-400 px-[18px] hover:bg-[#4D88FF] hover:text-white_color hover:border-[#4D88FF] transition-colors"
              >
                <Img src="/images/img_arrow_left.svg" width={24} height={24} alt="Next" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-full overflow-x-hidden">
          <AliceCarousel
            autoPlay
            autoPlayInterval={5000}
            infinite={true}
            responsive={{
              0: { items: 1 }, // Mobile
              768: { items: 2 }, // Tablet and above - 2 items per slide
            }}
            disableDotsControls
            disableButtonsControls
            activeIndex={sliderState}
            onSlideChanged={(e) => {
              setSliderState(e?.item);
            }}
            ref={sliderRef}
            items={items}
          />
        </div>
      </div>
    </>
  );
}
