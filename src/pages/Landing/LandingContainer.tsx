import LandingPresenter from "./LandingPresenter";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getEditorials, getTopicList } from "@libs/unsplash";

export async function getStaticProps() {
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
    isError,
    isLoading,
    error,
  } = useQuery<any>("Editorials", getEditorials);

  const {
    data: topics,
    error: topicsError,
    isLoading: topicsLoading,
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
