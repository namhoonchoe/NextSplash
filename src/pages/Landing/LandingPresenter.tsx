import React from "react";
import { MasonryItem } from "@components/Layouts";
import ImageCard from "@components/ImageCard";
import MasonryLayout from "@components/MasonryLayout";
import PopupModal from "@components/PopupModal";
import LoadingSpinner from "@components/LoadingSpinner";
import Seo from "@components/Seo"
import { chakra, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Photo from "../Photo/[id]";
import NavigationHeader from "./NavigationHeader";

interface ILandingProps {
  homeFeeds: any;
  isLoading: boolean;
  isError: boolean;
  topics: any;
  feedError?: any;
}

const MainContainer = chakra(Flex, {
  baseStyle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    width: "100%",
  },
});

const LandingPresenter: React.FC<ILandingProps> = ({
  homeFeeds,
  isLoading,
  isError,
  feedError,
  topics,
}) => {
  const router = useRouter();

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <p>Something went wrong: {feedError.message}</p>;

  return (
    <MainContainer>
      <Seo title={"Home"}/>
      <PopupModal
        onClose={() => {
          router.replace("/");
        }}
      >
        <Photo />
      </PopupModal>
      <NavigationHeader topics={topics} />
      <MasonryLayout>
        {homeFeeds?.map((photo: any) => {
          return (
            <Link
              key={photo.id}
              href={`/?id=${photo.id}`}
              as={`/Photo/${photo.id}`}
            >
              <MasonryItem>
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
    </MainContainer>
  );
};

export default LandingPresenter;
