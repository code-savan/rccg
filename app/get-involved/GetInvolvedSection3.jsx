"use client";

import {
  Text,
  Heading,
  Button,
  TextArea,
  Input,
  SelectBox,
  Img,
} from "../../components";
import metadata from "libphonenumber-js/metadata.full.json";
import React, { useState, useEffect } from "react";
import { formatTextWithNewlines } from "@/lib/textUtils";

const dropDownOptions = [
  { label: "CANADA", value: "CANADA" },
  { label: "UNITED STATES", value: "UNITED STATES" },
  { label: "UNITED KINGDOM", value: "UNITED KINGDOM" },
  { label: "NIGERIA", value: "NIGERIA" },
  { label: "AUSTRALIA", value: "AUSTRALIA" },
  { label: "NEW ZEALAND", value: "NEW ZEALAND" },
  { label: "SOUTH AFRICA", value: "SOUTH AFRICA" },
  { label: "GHANA", value: "GHANA" },
];

export default function GetInvolvedSection3() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/get-involved/contact');
        
        if (!response.ok) {
          throw new Error('Failed to fetch contact section data');
        }
        
        const result = await response.json();
        console.log('Contact data:', result);
        setData(result);
      } catch (err) {
        console.error('Error fetching contact section data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const countryOptions = React.useMemo(() => {
    return Object.entries(metadata.countries).map(([code, data]) => {
      const callingCode = `${data[0]}`;

      const display = {
        code,
        callingCode: `+${callingCode}`,
        imgSrc: `https://catamphetamine.github.io/country-flag-icons/3x2/${code}.svg`,
      };

      return {
        value: code,
        label: (
          <>
            <Text as="p" className="text-[16px] font-normal !text-gray-800">
              {display.callingCode}
            </Text>
          </>
        ),
      };
    });
  }, []);

  return (
    <>
      {/* get involved section */}
      <div 
        className="flex min-h-[800px] flex-col justify-center bg-cover bg-center bg-no-repeat py-16 md:py-12 sm:py-10 sm:mt-12 md:mt-20 lg:mt-24"
        style={{ backgroundImage: `url(${data?.backgroundImage || "/images/img_group_138.png"})` }}
      >
        <div className="container-xs md:px-5">
          <div className="flex items-start justify-between lg:flex-row md:flex-col gap-10">
            {/* Contact Form Section - Left side */}
            <div className="flex flex-col items-start gap-6 w-full max-w-[600px] md:max-w-full">
              <div className="flex flex-col items-start gap-2 w-full">
                <Text as="p" className="text-[16px] font-normal text-white">
                  Name
                </Text>
                <Input
                  shape="round"
                  name="name"
                  placeholder="John doe"
                  className="w-full rounded-lg border border-solid border-blue_gray-100_01 px-4 h-[56px]"
                />
              </div>

              <div className="flex w-full gap-6 sm:flex-col">
                <div className="flex basis-1/2 flex-col items-start gap-2 sm:w-full">
                  <Text as="p" className="text-[16px] font-normal text-white">
                    Country
                  </Text>
                  <SelectBox
                    shape="round"
                    indicator={
                      <Img
                        src="img_arrowdown.svg"
                        width={20}
                        height={20}
                        alt="Arrow Down"
                        className="h-[20px] w-[20px]"
                      />
                    }
                    name="country"
                    placeholder="USA"
                    options={dropDownOptions}
                    className="w-full h-[56px] gap-4 rounded-lg border border-solid border-blue_gray-100_01 px-4"
                  />
                </div>
                <div className="flex basis-1/2 flex-col items-start gap-2 sm:w-full">
                  <Text as="p" className="text-[16px] font-normal text-white">
                    Phone
                  </Text>
                  <div className="flex h-[56px] w-full items-center justify-start rounded-lg border border-solid border-blue_gray-100_01 bg-white_color px-3">
                    <SelectBox
                      options={countryOptions}
                      defaultValue={countryOptions.find(
                        (option) => option.value === "US"
                      )}
                      className="max-h-[20px] flex-shrink-0 items-center justify-center bg-transparent"
                    />
                    <input
                      name="edittext"
                      type="tel"
                      placeholder=""
                      className="ml-1.5 flex h-[20px] flex-grow items-center justify-center border-none px-3 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-2 w-full">
                <Text as="p" className="text-[16px] font-normal text-white">
                  Email Address
                </Text>
                <Input
                  shape="round"
                  type="email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                  className="w-full rounded-lg border border-solid border-blue_gray-100_01 px-4 h-[56px]"
                />
              </div>

              <div className="flex flex-col items-start gap-2 w-full">
                <Text as="p" className="text-[16px] font-normal text-white">
                  Message
                </Text>
                <TextArea
                  shape="round"
                  name="form_one"
                  placeholder="Leave a message..."
                  className="w-full rounded-lg !border !border-solid !border-blue_gray-100_01 px-4 py-3 min-h-[160px] text-gray-400_01"
                />
              </div>

              <Button
                color="blue_A400"
                size="md"
                className="mt-2 rounded-[16px] px-10 py-4 bg-[#4D88FF] text-white_color border-none hover:bg-blue-600 transition-colors w-full md:w-full sm:w-full"
              >
                Contact us
              </Button>
            </div>

            {/* Church Address Section - Right side */}
            <div className="flex flex-col items-start gap-4 self-end md:self-center md:mt-8 md:mb-10">
              <Heading
                as="h2"
                className="text-[40px] font-semibold !text-white_color lg:text-[36px] md:text-[32px] sm:text-[28px]"
              >
                The Church Address
              </Heading>
              <Text
                size="textmd"
                as="p"
                className="text-[20px] font-normal text-white md:text-[18px]"
              >
                5350 Allied Blvd, Indianapolis, IN
              </Text>
              <Text
                size="textmd"
                as="p"
                className="text-[20px] font-normal text-white md:text-[18px]"
              >
                Visit and Worship with us.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
