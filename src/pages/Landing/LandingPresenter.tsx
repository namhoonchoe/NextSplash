import React from "react";
import { MasonryGrid } from "@components/Layouts";
import ImageCard from "@components/ImageCard";
import { chakra, Flex } from "@chakra-ui/react";

interface ILandingProps {
  randomPhotos: any;
  isLoading: boolean;
  error: boolean;
}

const MainContainer = chakra(Flex, {
  baseStyle: {
    alignItems: "center",
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
      <MasonryGrid>
        {randomPhotos?.map((randomPhoto: any) => {
          return (
            <ImageCard
              key={randomPhoto.id}
              width={randomPhoto.width}
              height={randomPhoto.height}
              source={randomPhoto.urls.regular}
            />
          );
        })}
      </MasonryGrid>
    </MainContainer>
  );
};

export default LandingPresenter;
