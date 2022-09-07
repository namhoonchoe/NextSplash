import React from "react";
import { useQuery } from "react-query";
import { chakra, Flex, Text } from "@chakra-ui/react";
import SearchHeader from "./SearchHeader";
import { searchPhotos } from "@libs/unsplash";
import { searchQueryState } from "@libs/recoil-atoms";
import { useRecoilValue } from "recoil";
import { MasonryItem } from "@components/Layouts";
import MasonryLayout from "@components/MasonryLayout";
import ImageCard from "@components/ImageCard";
import PopupModal from "@components/PopupModal";

import Link from "next/link";
import { useRouter } from "next/router";
import Photo from "../Photo/[id]";

const SearchTitle = chakra(Flex, {
  baseStyle: {
    justifyContent: "start",
    alignItems: "center",
    width: "100%",
    height: "10vh",
    padding: "1%",
  },
});

export default function SearchPhotos() {
  const router = useRouter();

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
      width={"90%"}
    >
      <PopupModal
        onClose={() => {
          router.replace("/Search");
        }}
      >
        <Photo />
      </PopupModal>

      <SearchHeader />
      <SearchTitle>
        <Text
          fontWeight={"semibold"}
          fontSize={"2xl"}
          color={"gray.800"}
          casing={"capitalize"}
        >
          {query}
        </Text>
      </SearchTitle>
      <MasonryLayout>
        {photos?.map((photo: any) => {
          return (
            <Link
              key={photo.id}
              href={`/Search/?id=${photo.id}`}
              as={`/Photo/${photo.id}`}
            >
              <MasonryItem key={photo.id}>
                <ImageCard
                  width={photo.width}
                  height={photo.height}
                  source={photo.urls.regular}
                />
              </MasonryItem>
            </Link>
          );
        })}
      </MasonryLayout>
    </Flex>
  );
}
