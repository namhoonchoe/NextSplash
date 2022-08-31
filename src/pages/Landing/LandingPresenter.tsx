import React from "react";
import { MasonryItem } from "@components/Layouts";
import ImageCard from "@components/ImageCard";
import MasonryLayout from "@components/MasonryLayout";
import { chakra, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { topicInfoState } from "@libs/recoil-atoms"
import { useSetRecoilState } from "recoil";

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

const NavigationContainer = chakra(Flex, {
  baseStyle: {
    width: "80%",
    height: "15vh",
    padding: "1%",
    alignItems: "center",
    justifyContent: "start",
  },
});

const TopicLayout = chakra(Flex, {
  baseStyle: {
    width: "100%",
    height: "10vh",
    alignItems: "center",
    justifyContent: "start",
    overflowX:"scroll",
    overflowY:"hidden"
  },
});

const TopicContainer = chakra(Flex, {
  baseStyle: {
    flexWrap:"nowrap",
    marginX: "2%",
    minWidth:"10vw",
    height:"80%",
    borderRadius: "lg",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"gray.200"
  },
});

const LandingPresenter: React.FC<ILandingProps> = ({
  homeFeeds,
  isLoading,
  error,
  topics,
}) => {
  const router = useRouter();
  const goToDetail = (id: string) => {
    router.push(`/Photo/${id}`);
  };

  const changeTopic = useSetRecoilState(topicInfoState)

  const goDiscover = (topicId:string) => {
    changeTopic({topicId})
    router.push("/Discover")
  }

  return (
    <MainContainer>
      <NavigationContainer>
        <Text>Editorial</Text>
        <TopicLayout sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}>
          {topics?.map((topic: any) => {
            return (
              <TopicContainer key={topic.id} onClick={() => goDiscover(topic.id)}>
                <Text fontSize={"sm"} textOverflow={"ellipsis"}>{topic.title}</Text>
              </TopicContainer>
            )
          })}
        </TopicLayout>
      </NavigationContainer>
      <MasonryLayout>
        {homeFeeds?.map((photo: any) => {
          return (
            <MasonryItem key={photo.id} onClick={() => goToDetail(photo.id)}>
              <ImageCard
                width={photo.width}
                height={photo.height}
                source={photo.urls.regular}
              />
            </MasonryItem>
          );
        })}
      </MasonryLayout>
    </MainContainer>
  );
};

export default LandingPresenter;
