import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Movie } from "@/types";

const useFilms = () => {
  let { data, isLoading, error } = useSWR("/api/movies", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  data as Movie[]
  const filtered = data?.filter((item: Movie) => item.type === "Movie")
  data = filtered

  return {
    data,
    error,
    isLoading,
  };
};

export default useFilms;