import React from "react";
import { useQuery } from "react-query";
import { chakra, Flex, Text } from "@chakra-ui/react";
import SearchHeader from "./SearchHeader";
import { searchPhotos } from "@libs/unsplash";
import { searchQueryState } from "@libs/recoil-atoms";
import { useRecoilValue } from "recoil";
import { MasonryItem, ColumnLayout } from "@components/Layouts";
import MasonryLayout from "@components/MasonryLayout";
import ImageCard from "@components/ImageCard";
import PopupModal from "@components/PopupModal";
import LoadingSpinner from "@components/LoadingSpinner";
import Seo from "@components/Seo";
import Link from "next/link";
import { useRouter } from "next/router";
import Photo from "../Photo/[id]";

const SearchTitle = chakra(Flex, {
  baseStyle: {
    justifyContent: "start",
    alignItems: "center",
    width: "90%",
    height: "8rem",
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
    error,
  } = useQuery<Array<ISearchPhoto>>(["searchPhotos", searchQuery], () =>
    searchPhotos({ ...searchQuery })
  );
  const warning = error as any;

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <p>Something went wrong: {warning.message}</p>;

  return (
    <ColumnLayout>
      <Seo title={"Search"} />
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
          fontSize={"xl"}
          color={"gray.800"}
          casing={"capitalize"}
        >
          Search Results for : {query}
        </Text>
      </SearchTitle>
      {photos && photos?.length > 0 ? (
        <MasonryLayout>
          {photos?.map((photo: any) => {
            return (
              <Link
                key={photo.id}
                href={`/Search/?id=${photo.id}`}
                as={`/Photo/${photo.id}`}
                scroll={false}
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
      ) : (
        <Text> No results for: {query}</Text>
      )}
    </ColumnLayout>
  );
}
