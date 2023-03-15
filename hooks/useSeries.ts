import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Movie } from "@/types";

const useSeries = () => {
  let { data, isLoading, error } = useSWR("/api/movies", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  data as Movie[]
  const filtered = data?.filter((item: Movie) => item.type === "Series")
  data = filtered

  return {
    data,
    error,
    isLoading,
  };
};

export default useSeries;