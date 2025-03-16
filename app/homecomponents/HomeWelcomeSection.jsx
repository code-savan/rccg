import { Img, Text, Button, Heading } from "../../components";
import React, { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import Link from "next/link";

const texts = [
  {
    verse: "Ephesians 4:16 (NIV)",
    content:
      "From him the whole body, joined and held together by every supporting ligament, grows and builds itself up in love, as each part does its work",
  },
  {
    verse: "Colossians 3:14 (NIV)",
    content:
      "And over all these virtues put on love, which binds them all together in perfect unity",
  },
  {
    verse: "1 Corinthians 10:17 (NIV)",
    content:
      "Because there is one loaf, we, who are many, are one body, for we all share the one loaf.",
  },
];

export default function HomeWelcomeSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, 3000); // Change text every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handlePauseToggle = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <>
      {/* home welcome section */}
      <div className="flex justify-center">
        <div className="w-full px-24 flex flex-col items-start justify-center gap-9 md:flex-col md:px-5">
          <div className="mb-[120px] sm:mb-0 flex flex-1 flex-col items-start gap-14 md:self-stretch sm:gap-7 ">
            <div className="flex flex-col items-start gap-5 self-stretch">
              <Heading
                size="headingxl"
                as="h1"
                className="lg:text-[96px] font-semibold leading-[100%] !text-white_color md:text-[48px] sm:text-[32px]"
              >
                <>
                  Welcome to the
                  <br />
                  Redeemed Christian
                  <br />
                  Church of God.
                </>
              </Heading>
              <Text
                size="textlg"
                as="p"
                className="text-[24px] font-normal md:text-[22px]"
              >
                Rod Of God Parish, Indianapolis Indiana USA.
              </Text>
            </div>
            <Link href="/about-us">
              <Button
                color="gray_400"
                size="xs"
              variant="outline"
              shape="round"
              className="min-w-[196px] rounded-[12px] !border px-[33px] sm:px-5 hover:bg-[#4D88FF] hover:text-white_color hover:border-[#4D88FF] transition-colors"
            >
                Learn more
              </Button>
            </Link>
          </div>
          <div className="flex justify-end w-full">
            <div className="flex flex-col gap-4 self-end rounded-[12px] bg-gray-900_01 p-[18px] sm:w-full w-[302px] md:w-[302px] lg:w-[302px]">
              <div className="flex flex-col items-start gap-2.5 h-[80px]">
                <Text as="p" className="!font-poppins text-[16px] font-normal">
                  {texts[currentIndex].verse}
                </Text>
                <div className="flex flex-col gap-4 self-stretch">
                  <Text
                    size="textxs"
                    as="p"
                    className="!font-poppins text-[14px] font-normal leading-[100%] !text-gray-700_01"
                  >
                    {texts[currentIndex].content}
                  </Text>
                </div>
              </div>
              <div className="mb-1 flex items-center justify-end">
                <button onClick={handlePauseToggle} className="cursor-pointer">
                  {isPaused ? (
                    <Play
                      width={16}
                      height={16}
                      className="h-[16px]"
                      color="white"
                    />
                  ) : (
                    <Pause
                      width={16}
                      height={16}
                      className="h-[16px]"
                      color="white"
                    />
                  )}
                </button>
                <div className="flex w-[28%] justify-center gap-1.5">
                  {texts.map((_, index) => (
                    <div
                      key={index}
                      className={`h-[10px] w-[10px] rounded ${
                        currentIndex === index
                          ? "bg-blue-a400"
                          : "bg-gray-700_7f"
                      }`}
                      onClick={() => handleDotClick(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
