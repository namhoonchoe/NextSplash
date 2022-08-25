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
    width: "80%",
    height: "50%",
    borderRadius: "lg",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
});

const TopicTitleContainer = chakra(Flex, {
  baseStyle: {
    width: "100%",
    height: "100%",
    rounded: "lg",
    backdropBrightness: "75%",
    _hover: { backdropBrightness: "100%" },
  },
});

const TopicCardGrid = chakra(SimpleGrid, {
  baseStyle: {
    width: "100%",
    columns: 2,
    spacingX: "40px",
    spacingY: "20px",
  },
});

const TopicCard: React.FC<ITopicCardProps> = ({ topicTitle, imageUrl }) => {
  return (
    <TopicCardContainer backgroundImage={`url(${imageUrl})`}>
      <TopicTitleContainer>
        <Text> {topicTitle}</Text>
      </TopicTitleContainer>
    </TopicCardContainer>
  );
};

const DrawerNavigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef() as any;

  const {
    data:response,
    error,
    isLoading,
  } = useQuery<any>("topics", getTopicList);

  useEffect(() => {
    console.log(response);
  }, []);



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
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Featured Topics</DrawerHeader>
          <DrawerBody>
            <>
            {/*  {topics !== null && (
                <TopicCardGrid>
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
                )} */}
            </>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerNavigation;
