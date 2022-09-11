import { useQuery } from "react-query";
import { chakra, Flex, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { searchQueryState } from "@libs/recoil-atoms";
import { searchCollections } from "@libs/unsplash";
import SearchHeader from "../SearchHeader";
import CollectionCard from "@components/CollectionCard";
import { ResponsiveGrid, ColumnLayout } from "@components/Layouts";
import LoadingSpinner from "@components/LoadingSpinner";
import Seo from "@components/Seo";
import Link from "next/link";

const SearchTitle = chakra(Flex, {
  baseStyle: {
    justifyContent: "start",
    alignItems: "center",
    width: "90%",
    height: "8rem",
    padding: "1%",
  },
});

export default function CollectionLayout() {
  const { query } = useRecoilValue(searchQueryState);

  const {
    data: collections,
    error,
    isError,
    isLoading,
  } = useQuery<Array<any>>(["searchCollections", query], () =>
    searchCollections(query)
  );

  const warning = error as any;

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <p>Something went wrong: {warning.message}</p>;

  return (
    <ColumnLayout>
      <Seo title={"Search"} />
      <SearchHeader />
      <SearchTitle>
        <Text
          fontWeight={"semibold"}
          fontSize={"xl"}
          color={"gray.800"}
          casing={"capitalize"}
        >
          Search Results for : {query}
        </Text>
      </SearchTitle>
      {collections && collections?.length > 0 ? (
        <ResponsiveGrid>
          {collections?.map((collection) => {
            return (
              <Link href={`/Collection/${collection.id}`} key={collection.id}>
                <a>
                  <CollectionCard collection={collection} />
                </a>
              </Link>
            );
          })}
        </ResponsiveGrid>
      ) : (
        <Text> No results for: {query}</Text>
      )}
    </ColumnLayout>
  );
}
