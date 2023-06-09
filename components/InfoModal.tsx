import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import useInfoModal from "@/hooks/useInfoModal";
import FavoriteButton from "./FavoriteButton";
import PlayButton from "./PlayButton";
import useMovie from "@/hooks/useMovie";
import ReactPlayer from "react-player";
import Spinner from "./Spinner";

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);

  const { movieId } = useInfoModal();
  const { data = {}, isLoading } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }
  if (isLoading) {
    return (
      <div className="absolute top-20 left-32">
        <Spinner/>
      </div>
    );
  }
  return (
    <div
      className="
        z-50 
        transition 
        duration-300 
        bg-black 
        bg-opacity-80 
        flex 
        justify-center 
        items-center 
        overflow-x-hidden 
        overflow-y-auto 
        fixed 
        inset-0
    "
    >
      <div
        className="
            relative 
            w-auto 
            mx-auto 
            max-w-3xl 
            rounded-md 
            overflow-hidden
        "
      >
        <div
          className={`
            ${isVisible ? "scale-100" : "scale-0"} 
            transform 
            duration-300 
            relative 
            flex-auto
            bg-zinc-900 
            drop-shadow-md
          `}
        >
          <div className="relative h-96">
            <ReactPlayer
              url={data?.trailer}
              playing
              loop
              muted
              width="768px"
              style={{ opacity: "50%", objectFit: "cover" }}
            />
            <div
              onClick={handleClose}
              className="
                    cursor-pointer
                    absolute
                    top-3
                    right-3
                    h-10
                    w-10
                    rounded-full
                    bg-black
                    bg-opacity-70
                    flex
                    items-center
                    justify-center                    
                "
            >
              <AiOutlineClose className="text-white" size={20} />
            </div>
            <div
              className="
                absolute
                bottom-[10%]
                left-10
            "
            >
              <p className="text-white text-3xl md:text-4xl lg:text-5xl h-full font-bold mb-8">
                {data?.name} ({data?.year})
              </p>
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>
          <div className="px-12 py-8">
            <p className="text-white text-lg mb-2">{data?.description}</p>
            <p className="text-white text-lg">
              <span className="font-semibold mr-1">Rating: </span>
              {Number(data?.rating / 10)}/10
            </p>
            <p className="text-white text-lg">
              <span className="font-semibold mr-1">Director: </span>
              {String(data?.director).replaceAll(",", ", ")}
            </p>
            <p className="text-white text-lg">
              <span className="font-semibold mr-1">Actors: </span>
              {String(data?.actor).replaceAll(",", ", ")}
            </p>
            <p className="text-white text-lg">
              <span className="font-semibold mr-1">Screenplay: </span>
              {String(data?.creator).replaceAll(",", ", ")}
            </p>
            <p className="text-white text-lg">
              <span className="font-semibold mr-1">Genres: </span>
              {String(data?.genre).replaceAll(",", ", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
