import React from "react";
import { MasonryItem } from "@components/Layouts";
import ImageCard from "@components/ImageCard";
import MasonryLayout from "@components/MasonryLayout";
import PopupModal from "@components/PopupModal";
import { chakra, Flex, Text } from "@chakra-ui/react";
import { topicInfoState } from "@libs/recoil-atoms";
import { useSetRecoilState } from "recoil";
import Link from "next/link";
import { useRouter } from "next/router";
import Photo from "../Photo/[id]";

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
    overflowX: "scroll",
    overflowY: "hidden",
  },
});

const TopicContainer = chakra(Flex, {
  baseStyle: {
    flexWrap: "nowrap",
    marginX: "2%",
    minWidth: "10vw",
    height: "80%",
    borderRadius: "lg",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray.200",
  },
});

const LandingPresenter: React.FC<ILandingProps> = ({
  homeFeeds,
  isLoading,
  error,
  topics,
}) => {
  const changeTopic = useSetRecoilState(topicInfoState);
  const router = useRouter();
  const goDiscover = (topicId: string) => {
    changeTopic({ topicId });
  };

  return (
    <MainContainer>
      <PopupModal
        onClose={() => {
          router.push("/");
        }}
      >
        <Photo />
      </PopupModal>

      <NavigationContainer>
        <Text>Editorial</Text>
        <TopicLayout
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {topics?.map((topic: any) => {
            return (
              <Link key={topic.id} href="/Discover">
                <TopicContainer
                  key={topic.id}
                  onClick={() => goDiscover(topic.id)}
                >
                  <Text fontSize={"sm"} textOverflow={"ellipsis"}>
                    {topic.title}
                  </Text>
                </TopicContainer>
              </Link>
            );
          })}
        </TopicLayout>
      </NavigationContainer>
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
