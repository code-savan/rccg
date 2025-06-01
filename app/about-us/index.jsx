"use client";

import { Text, Img, Button, Heading } from "../../components";
import Header from "../../components/Header";
import UserProfileImage from "../../components/UserProfileImage";
import AboutUsSection from "./AboutUsSection";
import AboutUsSection1 from "./AboutUsSection1";
import AboutUsSection2 from "./AboutUsSection2";
import AboutUsSection3 from "./AboutUsSection3";
import AboutUsSection4 from "./AboutUsSection4";
import Footer from "../../components/Footer";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ImageSlider from "../../components/ImageSlider";
import { usePageLoading } from "../../hooks/usePageLoading";

// Church Ministers state to be fetched from the backend

// NextGen Ministers state to be fetched from the backend

// Department Heads state to be fetched from the backend


export default function AboutUsPage() {
  const [isClient, setIsClient] = useState(false);
  const [ministers, setMinisters] = useState({});
  const [churchMinisters, setChurchMinisters] = useState([]);
  const [departmentHeads, setDepartmentHeads] = useState([]);
  const [nextGenMinisters, setNextGenMinisters] = useState([]);
  const [worshipData, setWorshipData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  usePageLoading();

  // Fetch ministers data
  useEffect(() => {
    const fetchMinisters = async () => {
      try {
        const response = await fetch('/api/about-us/ministers');
        if (!response.ok) {
          throw new Error('Failed to fetch ministers data');
        }
        const result = await response.json();
        // console.log("ministers", result);
        setMinisters(result);
      } catch (err) {
        console.error('Error fetching ministers data:', err);
        setError(err.message);
      }
    };

    const fetchChurchMinisters = async () => {
      try {
        const response = await fetch('/api/about-us/church-ministers');
        if (!response.ok) {
          throw new Error('Failed to fetch church ministers data');
        }
        const result = await response.json();
        // Transform the data to match the format expected by ImageSlider
        const formattedData = (result.churchMinisters || []).map(minister => ({
          src: minister.image,
          alt: minister.name,
          title: minister.name,
          subtitle: minister.role
        }));
        setChurchMinisters(formattedData);
      } catch (err) {
        console.error('Error fetching church ministers data:', err);
        setError(err.message);
      }
    };

    const fetchDepartmentHeads = async () => {
      try {
        const response = await fetch('/api/about-us/department-heads');
        if (!response.ok) {
          throw new Error('Failed to fetch department heads data');
        }
        const result = await response.json();
        // Transform the data to match the format expected by ImageSlider
        const formattedData = (result.departmentHeads || []).map(head => ({
          src: head.image,
          alt: head.name,
          title: head.name,
          subtitle: head.role
        }));
        setDepartmentHeads(formattedData);
      } catch (err) {
        console.error('Error fetching department heads data:', err);
        setError(err.message);
      }
    };

    const fetchNextGenMinisters = async () => {
      try {
        const response = await fetch('/api/about-us/nextgen-ministers');
        if (!response.ok) {
          throw new Error('Failed to fetch NextGen ministers data');
        }
        const result = await response.json();
        console.log("nextgen ministers", result);
        // Transform the data to match the format expected by ImageSlider
        const formattedData = (result.nextGenMinisters || []).map(minister => ({
          src: minister.image,
          alt: minister.name,
          title: minister.name,
          subtitle: minister.role
        }));
        setNextGenMinisters(formattedData);
      } catch (err) {
        console.error('Error fetching NextGen ministers data:', err);
        setError(err.message);
      }
    };

    const fetchWorshipData = async () => {
      try {
        const response = await fetch('/api/about-us/worship-with-us');
        if (!response.ok) {
          throw new Error('Failed to fetch worship with us data');
        }
        const result = await response.json();
        setWorshipData(result);
      } catch (err) {
        console.error('Error fetching worship with us data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch all data when component mounts
    fetchMinisters();
    fetchChurchMinisters();
    fetchDepartmentHeads();
    fetchNextGenMinisters();
    fetchWorshipData();

    setIsClient(true);
  }, []);

  return (
    <div className="w-full bg-white_color">
      <Header className="bg-white_color" />
      <div>
        {/* about us section */}
        <AboutUsSection />

        {/* about us section */}
        <AboutUsSection1 />

        {/* about us section */}
        <AboutUsSection2 />

        <div className="mt-[254px] flex flex-col items-center md:mt-32 sm:mt-24">
          <div className="container-xs flex flex-col items-center px-14 md:px-8 sm:px-5">
            <div className="flex w-[74%] flex-col gap-[62px] md:w-full md:gap-[40px] sm:gap-[31px]">
              <div className="mx-9 flex flex-col items-center gap-[22px] md:mx-0">
                <Heading
                  as="h2"
                  className="text-[40px] font-semibold text-center lg:text-[36px] md:text-[32px] sm:text-[28px]"
                >
                  {ministers.heading}
                </Heading>
                <Text
                  as="p"
                  className="self-stretch text-center !font-poppins text-[16px] font-light leading-[130%] !text-charcoal md:text-[15px] sm:text-[14px]"
                >
                  {ministers.description || "ddd"}
                </Text>
              </div>
              <div className="flex gap-8 self-stretch md:flex-col">
                {ministers.ministers && ministers.ministers.filter(minister => minister.name).map((minister, index) => (
                    <div key={index} className="relative group overflow-hidden rounded-[15px] w-full cursor-pointer">
                      <UserProfileImage
                        userImage={minister.image || "/images/default-minister.png"}
                        className="w-full"
                      />
                      <div
                        className="absolute bottom-0 left-0 w-full h-[30%] bg-[#181818] flex flex-col items-center justify-center
                        translate-y-full group-hover:translate-y-0
                        sm:translate-y-0
                        transition-transform duration-300 ease-in-out"
                      >
                        <p className="text-[20px] text-white_color font-medium">
                          {minister.name}
                        </p>
                        <p className="text-[13.5px] text-white_color">
                          {minister.role}
                        </p>
                      </div>
                    </div>
                ))}
              </div>
              {/* <Link href="/about-us">
              <Button
                size="xs"
                shape="round"
                className="self-center min-w-[196px] rounded-[12px] border border-solid border-gray-400 px-[33px] sm:px-5 hover:bg-[#4D88FF] hover:text-white_color hover:border-[#4D88FF] transition-colors"
              >
                  See all ministers
                </Button>
              </Link> */}
            </div>
          </div>
        </div>

        {/* Display loading state */}
        {isClient && loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Display error state */}
        {isClient && error && (
          <div className="flex justify-center items-center py-10">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          </div>
        )}

        {/* Display content when loaded */}
        {isClient && !loading && !error && (
          <div className="flex flex-col gap-44 md:gap-[132px] sm:gap-[88px] mt-[100px]">
            {/* Church Ministers Section */}
            <div className="flex flex-col gap-16 sm:gap-8">
              <ImageSlider
                images={churchMinisters}
                title={"Church Ministers"}
              />
            </div>

            {/* Department Heads Section */}
            <div className="flex flex-col gap-16 sm:gap-8">
              <ImageSlider
                images={departmentHeads}
                title={"Head of Departments"}
              />
            </div>

            {/* Departments Section */}
            <AboutUsSection4 />

            {/* NextGen Ministry Section */}
            <AboutUsSection3 />

            {/* NextGen Ministers Section */}
            <div className="flex flex-col gap-16 sm:gap-8">
              <ImageSlider
                images={nextGenMinisters}
                title={"Next Gen Ministers"}
              />
            </div>

            {/* Worship With Us Section */}
            <div className="container-xs mt-[196px] px-[30px] md:mt-24 sm:mt-16 md:px-8 sm:px-5">
              <div className="ml-3 flex items-center md:ml-0 md:flex-col md:gap-10">
                <div className="flex w-[38%] flex-col items-start gap-[30px] md:w-full md:items-center">
                  <Text
                    size="text2xl"
                    as="p"
                    className="ml-9 text-center text-[40px] font-normal leading-[100%] !text-charcoal md:ml-0 lg:text-[36px] md:text-[32px] sm:text-[28px]"
                  >
                    {worshipData?.heading ? (
                      <>{worshipData.heading.replace(/\\n/g, '\n')}</>
                    ) : (
                      <>
                        Come worship
                        <br />
                        with us
                      </>
                    )}
                  </Text>
                  <Text
                    as="p"
                    className="text-center text-[16px] font-normal leading-[130%] !text-gray-600_01 md:text-[15px] sm:text-[14px]"
                  >
                    {worshipData?.description ? (
                      <>{worshipData.description.replace(/\\n/g, '\n')}</>
                    ) : (
                      <>
                        Come worship with us every Sunday.
                        <br />
                        We promise you'll be filled with the holy spirit.
                      </>
                    )}
                  </Text>

                  {/* Render buttons from API data if available */}
                  {worshipData?.buttons && Array.isArray(worshipData.buttons) && worshipData.buttons.length > 0 ? (
                    // Map through the buttons array from the API
                    worshipData.buttons.map((button, index) => (
                      <Link
                        key={button.id || index}
                        href={button.link || "https://www.youtube.com/@RCCGRodofGodParish"}
                        className="flex"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="xs"
                          shape="round"
                          className="ml-[74px] min-w-[196px] rounded-[12px] border border-solid border-gray-400 px-[33px] md:ml-0 sm:px-5 hover:bg-[#4D88FF] hover:text-white_color hover:border-[#4D88FF] transition-colors"
                        >
                          {button.text || "Watch Live"}
                        </Button>
                      </Link>
                    ))
                  ) : (
                    <>
                      <Link
                        href="https://www.youtube.com/@RCCGRodofGodParish"
                        className="flex"
                      >
                        <Button
                          size="xs"
                          shape="round"
                          className="ml-[74px] min-w-[196px] rounded-[12px] border border-solid border-gray-400 px-[33px] md:ml-0 sm:px-5 hover:bg-[#4D88FF] hover:text-white_color hover:border-[#4D88FF] transition-colors"
                        >
                          RCCG Live
                        </Button>
                      </Link>
                      <Link
                        href="https://www.youtube.com/@RCCGRodofGodParish"
                        className="flex"
                      >
                        <Button
                          size="xs"
                          shape="round"
                          className="ml-[74px] min-w-[196px] rounded-[12px] border border-solid border-gray-400 px-[29px] md:ml-0 sm:px-5 hover:bg-[#4D88FF] hover:text-white_color hover:border-[#4D88FF] transition-colors"
                        >
                          Next Gen Live
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
                <div
                  className="flex h-[630px] flex-1 items-start justify-center rounded-[20px] bg-cover bg-no-repeat px-14 py-[194px] md:h-auto md:w-full md:py-16 sm:py-12 sm:px-5"
                  style={{ backgroundImage: `url(${worshipData?.image || '/images/img_verse.png'})` }}
                >
                  <div className="mb-3 flex w-[66%] justify-center rounded-[20px] border border-solid border-gray-400 bg-gray-100 px-[38px] py-[66px] md:w-full md:px-6 md:py-10 sm:py-8 sm:px-5">
                    <Text
                      size="textmd"
                      as="p"
                      className="w-full text-[20px] font-normal leading-[130%] !text-charcoal lg:text-[18px] md:text-[16px]"
                    >
                      <span className="text-gray-600_01">
                        {worshipData?.bibleVerse ? (
                          <>{worshipData.bibleVerse.replace(/\\n/g, '\n')}</>
                        ) : (
                          <>
                            For where two or three gather in my
                            <br className="md:hidden" />
                            name, there am I with them."
                            <br />
                          </>
                        )}
                      </span>
                      <span className="text-charcoal">
                        <>
                          <br />
                        </>
                      </span>
                      <span className="font-medium text-charcoal">
                        — {worshipData?.bibleReference || "Matthew 18:20 (NIV)"}
                      </span>
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer moved outside and to the end */}
      <Footer className="mt-[100px]" />
    </div>
  );
}
