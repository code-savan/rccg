import Link from "next/link";
import { Text, Button, Heading } from "../../components";
import UserProfile from "../../components/UserProfile";
import React, { Suspense } from "react";

const serviceDepartmentGrid = [
  {
    userImage: "img_pexels_cottonbro_7520369.png",
    userTitle: "Choir",
    userDescription: (
      <>
        Our Choir leads the congregation in heartfelt worship, creating an
        atmosphere where God’s presence is felt through spirit-filled songs and
        praise.
      </>
    ),
  },
  {
    userImage: "img_dsc_9200.png",
    userTitle: "Sunday School",
    userDescription: (
      <>
        Sunday School is a time of deep biblical teaching, helping believers
        grow in faith, understanding, and practical Christian living.
      </>
    ),
  },
  {
    userImage: "img_dsc_9539.png",
    userTitle: "Welfare",
    userDescription: (
      <>
        The Welfare Department extends God’s love through acts of kindness,
        providing support and care to those in need within the church and
        community.
      </>
    ),
  },
  {
    userImage: "img_pexels_kawerodr.png",
    userTitle: "Ushering",
    userDescription: (
      <>
        Our Ushers ensure a warm and welcoming worship experience by assisting
        with seating, orderliness, and ensuring a smooth flow during services.
      </>
    ),
  },
  {
    userImage: "img_dsc_9519.png",
    userTitle: "Sound & Media",
    userDescription: (
      <>
        The Sound & Media team enhances worship by managing audio, visuals, and
        live streaming, ensuring every message is delivered with clarity and
        excellence.
      </>
    ),
  },
  {
    userImage: "img_dsc_9552.png",
    userTitle: "Special Duties",
    userDescription: (
      <>
        The Special Duties team provides essential support for church programs,
        coordinating logistics and ensuring smooth event execution.
      </>
    ),
  },
  {
    userImage: "img_dsc_9435.png",
    userTitle: "Children and Media",
    userDescription: (
      <>
        Our Children’s Ministry nurtures young hearts in the faith, while the
        Media team creatively shares God’s message through digital platforms.
      </>
    ),
  },
  {
    userImage: "img_dsc_9221.png",
    userTitle: "Accounting",
    userDescription: (
      <>
        The Accounting team ensures transparency and stewardship in managing
        church finances, handling tithes, offerings, and budgets with integrity.
      </>
    ),
  },
  {
    userImage: "img_dsc_9484.png",
    userTitle: "Transportation",
    userDescription: (
      <>
        The Transportation team ensures that members and visitors can attend
        services and events with ease, providing reliable transport solutions.
      </>
    ),
  },
  {
    userImage: "img_kevin_wright_4s_482x630.png",
    userTitle: "Sanctuary Keeper & Beautifiers",
    userDescription: (
      <>
        This team maintains the cleanliness and beauty of God’s house, creating
        a welcoming and reverent environment for worship.
      </>
    ),
  },
];

export default function AboutUsSection4() {
  return (
    <>
      {/* about us section */}
      <div className="mt-[146px] flex flex-col items-center md:mt-24 sm:mt-16">
        <div className="container-xs flex flex-col items-center px-14 md:px-8 sm:px-5">
          <div className="flex w-[66%] flex-col items-center gap-[22px] md:w-full">
            <Heading
              as="h2"
              className="text-[40px] font-semibold text-center lg:text-[36px] md:text-[32px] sm:text-[28px]"
            >
              OUR DEPARTMENTS
            </Heading>
            <Text
              as="p"
              className="self-stretch text-center !font-poppins text-[16px] font-light leading-[130%] !text-charcoal md:text-[15px] sm:text-[14px]"
            >
              <>
                At RCCG Rod of God Parish, our various departments serve to
                strengthen the church and community. There’s a place for
                everyone to serve, grow, and make an impact!
              </>
            </Text>
          </div>
        </div>
        <div className="mt-[146px] grid w-[88%] grid-cols-2 justify-center gap-[26px] gap-y-[146px] md:mt-20 sm:mt-16 md:grid-cols-1 md:gap-y-[90px] sm:gap-y-[70px]">
          <Suspense fallback={<div>Loading feed...</div>}>
            {serviceDepartmentGrid.map((d, index) => (
              <UserProfile {...d} key={"aboutUs" + index} className="w-full" />
            ))}
          </Suspense>
        </div>
      </div>
    </>
  );
}
