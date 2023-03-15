import useMovie from "@/hooks/useFile";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ReactPlayer from "react-player";

type Props = {};

const WatchMovie = (props: Props) => {
  const router = useRouter();
  const { movieId } = router.query;
  const { data } = useMovie(movieId as string);
  return (
    <div className="h-screen w-screen bg-black">
      <nav
        className="
            fixed
            w-full
            p-4
            z-10
            flex
            flex-row
            items-center
            gap-8
            bg-black/70
        "
      >
        <AiOutlineArrowLeft
          onClick={() => router.back()}
          className="text-white cursor-pointer"
          size={40}
        />
        <p className="text-white text-xl md:text-3xl font-bold">
          <span className="font-light mr-1">Watching:</span>
          {data?.name}
        </p>
      </nav>
      <ReactPlayer
        url={data?.trailer}
        width="100%"
        height="100%"
        playing
        controls
      />
    </div>
  );
};

export default WatchMovie;
