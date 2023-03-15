import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Movie } from "@/types";

const useRandomAdventure = () => {
  let { data, isLoading, error } = useSWR("/api/movies", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  data as Movie[]
  const filtered = data?.filter((item: Movie) => item.genre.includes("Adventure"))
  const shuffled = filtered?.sort(() => 0.5 - Math.random());
  data = shuffled?.slice(0, 4)

  return {
    data,
    error,
    isLoading,
  };
};

export default useRandomAdventure;
