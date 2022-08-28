import React from "react";
import { chakra, Flex } from "@chakra-ui/react";
import { MasonryItem } from "@components/Layouts";
import MasonryLayout from "@components/MasonryLayout";
import ImageCard from "@components/ImageCard";
import { Interface } from "readline";

const MainContainer = chakra(Flex, {
  baseStyle: {
    alignItems: "start",
    justifyContent: "center",
    width: "90vw",
  },
});


interface IMainProps {
  topicPhotos:Array<ITopicPhoto>
}

const DiscoverMain:React.FC<IMainProps> = ({topicPhotos}) => {
  

  return (
    <MainContainer>
      <MasonryLayout>
        {topicPhotos?.map((topicPhoto: any) => {
          return (
            <MasonryItem key={topicPhoto.id}>
              <ImageCard
                width={topicPhoto.width}
                height={topicPhoto.height}
                source={topicPhoto.urls.regular}
              />
            </MasonryItem>
          );
        })}
      </MasonryLayout>
    </MainContainer>
  );
}

export default DiscoverMain