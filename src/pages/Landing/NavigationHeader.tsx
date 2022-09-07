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
  Box,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import { topicInfoState } from "@libs/recoil-atoms";

import Link from "next/link";

const HeaderLayout = chakra(Flex, {
  baseStyle: {
    width: "100%",
    height: "10vh",
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
    marginX: "1%",
    minWidth: "10vw",
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

interface INavigationProps {
  topics: Array<any>;
}

const NavigationHeader: React.FC<INavigationProps> = ({ topics }) => {
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
  return (
    <HeaderLayout>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        height={"10vh"}
        width={"10%"}
      >
        <Menu isLazy>
          <>
            <MenuButton
              height={"70%"}
              isActive={isEditorial}
              as={Button}
              rightIcon={<ChevronDownIcon />}
              backgroundColor={"white"}
            >
              <HeaderText fontSize={"xl"}>Discover</HeaderText>
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
};

export default NavigationHeader;
