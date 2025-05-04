"use client"
import Link from "next/link";
import { Button, Text } from "../../components";
import React, { useState, useEffect } from "react";
import { formatTextWithNewlines } from "@/lib/textUtils";

export default function GetInvolvedSection1() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/get-involved/donation');

        if (!response.ok) {
          throw new Error('Failed to fetch donation section data');
        }

        const result = await response.json();
        console.log('Donation data:', result);
        setData(result);
      } catch (err) {
        console.error('Error fetching donation section data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // The API returns data based on mapDBToDonationSection structure
  // { heading, description, bibleVerseText, bibleVerseReference, bibleVerseBackgroundImage, buttonText, donationLink }
  let title = data?.heading || "Help the\nchurch grow";
  let description = data?.description || "Giving is an act of worship and a way to make a\ndifference in our community.";
  let bibleVerseText = data?.bibleVerseText || '"Each of you should give what you\nhave decided in your heart to give,\nnot reluctantly or under compulsion,\nfor God loves a cheerful giver."';
  let bibleVerseReference = data?.bibleVerseReference || "— 2 Corinthians 9:7 (NIV)";
  const bibleVerseBackgroundImage = data?.bibleVerseBackgroundImage || "/images/img_verse_630x738.png";
  const buttonText = data?.buttonText || "Give today";
  const donationLink = data?.donationLink || "https://www.givelify.com/donate/redeemed-christian-church-of-god-rccg-rod-of-god-parish-indianapolis-in-2j7wy5NTU0/donation/amount";

  // Handle escaped newlines
  title = title.replace(/\\n/g, '\n');
  description = description.replace(/\\n/g, '\n');
  bibleVerseText = bibleVerseText.replace(/\\n/g, '\n');
  bibleVerseReference = bibleVerseReference.replace(/\\n/g, '\n');

  return (
    <>
      {/* get involved section */}
      <div className="mt-[152px] flex justify-center md:mt-20 sm:mt-14">
        <div className="container-xs flex items-center justify-center md:flex-col md:px-5">
          <div
            className="flex h-[630px] flex-1 items-center justify-center rounded-[20px] bg-cover bg-no-repeat px-14 py-[200px] md:h-auto md:w-full md:self-stretch md:px-8 md:py-10 sm:px-5"
            style={{ backgroundImage: `url(${bibleVerseBackgroundImage})` }}
          >
            <div className="flex w-[66%] justify-center rounded-[20px] border border-solid border-gray-400 bg-gray-100 px-9 py-10 md:w-[85%] sm:w-full sm:px-5 sm:py-6">
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
          <div className="flex w-[42%] flex-col items-center gap-[30px] pl-14 pr-16 lg:pl-10 lg:pr-10 md:w-full md:px-5 md:pt-8">
            <Text
              size="text2xl"
              as="div"
              className="self-stretch text-center text-[40px] font-normal leading-[100%] !text-charcoal lg:text-[36px] md:text-[32px] sm:text-[28px]"
            >
              {formatTextWithNewlines(title, { noWrapper: true })}
            </Text>
            <Text
              as="div"
              className="text-center text-[16px] font-normal leading-[19px] !text-gray-600_01"
            >
              {formatTextWithNewlines(description, { noWrapper: true })}
            </Text>
            <Link href={donationLink}>
              <Button
                size="xs"
                shape="round"
                className="min-w-[196px] rounded-[12px] border border-solid border-gray-400 px-[33px] md:mr-0 sm:px-5 hover:bg-[#4D88FF] hover:text-white_color hover:border-[#4D88FF] transition-colors"
              >
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
