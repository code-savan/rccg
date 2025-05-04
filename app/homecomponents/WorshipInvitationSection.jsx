import Link from "next/link";
import { Text, Button } from "../../components";
import React, { useState, useEffect } from "react";
import { formatDisplayText } from "@/lib/homeFormData";

export default function WorshipInvitationSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/home/worship-with-us');
        
        if (!response.ok) {
          throw new Error('Failed to fetch worship section data');
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching worship section data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Default data
  const title = data?.title || "Come worship\nwith us";
  const description = data?.description || "Join us as we celebrate the beginning of forever. With love in their hearts and joy to share, Nina and Chris invite you to witness their journey as they say \"I do.\"";
  const bibleVerse = data?.bibleVerse || "For where two or three gather in my name, there am I with them.";
  const bibleReference = data?.bibleReference || "Matthew 18:20 (NIV)";
  const buttons = data?.buttons || [
    { id: 1, text: "RCCG Live", link: "https://www.youtube.com/@RCCGRodofGodParish" },
    { id: 2, text: "Next Gen Live", link: "https://www.youtube.com/@RCCGRodofGodParish" }
  ];

  // Loading skeleton
  if (loading) {
    return (
      <div className="mt-[274px] flex justify-center self-stretch md:mt-[200px] sm:mt-[150px]">
        <div className="container-xs flex items-center justify-center md:flex-col md:gap-10 md:px-8 sm:px-5">
          <div className="animate-pulse flex w-[42%] flex-col items-center gap-[30px] md:w-full md:px-5">
            <div className="h-16 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-40 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-40"></div>
          </div>
          <div className="animate-pulse flex h-[630px] flex-1 items-center justify-center rounded-[20px] bg-gray-100 md:h-[300px] md:w-full">
            <div className="h-48 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mt-[274px] flex justify-center self-stretch md:mt-[200px] sm:mt-[150px]">
        <div className="container-xs flex items-center justify-center md:px-8 sm:px-5">
          <div className="text-red-500 text-center py-16">
            <h2 className="text-xl font-semibold">Error loading worship section</h2>
            <p>Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* worship invitation section */}
      <div className="mt-[274px] flex justify-center self-stretch md:mt-[200px] sm:mt-[150px]">
        <div className="container-xs flex items-center justify-center md:flex-col md:gap-10 md:px-8 sm:px-5">
          <div className="flex w-[42%] flex-col items-center gap-[30px] md:w-full md:px-5">
            <p className="mx-auto text-center text-[40px] w-full font-normal leading-[110%] !text-charcoal md:ml-0 lg:text-[36px] md:text-[32px] sm:text-[28px]">
              <>
                {title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < title.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </>
            </p>
            <p className="text-center text-[16px] sm:text-[14px] font-normal leading-[130%] !text-gray-600_01">
              {description}
            </p>
            {buttons.map((button, index) => (
              <Link key={index} href={button.link} className="flex" target="_blank" rel="noopener noreferrer">
                <Button
                  size="xs"
                  shape="round"
                  className="min-w-[196px] rounded-[12px] border border-solid border-gray-400 px-[33px] sm:px-5 hover:bg-[#4D88FF] hover:text-white_color hover:border-[#4D88FF] transition-colors"
                >
                  {button.text}
                </Button>
              </Link>
            ))}
          </div>
          <div className="flex h-[630px] flex-1 items-start justify-center rounded-[20px] bg-[url(/images/img_verse.png)] bg-cover bg-no-repeat px-14 py-[194px] md:h-auto md:w-full md:py-16 sm:py-12 sm:px-5">
            <div className="mb-3 flex w-[66%] justify-center rounded-[20px] border border-solid border-gray-400 bg-gray-100 px-[38px] py-[66px] md:w-full md:px-6 md:py-10 sm:py-8 sm:px-5">
              <Text
                size="textmd"
                as="p"
                className="text-[20px] font-normal leading-[130%] !text-charcoal lg:text-[18px] md:text-[16px] sm:text-[15px]"
              >
                <span className="text-gray-600_01">
                  <>
                    {bibleVerse}
                    <br />
                  </>
                </span>
                <span className="text-charcoal">
                  <>
                    <br />
                  </>
                </span>
                <span className="font-medium text-charcoal">
                  — {bibleReference}
                </span>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
