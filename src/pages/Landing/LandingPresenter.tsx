import React, { useRef } from "react";
import { MasonryItem } from "@components/Layouts";
import ImageCard from "@components/ImageCard";
import MasonryLayout from "@components/MasonryLayout";
import PopupModal from "@components/PopupModal";
import { chakra, Flex, Text, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
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
    width: "100%",
    height: "10vh",
    padding: "1%",
    alignItems: "center",
    justifyContent: "start",
    position: "relative",
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
    zIndex: 10,
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

const ButtonWrapper = chakra(Flex, {
  baseStyle: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "10vh",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});

const SliderButton = chakra(IconButton, {
  baseStyle: {
    color: "gray.700",
    height: "10vh",
    backgroundColor: "white",
    transition: "0.4s",
    zIndex: 30,
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

  const sliderRef = useRef(null) as any;

  const scrollToR = (
    element: any,
    speed: number,
    distance: number,
    step: number
  ) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft -= step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };

  const scrollTol = (
    element: any,
    speed: number,
    distance: number,
    step: number
  ) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };
  return (
    <MainContainer>
      <PopupModal
        onClose={() => {
          router.replace("/");
        }}
      >
        <Photo />
      </PopupModal>

      <NavigationContainer>
        <ButtonWrapper>
          <SliderButton
            aria-label={"To Left"}
            boxShadow={`10px 0px 15px white`}
            icon={<ChevronLeftIcon fontSize={"24px"} fontWeight={"semibold"} />}
            onClick={() => {
              scrollTol(sliderRef.current, 25, 250, -15);
            }}
          />

          <SliderButton
            aria-label={"To right"}
            boxShadow={`-10px 0px 15px white`}
            icon={
              <ChevronRightIcon fontSize={"24px"} fontWeight={"semibold"} />
            }
            onClick={() => {
              scrollToR(sliderRef.current, 25, 250, -15);
            }}
          />
        </ButtonWrapper>
        <TopicLayout
          ref={sliderRef}
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
