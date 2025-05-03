"use client";

import { Text, Img, Heading, Button } from "../../components";
import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";

export default function UpcomingEventsSection() {
  const [sliderState, setSliderState] = useState(0);
  const sliderRef = React.useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Create individual event component
  const Event = ({ event }) => (
    <div className="flex w-full flex-col gap-[30px] px-4 md:px-5">
      <Img
        src={event.image}
        width={808}
        height={744}
        alt={event.title}
        className="h-[744px] w-full object-cover md:h-auto"
      />
      <div className="flex flex-col items-start gap-[30px]">
        <Heading
          size="headingxs"
          as="h3"
          className="text-[32px] font-semibold leading-[120%] tracking-[-0.64px] lg:text-[25px] md:text-[22px] sm:text-[19px]"
        >
          {event.title}
        </Heading>
        <Text
          size="textlg"
          as="p"
          className="!font-poppins text-[16px] font-light leading-[150%] !text-gray-700_01 md:text-[15px] sm:text-[14px]"
        >
          {event.description}
        </Text>
        <div className="flex flex-col gap-[15px] self-stretch">
          <div className="flex items-center gap-[15px]">
            <Img
              src="images/img_material_symbol.svg"
              alt="material_symbol"
              className="h-[24px] w-[24px]"
            />
            <Text
              size="textlg"
              as="p"
              className="!font-poppins text-[16px] font-light leading-[150%] !text-gray-700_01 md:text-[15px] sm:text-[14px]"
            >
              {event.location}
            </Text>
          </div>
          <div className="flex items-center gap-[15px]">
            <Img
              src="images/img_material_symbol_gray_700_01.svg"
              alt="material_symbol_one"
              className="h-[24px] w-[24px]"
            />
            <Text
              size="textlg"
              as="p"
              className="!font-poppins text-[16px] font-light leading-[150%] !text-gray-700_01 md:text-[15px] sm:text-[14px]"
            >
              {event.date}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );

  // Loading skeleton
  if (loading) {
    return (
      <div className="mt-[252px] sm:mt-[90px] md:mt-[180px] self-stretch">
        <div className="container-xs flex flex-col items-center gap-[62px] px-14 md:gap-[40px] md:px-5 sm:gap-[31px]">
          <div className="flex flex-col items-center gap-[22px] self-stretch">
            <div className="animate-pulse h-10 bg-gray-200 rounded w-1/3"></div>
            <div className="animate-pulse h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="animate-pulse flex flex-col gap-8 w-full">
            <div className="h-[400px] bg-gray-200 rounded w-full"></div>
            <div className="h-8 bg-gray-200 rounded w-2/3 mt-4"></div>
            <div className="h-24 bg-gray-200 rounded w-full mt-2"></div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mt-[252px] sm:mt-[90px] md:mt-[180px] self-stretch">
        <div className="container-xs flex items-center justify-center px-14 md:px-5">
          <div className="text-red-500 text-center py-16">
            <h2 className="text-xl font-semibold">Error loading events</h2>
            <p>Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  // If no data is available, show nothing
  if (!data || !data.events || data.events.length === 0) return null;

  // Responsive settings for the carousel
  const responsive = {
    0: { items: 1 },
    768: { items: 1 },
    992: { items: 1 },
  };

  return (
    <>
      {/* upcoming events section */}
      <div className="mt-[252px] sm:mt-[90px] md:mt-[180px] self-stretch">
        <div className="container-xs flex flex-col items-center gap-[62px] px-14 md:gap-[40px] md:px-5 sm:gap-[31px]">
          <div className="flex flex-col items-center gap-[22px] self-stretch">
            <Heading
              as="h2"
              className="text-center text-[40px] font-semibold lg:text-[36px] md:text-[32px] sm:text-[28px]"
            >
              {data.title}
            </Heading>
            <Text
              as="p"
              className="text-center !font-poppins text-[16px] font-light leading-[130%] !text-gray-700_01 md:text-[15px] sm:text-[14px]"
            >
              {data.subtitle}
            </Text>
          </div>
          <div className="flex w-full justify-center">
            <div className="flex w-full flex-col gap-[50px]">
              <AliceCarousel
                autoPlay
                autoPlayInterval={5000}
                disableButtonsControls
                disableDotsControls
                infinite
                items={data.events.map((event, index) => (
                  <Event key={index} event={event} />
                ))}
                mouseTracking
                responsive={responsive}
                ref={sliderRef}
                activeIndex={sliderState}
                onSlideChanged={(e) => setSliderState(e.item)}
              />
              <div className="flex items-center justify-center gap-[15px]">
                <Button
                  color="gray_400"
                  variant="outline"
                  shape="circle"
                  className="!h-[50px] !w-[50px] rounded-[50%]"
                  onClick={() =>
                    sliderRef.current?.slidePrev({
                      duration: 1000,
                    })
                  }
                >
                  <Img
                    src="images/img_arrow_left.svg"
                    alt="arrow_left"
                    className="h-[24px] w-[24px]"
                  />
                </Button>
                <Button
                  color="gray_400"
                  variant="outline"
                  shape="circle"
                  className="!h-[50px] !w-[50px] rounded-[50%]"
                  onClick={() =>
                    sliderRef.current?.slideNext({
                      duration: 1000,
                    })
                  }
                >
                  <Img
                    src="images/img_arrow_right.svg"
                    alt="arrow_right"
                    className="h-[24px] w-[24px]"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
