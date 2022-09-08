import React, { useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  useDisclosure,
  chakra,
  Grid,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ArrowIcon } from "@components/SvgIcons";
import { useSetRecoilState } from "recoil";
import { topicInfoState } from "@libs/recoil-atoms";
import LoadingSpinner from "@components/LoadingSpinner";

interface ITopicCardProps {
  topicTitle: string;
  topicDescription: string;
  imageUrl?: string;
  topicId: string;
  changeTopic?: any;
}

interface NavigationProps {
  topics: Array<ITopic>;
  isLoading: boolean;
  isError: boolean;
  error: any;
}

const TopicCardContainer = chakra(Flex, {
  baseStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: "12rem",
    height: "8rem",
    borderRadius: "lg",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
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
    backdropFilter: "brightness(0.75)",
    _hover: {
      backdropFilter: "brightness(1)",
    },
  },
});

const TopicCardGrid = chakra(Grid, {
  baseStyle: {
    width: "100%",
    gridTemplateColumns: "repeat(2, 1fr)",
    justifyContent: "center",
    rowGap: "1rem",
    columnGap: "1rem",
  },
});

const TopicCard: React.FC<ITopicCardProps> = ({
  topicTitle,
  imageUrl,
  topicId,
  changeTopic,
}) => {
  return (
    <TopicCardContainer
      backgroundImage={`url(${imageUrl})`}
      onClick={() =>
        changeTopic({
          topicId,
        })
      }
    >
      <TopicTitleContainer>
        <Text color={"white"} fontWeight={"semibold"} fontSize={"md"}>
          {topicTitle}
        </Text>
      </TopicTitleContainer>
    </TopicCardContainer>
  );
};

const DrawerNavigation: React.FC<NavigationProps> = ({
  topics,
  isLoading,
  isError,
  error,
}) => {
  const changeTopic = useSetRecoilState(topicInfoState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef() as any;
  if (isLoading) return <LoadingSpinner />;

  if (isError) return <p>Something went wrong: {error.message}</p>;
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
            <TopicCardGrid>
              {topics?.map((topic: ITopic) => {
                return (
                  <TopicCard
                    key={topic.id}
                    topicDescription={topic.description}
                    topicTitle={topic.title}
                    topicId={topic.id}
                    changeTopic={changeTopic}
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
