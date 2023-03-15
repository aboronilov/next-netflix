import { useRouter } from 'next/router';

import { BsFillPlayFill } from "react-icons/bs";


type Props = {
    movieId: string
}

const PlayButton = ({movieId}: Props) => {
    const router = useRouter()
  return (
    <button
        onClick={() => router.push(`/watch/${movieId}`)}
        className="
            bg-white
            rounded-md
            py-1 md:py-2
            px-2 md:px-4
            w-auto
            text-xs lg:text-lg
            font-semibold
            flex 
            first-row
            items-center
            hover:bg-neutral-300
            transition
            cursor-pointer
        "
    >
        <BsFillPlayFill className="mr-1" size={25} />Play 
    </button>
  )
}

export default PlayButton