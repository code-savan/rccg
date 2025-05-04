import { Text, Heading } from "../../components";
import React, { useEffect, useState } from "react";
import { formatTextWithNewlines } from "@/lib/textUtils";

// Default content for server-side rendering
const defaultContent = {
  title: "THE YEAR OF MY GREATNESS",
  serviceDate: "Sunday Service January 19th, 2025.",
  bibleVerse: "And there shall come forth a rod of out of the stem of Jesse and a branch shall grow out of his roots: And the Spirit of the Lord shall rest upon him, the spirit of wisdom and understanding in the fear of the LORD: and he shall not judge after the sight of his eyes, neither reprove after the hearing of his ears.",
  bibleReference: "Isaiah 11:1-3",
  contactInfo: {
    pastorPhone: "317-418-7388",
    pastorMrsPhone: "317-833-2186",
    generalOverseer: "Pastor E.A Adeboye",
    chairmanRCCGNA: "Pastor J. Fadel",
    hostMinisters: ["Pastor J.K. Balogun", "Pastor F.O. Balogun"]
  },
  backgroundImage: "/images/img_group_250.png"
};

export default function ServicesEventsSection() {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          const response = await fetch('/api/services-events/theme-section');
          
          if (!response.ok) {
            throw new Error('Failed to fetch theme section data');
          }
          
          const result = await response.json();
          setData(result);
        } catch (fetchError) {
          console.log('API not available yet, using default data');
          // Just use default data if API doesn't exist yet
        }
      } catch (err) {
        console.error('Error fetching theme section data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isClient]);
  
  // The API returns data based on mapDBToChurchInfoSection structure
  // { heading, date, bibleVerse, bibleReference, contacts, backgroundImage }
  let title = data?.heading || defaultContent.title;
  let serviceDate = data?.date || defaultContent.serviceDate;
  let bibleVerse = data?.bibleVerse || defaultContent.bibleVerse;
  let bibleReference = data?.bibleReference || defaultContent.bibleReference;
  const contactInfo = data?.contacts || defaultContent.contactInfo;
  const backgroundImage = data?.backgroundImage || defaultContent.backgroundImage;
  
  // Handle escaped newlines
  if (title) title = title.replace(/\\n/g, '\n');
  if (serviceDate) serviceDate = serviceDate.replace(/\\n/g, '\n');
  if (bibleVerse) bibleVerse = bibleVerse.replace(/\\n/g, '\n');
  
  console.log('Church Info Data:', data);
  
  // Handle escaped newlines
  title = title.replace(/\\n/g, '\n');
  serviceDate = serviceDate.replace(/\\n/g, '\n');
  bibleVerse = bibleVerse.replace(/\\n/g, '\n');

  return (
    <>
      {/* services events section */}
      <div className="flex h-[820px] items-center justify-center bg-cover bg-no-repeat py-[88px] md:h-auto md:py-16 sm:py-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="container-xs mt-[26px] flex md:px-5">
          <div className="flex w-[54%] flex-col items-start justify-center gap-4 rounded-[20px] bg-gray-100 px-[34px] py-[42px] md:w-full md:py-8 sm:px-5 sm:py-6">
            <Heading
              size="headingxs"
              as="h2"
              className="text-[24px] font-semibold lg:text-[22px] md:text-[20px] sm:text-[18px]"
            >
              {formatTextWithNewlines(title, { noWrapper: true })}
            </Heading>
            <Text
              size="textmd"
              as="p"
              className="text-[20px] font-normal !text-charcoal lg:text-[18px] md:text-[16px]"
            >
              {formatTextWithNewlines(serviceDate, { noWrapper: true })}
            </Text>
            <div className="flex flex-col items-center gap-[46px] self-stretch md:gap-8 sm:gap-6">
              <Text
                size="textmd"
                as="p"
                className="w-full text-[20px] font-normal leading-6 !text-gray-600_01 lg:text-[18px] md:text-[16px]"
              >
                <span className="text-gray-600_01">
                  {formatTextWithNewlines(bibleVerse, { noWrapper: true })}
                  <br />
                  <br />
                </span>
                <span className="text-gray-900_02">{bibleReference}</span>
              </Text>
              <div className="text-[20px] font-normal leading-6 !text-gray-900_02 flex flex-col gap-2 w-full lg:text-[18px] md:text-[16px]">
                <div className="flex justify-between">
                  <span className="text-gray-700_01">Pastor's Phone:</span>
                  <span className="text-gray-900_02">{contactInfo.pastorPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700_01">Pastor (Mrs) Phone:</span>
                  <span className="text-gray-900_02">{contactInfo.pastorMrsPhone}</span>
                </div>
                <div className="flex justify-between my-3">
                  <span className="text-gray-700_01">General Overseer:</span>
                  <span className="text-gray-900_02">{contactInfo.generalOverseer}</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-700_01">Chairman RCCGNA:</span>
                  <span className="text-gray-900_02">{contactInfo.chairmanRCCGNA}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700_01">Host Ministers:</span>
                  <div className="flex flex-col gap-2">
                    {contactInfo.hostMinisters.map((minister, index) => (
                      <span key={index} className="text-gray-900_02">
                        {minister}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
