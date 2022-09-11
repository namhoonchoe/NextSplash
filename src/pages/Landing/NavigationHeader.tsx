import React, { useState, useRef } from "react";
import {
  chakra,
  Flex,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Fade,
  Button,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getTopicList } from "@libs/unsplash";
import LoadingSpinner from "@components/LoadingSpinner";
import { useSetRecoilState } from "recoil";
import { topicInfoState } from "@libs/recoil-atoms";
import Link from "next/link";

const HeaderLayout = chakra(Flex, {
  baseStyle: {
    width: "90%",
    maxWidth: "1428px",
    height: "8rem",
    alignItems: "center",
    justifyContent: "start",
  },
});

const HeaderText = chakra(Text, {
  baseStyle: {
    fontSize: "md",
    fontWeight: "semibold",
    color: "gray.700",
  },
});

const NavigationContainer = chakra(Flex, {
  baseStyle: {
    width: "80vw",
    maxWidth: "1280px",
    height: "8rem",
    padding: "1%",
    alignItems: "center",
    justifyContent: "start",
    position: "relative",
  },
});

const TopicLayout = chakra(Flex, {
  baseStyle: {
    width: "100%",
    height: "5rem",
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
    marginX: "1%",
    minWidth: "8rem",
    height: "80%",
    borderRadius: "xl",
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
    height: "8rem",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});

const SliderButton = chakra(IconButton, {
  baseStyle: {
    color: "gray.700",
    height: "5rem",
    backgroundColor: "white",
    transition: "0.4s",
    zIndex: 30,
  },
});

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["topics"], getTopicList);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function NavigationHeader() {
  const {
    data: topics,
    error: error,
    isError: isError,
    isLoading: isLoading,
  } = useQuery<any>("topics", getTopicList);

  const sliderRef = useRef(null) as any;
  const [isEditorial, setIsEditorial] = useState<boolean>(true);
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
  const changeTopic = useSetRecoilState(topicInfoState);

  const goDiscover = (topicId: string) => {
    changeTopic({ topicId });
  };
  const warning = error as any;

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Something went wrong: {warning.message}</p>;

  return (
    <HeaderLayout>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        height={"5rem"}
        width={"10%"}
      >
        <Menu isLazy>
          <>
            <MenuButton
              size={"xl"}
              isActive={isEditorial}
              as={Button}
              rightIcon={<ChevronDownIcon />}
              backgroundColor={"white"}
            >
              <HeaderText fontSize={"xl"} p={1}>
                Discover
              </HeaderText>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setIsEditorial(true)}>
                <HeaderText>Editorial</HeaderText>
              </MenuItem>
              <MenuItem onClick={() => setIsEditorial(false)}>
                <HeaderText>Themes</HeaderText>
              </MenuItem>
            </MenuList>
          </>
        </Menu>
      </Flex>
      <Fade in={!isEditorial}>
        <NavigationContainer>
          <ButtonWrapper>
            <SliderButton
              aria-label={"To Left"}
              boxShadow={`10px 0px 15px white`}
              icon={
                <ChevronLeftIcon fontSize={"24px"} fontWeight={"semibold"} />
              }
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
      </Fade>
    </HeaderLayout>
  );
}
