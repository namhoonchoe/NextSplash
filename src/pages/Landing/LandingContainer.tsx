import LandingPresenter from "./LandingPresenter";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getEditorials, getTopicList } from "@libs/unsplash";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["Editorials"], getEditorials);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function LandingContainer() {
  const {
    data: homeFeeds,
    error: feedsError,
    isError,
    isLoading,
  } = useQuery<any>("Editorials", getEditorials);

  const {
    data: topics,
    error: topicsError,
    isError: isTopicsError,
    isLoading: isTopicsLoading,
  } = useQuery<any>("topics", getTopicList);

  return (
    <LandingPresenter
      homeFeeds={homeFeeds}
      feedError={feedsError}
      topics={topics}
      isError={isError}
      isLoading={isLoading}
    />
  );
}
