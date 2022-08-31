import React from "react";
import type { ReactElement } from "react";
import { useQuery } from "react-query";
import { chakra, Flex, Text } from "@chakra-ui/react";
import SearchHeader from "./SearchHeader";
import { searchPhotos } from "@libs/unsplash";
import { searchQueryState } from "@libs/recoil-atoms";
import { useRecoilValue } from "recoil";
import { MasonryItem } from "@components/Layouts";
import MasonryLayout from "@components/MasonryLayout";
import ImageCard from "@components/ImageCard";

const SearchTitle = chakra(Flex, {
  baseStyle: {
    justifyContent: "start",
    alignItems: "center",
    width: "100%",
    height: "15vh",
  },
});

export default function SearchPhotos() {
  const searchQuery = useRecoilValue(searchQueryState);
  const { query } = searchQuery;
  const {
    data: photos,
    isError,
    isLoading,
  } = useQuery<Array<any>>(["searchPhotos", searchQuery], () =>
    searchPhotos({ ...searchQuery })
  );

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      width={"90vw"}
    >
      <SearchTitle>
        <Text
          fontWeight={"semibold"}
          fontSize={"md"}
          color={"gray.800"}
          casing={"capitalize"}
        >
          {query}
        </Text>
      </SearchTitle>
      <SearchHeader />
      <MasonryLayout>
        {photos?.map((photo: any) => {
          return (
            <MasonryItem key={photo.id}>
              <ImageCard
                width={photo.width}
                height={photo.height}
                source={photo.urls.regular}
              />
            </MasonryItem>
          );
        })}
      </MasonryLayout>
    </Flex>
  );
}

SearchPhotos.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
