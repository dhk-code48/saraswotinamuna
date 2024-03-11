import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-scroll";
import db from "@/lib/prismadb";

const DonorSlider = async () => {
  const donors = await db.donor.findMany({});

  console.log("donors => ", donors);
  return (
    <div className="rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
      {donors ? <InfiniteMovingCards items={donors} direction="right" speed="slow" /> : <></>}
    </div>
  );
};

export default DonorSlider;
