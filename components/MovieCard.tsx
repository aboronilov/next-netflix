import { BsFillPlayFill } from "react-icons/bs";
import { AiTwotoneStar } from "react-icons/ai";

type Props = {
  data: Record<string, any>;
};

const MovieCard = ({ data }: Props) => {
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        src={data.poster}
        alt={data.name}
        className="
            cursor-pointer
            object-cover
            transition
            duration
            shadow-xl
            rounded-md
            group-hover:opacity-90
            sm:group-hover:opacity-0
            delay-300
            w-full
            h-[12vw]
        "
      />
      <div
        className="
            opacity-0
            absolute
            top-0
            transition
            duration-200
            z-10
            invisible
            sm:visible
            delay-300
            w-full
            scale-0
            group-hover:scale-110
            group-hover:-translate-y-[6vw]
            group-hover:translate-x-[2vw]
            group-hover:opacity-100
        "
      >
        <img
          src={data.poster}
          alt={data.name}
          className="
                    cursor-pointer
                    object-cover
                    transition
                    duration
                    shadow-xl
                    roubded-t-md
                    w-full
                    h-[12vw]
                "
        />
        <div
          className="
                    z-10
                    bg-zinc-800
                    p-2 lg:p-4
                    absolute
                    w-full
                    transition
                    shadow-md
                    rounded-b-md
                "
        >
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={() => {}}
              className="
                        cursor-pointer
                        w-6 lg:w-10
                        h-6 lg:h-10
                        bg-white
                        rounded-full
                        flex
                        justify-center
                        items-center
                        transition
                        hover:bg-neutral-300
                    "
            >
              <BsFillPlayFill size={30} />
            </div>
          </div>
          <div className="flex flex-col mt-2 gap-2 text-white text-[10px] lg:text-[14px]">
            <div className="flex flex-row items-center justify-between">
              <div className="font-semibold text-blue-400">
                {data.name} ({data.year})
              </div>
              <div className="flex flex-row items-center">
                <span>
                  <AiTwotoneStar className="text-yellow-500 mr-2" />
                </span>{" "}
                {Number(data.rating) / 10}
              </div>
            </div>
            <div className="">{data.description}</div>
            <div>
              <span className="text-blue-300 mr-1">Director: </span>{" "}
              {data.director}
            </div>
            <div className="">
              <span className="text-blue-300 mr-1">Actors: </span> {String(data.actor).replaceAll(",", ", ")}
            </div>
            <div className="">
              <span className="text-blue-300 mr-1">Created: </span> {String(data.creator).replaceAll(",", ", ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;