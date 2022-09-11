import LandingPresenter from "./LandingPresenter";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getEditorials } from "@libs/unsplash";

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



  return (
    <LandingPresenter
      homeFeeds={homeFeeds}
      feedError={feedsError}
      isError={isError}
      isLoading={isLoading}
    />
  );
}
