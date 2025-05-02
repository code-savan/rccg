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

const hcm = [
  {
    src: "img_dsc_9310.png",
    alt: "Pastor Bolanle Sowole",
    title: "Pastor Bolanle Sowole",
    subtitle: "Minister",
  },
  {
    src: "img_dsc_9297.png",
    alt: "Sister Omolade Babalola",
    title: "Sister Omolade Babalola",
    subtitle: "Minister",
  },
  {
    src: "img_dsc_9242.png",
    alt: "Bro Jide Akinsole",
    title: "Bro Jide Akinsole",
    subtitle: "Minister",
  },
  {
    src: "img_dsc_9206.png",
    alt: "Dcn. Emmanuel Onakoya",
    title: "Dcn. Emmanuel Onakoya",
    subtitle: "Minister",
  },
  {
    src: "img_dsc_9251.png",
    alt: "Dcn. Goke Fadeyi",
    title: "Dcn. Goke Fadeyi",
    subtitle: "Minister",
  },
  {
    src: "img_dsc_9350.png",
    alt: "Dcn. Kolade Omodele",
    title: "Dcn. Kolade Omodele",
    subtitle: "Minister",
  },
  {
    src: "img_dsc_9348.png",
    alt: "Pastor Gboyega Akanle",
    title: "Pastor Gboyega Akanle",
    subtitle: "Minister",
  },
  {
    src: "img_dsc_9341.png",
    alt: "PST. Temitope Owoeye",
    title: "PST. Temitope Owoeye",
    subtitle: "Minister",
  },
  {
    src: "img_dsc_9322.png",
    alt: "Dcn Bamidele Ojo",
    title: "Dcn Bamidele Ojo",
    subtitle: "Minister",
  },
  {
    src: "img_dsc_9284.png",
    alt: "Dcn. Adeola Tawede",
    title: "Dcn. Adeola Tawede",
    subtitle: "Minster",
  },
  {
    src: "img_dsc_9277.png",
    alt: "Dcn. Abel Makanjuola",
    title: "Dcn. Abel Makanjuola",
    subtitle: "Minister",
  },
  {
    src: "img_dsc_9268.png",
    alt: "Dr Yemi Ilesanmi",
    title: "Dr Yemi Ilesanmi",
    subtitle: "Minister",
  },
  {
    src: "img_dsc_9256.png",
    alt: "Pastor Dare Sylvester",
    title: "Pastor Dare Sylvester",
    subtitle: "Minister",
  },
  {
    src: "img_dsc_9245.png",
    alt: "Dr. Ayo Oshinnowo",
    title: "Dr. Ayo Oshinnowo",
    subtitle: "Minister",
  },
  {
    src: "img_dsc_9408.png",
    alt: "Bro Soji Toriola",
    title: "Bro Soji Toriola",
    subtitle: "Minister",
  },
  {
    src: "img_dsc_9293.png",
    alt: "Bro Mfon Obot",
    title: "Bro Mfon Obot",
    subtitle: "Minister",
  },
  {
    src: "nhjsdkjd1.jpeg",
    alt: "Pst. Feyisayo Owoeye",
    title: "Pst. Feyisayo Owoeye",
    subtitle: "Minister",
  },
  {
    src: "jsdnjbjhosdh.jpeg",
    alt: "Dcns Eniola Omodele",
    title: "Dcns Eniola Omodele",
    subtitle: "Minister",
  },
  {
    src: "osbhsabjhbasi.jpeg",
    alt: "Dcn Isaac Ademakinwa",
    title: "Dcn Isaac Ademakinwa",
    subtitle: "Minister",
  },
];

const ngm = [
  {
    src: "img_dsc_9404.png",
    alt: "Segun Oladeji",
    title: "Segun Oladeji",
    subtitle: "Next Gen Minister",
  },
  {
    src: "WhatsApp Image 2025-03-06 at 19.50.11_050ee46d.png",
    alt: "Janet Oluwayomi",
    title: "Janet Oluwayomi",
    subtitle: "",
  },
  {
    src: "WhatsApp Image 2025-03-06 at 19.50.12_313e4a70.png",
    alt: "Temitope Ann Aluko",
    title: "Temitope Ann Aluko",
    subtitle: "Next Gen Minister",
  },
  {
    src: "WhatsApp Image 2025-03-06 at 19.50.12_6dc5a47c.png",
    alt: "Susanah Amure",
    title: "Susanah Amure",
    subtitle: "",
  },
];

const hod = [
  {
    src: "img_dsc_9396.png",
    alt: "Oladipupo Baruwa",
    title: "Oladipupo Baruwa",
    subtitle: "HOD Protocol",
  },
  {
    src: "img_dsc_9388.png",
    alt: "Yetunde Ajanaku",
    title: "Yetunde Ajanaku",
    subtitle: "HOD Choir",
  },
  {
    src: "img_dsc_9374.png",
    alt: "Oloyede Amure",
    title: "Oloyede Amure",
    subtitle: "HOD Soccer Team",
  },
  {
    src: "img_dsc_9404.png",
    alt: "Segun Oladeji",
    title: "Segun Oladeji",
    subtitle: "HOD Publication",
  },
  {
    src: "img_dsc_9420.png",
    alt: "David Ayodele",
    title: "David Ayodele",
    subtitle: "HOD Drama",
  },
  {
    src: "img_dsc_9495.png",
    alt: "Pastor(Mrs) F.O Balogun",
    title: "Pastor(Mrs) F.O Balogun",
    subtitle: "HOD Sanctuary",
  },
  {
    src: "img_dsc_9511.png",
    alt: "Bro Ademola Karonwi",
    title: "Bro Ademola Karonwi",
    subtitle: "HOD Children's Dept.",
  },
];

