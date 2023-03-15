import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Movie } from "@/types";

const useTrending = () => {
  let { data, isLoading, error } = useSWR("/api/movies", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  data as Movie[]
  const filtered = data?.filter((item: Movie) => Number(item.year) >= 2022 )
  data = filtered

  return {
    data,
    error,
    isLoading,
  };
};

export default useTrending;