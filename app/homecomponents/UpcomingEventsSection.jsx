"use client";

import { Text, Img, Heading, Button } from "../../components";
import React from "react";
import AliceCarousel from "react-alice-carousel";

export default function UpcomingEventsSection() {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);

  // Event data for reusability
  const events = [
    {
      image: "img_edwin_andrade_4.png",
      title: "Salvation Celebration",
      description:
        "Lörem ipsum prelig trekånar i prenyde. Rektigt nelig osk och vare, emedan tåk. Trollfilt erd i koktiga evås. Du kan vara drabbad.Lörem ipsum prelig trekånar i prenyde. Rektigt nelig osk och vare, emedan tåk. Trollfilt erd i koktiga evås. Du kan vara drabbad.",
      location: "Parish House Indianapolis.",
      date: "10th January 2025",
    },
    {
      image: "img_worshae_bcy9e8uyuhu_unsplash.png",
      title: "Youth Event",
      description:
        "Lörem ipsum prelig trekånar i prenyde. Rektigt nelig osk och vare, emedan tåk. Trollfilt erd i koktiga evås. Du kan vara drabbad.Lörem ipsum prelig trekånar i prenyde. Rektigt nelig osk och vare, emedan tåk. Trollfilt erd i koktiga evås. Du kan vara drabbad.",
      location: "Parish House Indianapolis.",
      date: "16th January 2025",
    },
    {
      image: "img_edwin_andrade_4.png",
      title: "Bible Study Session",
      description:
        "Lörem ipsum prelig trekånar i prenyde. Rektigt nelig osk och vare, emedan tåk. Trollfilt erd i koktiga evås. Du kan vara drabbad.Lörem ipsum prelig trekånar i prenyde. Rektigt nelig osk och vare, emedan tåk. Trollfilt erd i koktiga evås. Du kan vara drabbad.",
      location: "Parish House Indianapolis.",
      date: "23rd January 2025",
    },
  ];

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
          as="h2"
          className="text-[24px] font-bold !text-gray-900_02 lg:text-[22px] md:text-[20px] sm:text-[18px]"
        >
          {event.title}
        </Heading>
        <Text
          size="textmd"
          as="p"
          className="text-[20px] font-normal leading-6 !text-gray-600_01 lg:text-[18px] md:text-[16px] sm:text-[15px]"
        >
          {event.description}
        </Text>
        <div className="flex gap-4 self-stretch sm:flex-col">
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
              className="text-[20px] font-normal !text-blue-a400 lg:text-[18px] md:text-[16px] sm:text-[15px]"
            >
              {event.location}
            </Text>
          </div>
          <div className="flex flex-1 items-center gap-2 sm:self-stretch">
            <Img
              src="img_calendar_calendar.svg"
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
              Upcoming events
            </Heading>
            <div className="flex flex-1 justify-end gap-4 self-end sm:self-stretch sm:justify-center">
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
