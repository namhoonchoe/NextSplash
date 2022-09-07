import { useQuery } from "react-query";
import { chakra, Flex, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { searchQueryState } from "@libs/recoil-atoms";
import { searchCollections } from "@libs/unsplash";
import SearchHeader from "../SearchHeader";
import CollectionCard from "@components/CollectionCard";
import { ResponsiveGrid, ColumnLayout } from "@components/Layouts";
import Link from "next/link";

const SearchTitle = chakra(Flex, {
  baseStyle: {
    justifyContent: "start",
    alignItems: "center",
    width: "90%",
    height: "15vh",
    padding: "1%",
  },
});

const PageLayout = chakra(Flex, {
  baseStyle: {
    flexDirection: "column",
    width: "90%",
    alignItems: "start",
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

  if (isLoading) {
    return <p> Loading....</p>;
  }

  if (isError) {
    return <p> An error has Occurred </p>;
  }

  return (
    <ColumnLayout
    
    >
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
    </ColumnLayout>
  );
}