export default function AboutUsPage() {
  const [isClient, setIsClient] = useState(false);
  usePageLoading();

  useEffect(() => {
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
                  Our Ministers
                </Heading>
                <Text
                  as="p"
                  className="self-stretch text-center !font-poppins text-[16px] font-light leading-[130%] !text-charcoal md:text-[15px] sm:text-[14px]"
                >
                  Join us as we celebrate the beginning of forever. With love in
                  their hearts and joy to share, Nina and Chris invite you to
                  witness their journey as they say "I do."
                </Text>
              </div>
              <div className="flex gap-8 self-stretch md:flex-col">
                <div className="relative group overflow-hidden rounded-[15px] w-full cursor-pointer">
                  <UserProfileImage
                    userImage="img_dsc_5797.png"
                    className="w-full"
                  />
                  <div
                    className="absolute bottom-0 left-0 w-full h-[30%] bg-[#181818] flex flex-col items-center justify-center
                    translate-y-full group-hover:translate-y-0
                    sm:translate-y-0
                    transition-transform duration-300 ease-in-out"
                  >
                    <p className="text-[20px] text-white_color font-medium">
                      Pastor J.K Balogun
                    </p>
                    <p className="text-[13.5px] text-white_color">
                      Head Pastor
                    </p>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-[15px] w-full cursor-pointer">
                  <UserProfileImage
                    userImage="img_dsc_9587.png"
                    className="w-full"
                  />
                  <div
                    className="absolute bottom-0 left-0 w-full h-[30%] bg-[#181818] flex flex-col items-center justify-center
                    translate-y-full group-hover:translate-y-0
                    sm:translate-y-0
                    transition-transform duration-300 ease-in-out"
                  >
                    <p className="text-[20px] text-white_color font-medium">
                      Pastor(Mrs) F.O Balogun
                    </p>
                    <p className="text-[13.5px] text-white_color">
                      Head Pastor
                    </p>
                  </div>
                </div>
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

        {isClient && (
          <div className="flex flex-col gap-44 md:gap-[132px] sm:gap-[88px] mt-[100px]">
            <div className="flex flex-col gap-16 sm:gap-8">
              <ImageSlider images={hcm} title={"Church Ministers"} />
            </div>
            <div className="flex flex-col gap-16 sm:gap-8">
              <ImageSlider images={hod} title={"Head of Departments"} />
            </div>
            {/* about us section */}
            <AboutUsSection4 />
            {/* about us section */}
            <AboutUsSection3 />
            <div className="flex flex-col gap-16 sm:gap-8">
              <ImageSlider images={ngm} title={"Next Gen Ministers"} />
            </div>

            <div className="container-xs mt-[196px] px-[30px] md:mt-24 sm:mt-16 md:px-8 sm:px-5">
              <div className="ml-3 flex items-center md:ml-0 md:flex-col md:gap-10">
                <div className="flex w-[38%] flex-col items-start gap-[30px] md:w-full md:items-center">
                  <Text
                    size="text2xl"
                    as="p"
                    className="ml-9 text-center text-[40px] font-normal leading-[100%] !text-charcoal md:ml-0 lg:text-[36px] md:text-[32px] sm:text-[28px]"
                  >
                    <>
                      Come worship
                      <br />
                      with us
                    </>
                  </Text>
                  <Text
                    as="p"
                    className="text-center text-[16px] font-normal leading-[130%] !text-gray-600_01 md:text-[15px] sm:text-[14px]"
                  >
                    <>
                      Come worship with us every Sunday.
                      <br />
                      We promise you'll be filled with the holy spirit.
                    </>
                  </Text>
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
                </div>
                <div className="flex h-[630px] flex-1 items-start justify-center rounded-[20px] bg-[url(/images/img_verse.png)] bg-cover bg-no-repeat px-14 py-[194px] md:h-auto md:w-full md:py-16 sm:py-12 sm:px-5">
                  <div className="mb-3 flex w-[66%] justify-center rounded-[20px] border border-solid border-gray-400 bg-gray-100 px-[38px] py-[66px] md:w-full md:px-6 md:py-10 sm:py-8 sm:px-5">
                    <Text
                      size="textmd"
                      as="p"
                      className="w-full text-[20px] font-normal leading-[130%] !text-charcoal lg:text-[18px] md:text-[16px]"
                    >
                      <span className="text-gray-600_01">
                        <>
                          For where two or three gather in my
                          <br className="md:hidden" />
                          name, there am I with them."
                          <br />
                        </>
                      </span>
                      <span className="text-charcoal">
                        <>
                          <br />
                        </>
                      </span>
                      <span className="font-medium text-charcoal">
                        — Matthew 18:20 (NIV)
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
