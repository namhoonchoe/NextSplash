import React from "react";
import { MasonryItem } from "@components/Layouts";
import ImageCard from "@components/ImageCard";
import MasonryLayout from "@components/MasonryLayout";
import PopupModal from "@components/PopupModal";
import LoadingSpinner from "@components/LoadingSpinner";
import Seo from "@components/Seo";
import { chakra, Flex } from "@chakra-ui/react";
import Link from "next/link";
import Photo from "../Photo/[id]";
import NavigationHeader from "./NavigationHeader";

interface ILandingProps {
  homeFeeds?: Array<IPhoto>;
  isLoading: boolean;
  isError: boolean;
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
}) => {

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <p>Something went wrong: {feedError.message}</p>;

  return (
    <MainContainer>
      <Seo title={"Home"} />
      <PopupModal>
        <Photo />
      </PopupModal>
      <NavigationHeader />
      <MasonryLayout>
        {homeFeeds?.map((photo: any) => {
          return (
            <Link
              key={photo.id}
              href={`/?id=${photo.id}`}
              as={`/Photo/${photo.id}`}
              scroll={false}
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
