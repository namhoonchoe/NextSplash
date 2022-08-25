import React, { useEffect, useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Button,
  useDisclosure,
  chakra,
  Grid,
  Flex,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { ArrowIcon } from "@components/SvgIcons";
import { getTopicList } from "@libs/unsplash";

interface ITopicCardProps {
  topicTitle: string;
  topicDescription: string;
  imageUrl?: string;
  topicId: string;
  changeTopicInfo?: any;
}

const TopicCardContainer = chakra(Flex, {
  baseStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: "12vw",
    height: "16vh",
    borderRadius: "lg",
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    backgroundSize: "cover",
  },
});

const TopicTitleContainer = chakra(Flex, {
  baseStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    rounded: "lg",
    backdropFilter:"brightness(0.75)",
    _hover:{
      backdropFilter:"brightness(1)"
    }
  },
});

const TopicCardGrid = chakra(Grid, {
  baseStyle: {
    width: "100%",
    gridTemplateColumns:"repeat(2, 1fr)",
    justifyContent:"center",
    rowGap:"2vh",
    columnGap:"1vw"
  },
});

const TopicCard: React.FC<ITopicCardProps> = ({ topicTitle, imageUrl }) => {
  return (
    <TopicCardContainer backgroundImage={`url(${imageUrl})`} >
      <TopicTitleContainer>
        <Text color={"white"} fontWeight={"semibold"} fontSize={"md"}> {topicTitle}</Text>
      </TopicTitleContainer>
    </TopicCardContainer>
  );
};

const DrawerNavigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef() as any;

  const {
    data: topics,
    error,
    isLoading,
  } = useQuery<any>("topics", getTopicList);

  return (
    <>
      <IconButton
        aria-label="Open Drawer"
        colorScheme="white"
        size="sm"
        variant="unstyled"
        onClick={onOpen}
        icon={<ArrowIcon />}
      />

      <Drawer
        isOpen={isOpen}
        size={"sm"}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Featured Topics</DrawerHeader>
          <DrawerBody>
            <TopicCardGrid >
              {topics?.map((topic: ITopic) => {
                return (
                  <TopicCard
                    key={topic.id}
                    topicDescription={topic.description}
                    topicTitle={topic.title}
                    topicId={topic.id}
                    //changeTopicInfo={changeTopicInfo}
                    imageUrl={topic.cover_photo.urls.regular}
                  />
                );
              })}
            </TopicCardGrid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerNavigation;
