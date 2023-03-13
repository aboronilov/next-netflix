import useBillboard from "@/hooks/useBillboard";
import React from "react";
import Spinner from "./Spinner";
import ReactPlayer from "react-player";

import {AiOutlineInfoCircle} from "react-icons/ai"

type Props = {};

const Billboard = (props: Props) => {
  const { data, isLoading } = useBillboard();

  if (isLoading) {
    return (
      <div className="relative pt-64">
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className="relative h-[56.25vw]">
        <ReactPlayer
          url={data?.trailer}
          playing
          loop
          muted
          width="100%"
          height={`56.25vw`}
          style={{ opacity: "60%", objectFit: "cover" }}
        />
        <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
          <p
            className="
                    text-white 
                    text-1xl 
                    md:text-5xl 
                    h-full 
                    w-[50%] 
                    lg:text-6xl 
                    font-bold 
                    drop-shadow-xl z-10
                "
          >
            {data?.name}
          </p>
          <p
            className="
            text-white
            text-[8px]
            md:text-lg
            mt-3
            md:mt-8
            w-[90%]
            md:w-[80%]
            lg:w-[50%]
            drop-shadow-xl
          "
          >
            {data?.description}
          </p>
          <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
            <button
                className="
                    bg-white
                    bg-opacity-30
                    text-white
                    rounded-md
                    py-1 md:py-2
                    px-2 md:px-4
                    w-auto
                    text-xs lg:text-lg
                    font-semibold
                    flex
                    flex-row
                    items-center
                    hover:bg-opacity-20
                    transition
                "
            >
                <AiOutlineInfoCircle className="mr-1"/>
                More Info
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Billboard;
