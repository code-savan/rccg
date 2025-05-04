import { Text } from "../../components";
import React, { useState, useEffect } from "react";
import { formatTextWithNewlines } from "@/lib/textUtils";

export default function AboutUsSection1() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/about-us/about-text');

        if (!response.ok) {
          throw new Error('Failed to fetch about text data');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching about text data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // The API returns data based on mapDBToAboutTextSection structure
  // { heading, content }
  let title = data?.heading || "ABOUT OUR CHURCH";
  let content = data?.content || `RCCG ROG is a Bible-based, evangelistic, Spirit-empowered
  church.
  At RCCG ROG, we're all about people, because God is all about
  people.

  One of the ways we express our love for Him is through our love
  for people,
  and we do this by helping people who come to RCCG ROG to grow in
  their
  relationship with the Lord.

  Want to get started? We'd love for you to join us for a
  service, and we're
  here to help you get connected.`;

  // Add console logging to debug the data
  console.log('About Text Section Data:', data);
  
  // Handle escaped newlines
  content = content.replace(/\\n/g, '\n');

  return (
    <>
      {/* about us section */}
      <div className="overflow-hidden">
        <div className="flex justify-center bg-gray-900_02 py-[226px] md:py-32 sm:py-20 w-full">
          <div className="container-xs flex justify-center px-14 md:px-8 sm:px-5 w-full">
            <Text
              size="textlg"
              as="p"
              className="text-center !font-poppins font-normal leading-[130%] text-[16px] text-gray-400"
            >
              {formatTextWithNewlines(content, { noWrapper: true })}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
