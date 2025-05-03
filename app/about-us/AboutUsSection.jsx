import { Text, Heading } from "../../components";
import React from "react";

export default function AboutUsSection() {
  return (
    <>
      {/* about us section */}
      <div className="flex h-[670px] items-start justify-center bg-[url(/images/aboutushero.png)] bg-cover bg-no-repeat py-[168px] md:h-auto md:py-16 sm:py-12">
        <div className="container-xs mb-[148px] flex justify-center md:mb-16 sm:mb-10 md:px-5">
          <div className="flex w-full flex-col items-start gap-5 lg:px-24 md:px-12 sm:px-5">
            <Heading
              size="headinglg"
              as="h1"
              className="text-[64px] font-semibold leading-[100%] !text-white_color lg:text-[56px] md:text-[48px] sm:text-[36px] xs:text-[30px]"
            >
              <>
                There's a home for <br className="sm:hidden " />
                everyone in christ.
              </>
            </Heading>
            <Text
              size="textlg"
              as="p"
              className="text-[24px] font-normal lg:text-[22px] md:text-[20px] sm:text-[18px]"
            >
              At RCCG Rod of God Parish, we accept everyone.
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
