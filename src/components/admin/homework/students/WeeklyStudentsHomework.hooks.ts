import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllUsersHomework } from "@/api/admin";
import { generateAllWeekDates } from "@/hooks/getWeekDate";

const useWeeklyStudentsHomework = () => {
  const weeks = generateAllWeekDates();
  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["admin", "weekly", "homework"],
    queryFn: getAllUsersHomework,
    initialPageParam: "",
    getNextPageParam: (lastPage) =>
      lastPage.length < 5 ? null : lastPage[lastPage.length - 1].uid,
    retry: 1,
  });

  return {
    weeks,
    data,
    isLoading,
    fetchNextPage,
  };
};

export default useWeeklyStudentsHomework;
