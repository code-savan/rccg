"use client"
import Link from "next/link";
import { Text, Button } from "../../components";
import React, { useState, useEffect } from "react";
import { formatTextWithNewlines } from "@/lib/textUtils";

export default function GetInvolvedSection2() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/get-involved/qa');

        if (!response.ok) {
          throw new Error('Failed to fetch QA section data');
        }

        const result = await response.json();
        console.log('QA data:', result);
        setData(result);
      } catch (err) {
        console.error('Error fetching QA section data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // The API returns data based on mapDBToQASection structure
  // { heading, description, buttonText, buttonLink, bibleVerseText, bibleVerseReference, bibleVerseBackgroundImage }
  let title = data?.heading || "Q&A and Polls";
  let description = data?.description || "We take questions from our members anonymously and\nanswer them as a community to help them grow.";
  let bibleVerseText = data?.bibleVerseText || '"Carry each other\'s burdens, and in\nthis way you will fulfill the law of\nChrist."';
  let bibleVerseReference = data?.bibleVerseReference || "— Galatians 6:2 (NIV)";
  const bibleVerseBackgroundImage = data?.bibleVerseBackgroundImage || "/images/img_verse_1.png";
  const buttonText = data?.buttonText || "Go to the Q&A";
  const buttonLink = data?.buttonLink || "https://app.sli.do/event/qiPxPF7zvmaw6UxmMY9kMC/live/questions";

  // Handle escaped newlines
  title = title.replace(/\\n/g, '\n');
  description = description.replace(/\\n/g, '\n');
  bibleVerseText = bibleVerseText.replace(/\\n/g, '\n');
  bibleVerseReference = bibleVerseReference.replace(/\\n/g, '\n');

  return (
    <>
      {/* get involved section */}
      <div className="mt-[194px] flex justify-center md:mt-28 sm:mt-20">
        <div className="container-xs flex items-center justify-center md:flex-col-reverse md:px-5">
          <div className="flex w-[42%] flex-col items-start gap-[26px] px-[38px] md:w-full md:items-center md:pt-8 sm:px-5">
            <Text
              size="text2xl"
              as="div"
              className="ml-[76px] text-[40px] font-normal !text-charcoal lg:text-[36px] md:text-[32px] md:ml-0 sm:text-[28px]"
            >
              {title}
            </Text>
            <Text
              as="div"
              className="text-center text-[16px] font-normal leading-[19px] !text-gray-600_01"
            >
              {formatTextWithNewlines(description, { noWrapper: true })}
            </Text>
            <Link href={buttonLink}>
              <Button
                size="xs"
                shape="round"
                className="ml-28 min-w-[196px] rounded-[12px] border border-solid border-gray-400 px-[29px] md:ml-0 sm:px-5 hover:bg-[#4D88FF] hover:text-white_color hover:border-[#4D88FF] transition-colors"
              >
                {buttonText}
              </Button>
            </Link>
          </div>
          <div
            className="flex h-[630px] flex-1 items-center justify-center rounded-[20px] bg-cover bg-no-repeat px-14 py-[200px] md:h-auto md:w-full md:self-stretch md:px-8 md:py-10 sm:px-5"
            style={{ backgroundImage: `url(${bibleVerseBackgroundImage})` }}
          >
            <div className="flex w-[66%] justify-center rounded-[20px] border border-solid border-gray-400 bg-gray-100 px-[42px] py-[52px] md:w-[85%] sm:w-full sm:px-5 sm:py-8">
              <Text
                size="textmd"
                as="div"
                className="w-full text-[20px] font-normal leading-6 !text-charcoal lg:text-[18px] md:text-[16px]"
              >
                <span className="text-gray-600_01">
                  {formatTextWithNewlines(bibleVerseText, { noWrapper: true })}
                </span>
                <span className="text-charcoal">
                  <br />
                </span>
                <span className="font-medium text-charcoal">
                  {bibleVerseReference}
                </span>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
