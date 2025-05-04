import { Text, Img } from "../../components";
import React, { useState, useEffect } from "react";
import { formatTextWithNewlines } from "@/lib/textUtils";

export default function AboutUsSection2() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/about-us/history');
        
        if (!response.ok) {
          throw new Error('Failed to fetch church history data');
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching church history data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // The API returns data based on mapDBToHistorySection structure
  // { heading, content, image }
  let title = data?.heading || "Church history";
  let content = data?.content || `RCCG Rod of God Parish was established in [2009] as part of the Redeemed Christian Church of God (RCCG) network, a global church with millions of members worldwide. From humble beginnings, God has blessed our church to grow into a thriving community of worshippers, committed to the Great Commission.

Through prayer, faith, and dedication, we have expanded our ministries, outreach programs, and impact in Indianapolis and beyond. Today, we continue to build on the vision of holiness, evangelism, and community transformation.`;
  const backgroundImage = data?.image || "/images/img_verse.png";
  
  // Add console logging to debug the data
  console.log('History Section Data:', data);
  
  // Handle escaped newlines
  title = title.replace(/\\n/g, '\n');
  content = content.replace(/\\n/g, '\n');

  return (
    <>
      {/* about us section */}
      <div className="relative mt-[146px] h-[630px] content-center md:mt-24 sm:mt-16 md:h-auto overflow-hidden">
        <div
          className="container-xs flex justify-start md:px-5 border rounded-lg p-6 mx-auto overflow-hidden w-full"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="top-0 my-auto flex h-max w-[48%] flex-col items-start justify-center gap-4 rounded-[20px] bg-gray-100 px-[34px] py-[60px] md:w-[65%] sm:w-full md:py-10 sm:px-5 sm:py-8">
            <Text
              size="textlg"
              as="p"
              className="text-[24px] font-normal !text-charcoal lg:text-[22px] md:text-[20px] sm:text-[18px]"
            >
              {formatTextWithNewlines(title, { noWrapper: true })}
            </Text>
            <Text
              size="textmd"
              as="p"
              className="text-[15px] font-normal leading-normal !text-gray-600_01 sm:text-[14px]"
            >
              {formatTextWithNewlines(content, { noWrapper: true })}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
