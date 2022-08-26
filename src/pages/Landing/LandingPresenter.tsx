import React from "react";
import { MasonryItem } from "@components/Layouts";
import ImageCard from "@components/ImageCard";
import MasonryLayout from "@components/MasonryLayout";
import { chakra, Flex } from "@chakra-ui/react";

interface ILandingProps {
  randomPhotos: any;
  isLoading: boolean;
  error: boolean;
}

const MainContainer = chakra(Flex, {
  baseStyle: {
    alignItems: "start",
    justifyContent: "center",
    width: "90vw",
  },
});

const LandingPresenter: React.FC<ILandingProps> = ({
  randomPhotos,
  isLoading,
  error,
}) => {
  return (
    <MainContainer>
      <MasonryLayout>
        {randomPhotos?.map((randomPhoto: any) => {
          return (
            <MasonryItem key={randomPhoto.id}>
              <ImageCard
                width={randomPhoto.width}
                height={randomPhoto.height}
                source={randomPhoto.urls.regular}
              />
            </MasonryItem>
          );
        })}
      </MasonryLayout>
    </MainContainer>
  );
};

export default LandingPresenter;
