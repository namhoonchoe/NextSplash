import LandingPresenter from "./LandingPresenter";
import { useQuery } from "react-query";
import { getEditorials, getTopicList } from "@libs/unsplash";

export default function LandingContainer() {
  const {
    data: homeFeeds,
    isError,
    isLoading,
  } = useQuery<any>("Editorials", getEditorials,{
    staleTime: 1800 * 1000 
  }) ;

  const {
    data: topics,
    error:topicsError,
    isLoading:topicsLoading,
  } = useQuery<any>("topics", getTopicList);

  return (
    <LandingPresenter
      homeFeeds={homeFeeds}
      topics={topics}
      error={isError}
      isLoading={isLoading}
    />
  );
}
