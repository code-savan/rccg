import { Img, Text, Heading } from "../../components";
import React from "react";

export default function AboutUsSection3() {
  return (
    <>
      {/* about us section */}
      <div className="mt-[100px] flex flex-col items-center gap-[182px] md:mt-32 sm:mt-24 md:gap-[136px] sm:gap-[91px]">
        <div className="container-xs flex flex-col items-center px-14 md:px-8 sm:px-5">
          <div className="flex w-[66%] flex-col items-center gap-[22px] md:w-full">
            <Heading
              as="h2"
              className="text-[40px] font-semibold text-center lg:text-[36px] md:text-[32px] sm:text-[28px]"
            >
              THE NEXT GEN MINISTRY
            </Heading>
            <Text
              as="p"
              className="self-stretch text-center !font-poppins text-[16px] font-light leading-[130%] !text-charcoal md:text-[15px] sm:text-[14px]"
            >
              At RCCG Rod of God Parish, our Youth Church is a vibrant community
              where young people grow in faith, purpose, and fellowship. Join us
              and be part of a movement for God!
            </Text>
          </div>
        </div>
        <Img
          src="H13.jpeg"
          width={1440}
          height={1052}
          alt="NextGen Ministry"
          className="h-[1052px] w-full object-cover md:h-auto"
        />
      </div>
    </>
  );
}
