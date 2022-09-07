import React from "react";
import { MasonryItem } from "@components/Layouts";
import ImageCard from "@components/ImageCard";
import MasonryLayout from "@components/MasonryLayout";
import PopupModal from "@components/PopupModal";
import { chakra, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Photo from "../Photo/[id]";
import NavigationHeader from "./NavigationHeader"


interface ILandingProps {
  homeFeeds: any;
  isLoading: boolean;
  error: boolean;
  topics: any;
}

const MainContainer = chakra(Flex, {
  baseStyle: {
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
    width: "90vw",
  },
});


const LandingPresenter: React.FC<ILandingProps> = ({
  homeFeeds,
  isLoading,
  error,
  topics,
}) => {
  const router = useRouter();


  
  return (
    <MainContainer>
      <PopupModal
        onClose={() => {
          router.replace("/");
        }}
      >
        <Photo />
      </PopupModal>
      <NavigationHeader topics={topics}/>
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
