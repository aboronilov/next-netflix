import useBillboard from "@/hooks/useBillboard";
import React, { useCallback } from "react";
import Spinner from "./Spinner";
import ReactPlayer from "react-player";

import { AiOutlineInfoCircle } from "react-icons/ai";
import { AiTwotoneStar } from "react-icons/ai";
import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";

type Props = {};

const Billboard = (props: Props) => {
  const { data, isLoading } = useBillboard();
  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

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
          style={{ opacity: "50%", objectFit: "cover" }}
        />
        <div className="absolute top-[20%] lg:top-[30%] ml-4 md:ml-16">
          <p
            className="
                    text-white 
                    text-base md:text-2xl 
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
            text-[10px] md:text-base
            mt-3 md:mt-5
            w-[90%] md:w-[80%] lg:w-[70%]
            drop-shadow-xl
          "
          >
            {data?.description}
          </p>
          <p
            className="
            text-white
            text-[10px] md:text-base
            mt-3 md:mt-5
            w-[90%] md:w-[80%] lg:w-[70%]
            drop-shadow-xl
          "
          >
            <span className="font-semibold mr-3">Rating: </span>
            {Number(data?.rating / 10)}/10
          </p>
          <p
            className="
            text-white
            text-[10px] md:text-base
            mt-1 md:mt-2
            w-[90%] md:w-[80%] lg:w-[70%]
            drop-shadow-xl
          "
          >
            <span className="font-semibold mr-3">Director: </span>
            {String(data?.director).replaceAll(",", ", ")}
          </p>
          <p
            className="
            text-white
            text-[10px] md:text-base
            mt-1 md:mt-2
            w-[90%] md:w-[80%] lg:w-[70%]
            drop-shadow-xl
          "
          >
            <span className="font-semibold mr-3">Actors: </span>
            {String(data?.actor).replaceAll(",", ", ")}
          </p>
          <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
            <PlayButton movieId={data?.id} />
            <button
              onClick={handleOpenModal}
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
              <AiOutlineInfoCircle className="mr-1" />
              More Info
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Billboard;
