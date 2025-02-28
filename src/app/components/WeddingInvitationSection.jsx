import { Text } from "../../components";
import React from "react";

export default function WeddingInvitationSection() {
  return (
    <>
      {/* wedding invitation section */}
      <div className="mt-[46px] flex h-[226px] items-center justify-center self-stretch bg-[url(/images/img_group_193.png)] bg-cover bg-no-repeat py-[84px] md:h-auto md:py-5">
        <div className="container-xs flex justify-center px-14 md:px-5">
          <Text
            as="p"
            className="w-[66%] text-center !font-poppins text-[16px] font-light leading-[120%] !text-charcoal"
          >
            Join us as we celebrate the beginning of forever. With love in their hearts and joy to share, Nina and Chris
            invite you to witness their journey as they say “I do.” Let’s make memories to cherish together on this
            special day!
          </Text>
        </div>
      </div>
    </>
  );
}
