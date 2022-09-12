import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { getTopicPhotos, getTopicList, getTopic } from "@libs/unsplash";
import { topicInfoState } from "@libs/recoil-atoms";
import DiscoverMain from "./DiscoverMain";
import DiscoverHeader from "./DiscoverHeader";
import DrawerNavigation from "./DrawerNavigation";
import { chakra, Flex, Box } from "@chakra-ui/react";
import Seo from "@components/Seo";

const LayoutContainer = chakra(Flex, {
  baseStyle: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "start",
  },
});

const DiscoverLayout: React.FC = () => {
  const [topicId, setTopicId] = useState<string>("BJJMtteDJA4");
  const { topicId: selectedId } = useRecoilValue(topicInfoState);

  const {
    data: topicPhotos,
    isError: isPhotosError,
    isLoading: isPhotosLoading,
    error: photosError,
  } = useQuery<Array<ITopicPhoto>>(["topicPhotos", topicId], () => getTopicPhotos(topicId));

  const {
    data: topics,
    error: topicsError,
    isLoading: isTopicsLoading,
    isError: isTopicsError,
  } = useQuery<Array<ITopic>>("topics", getTopicList);

  const {
    data: topic,
    error: aTopicError,
    isLoading: isAtopicLoading,
    isError: isAtopicError,
  } = useQuery<ITopic>(["topic", topicId], () => getTopic(topicId));

  useEffect(() => {
    let mounted = true;

    const checkTopicId = () => {
      if (selectedId !== "") {
        setTopicId(selectedId);
      }
    };

    if (mounted) {
      checkTopicId();
    }

    return () => {
      mounted = false;
    };
  }, [selectedId, topicId]);
  return (
    <LayoutContainer>
      <Seo title={"Discover"} />
      <DiscoverHeader
        topicTitle={topic?.title}
        topicDescription={topic?.description}
        imageUrl={topic?.cover_photo.urls.regular}
        error={aTopicError}
        isError={isAtopicError}
        isLoading={isAtopicLoading}
      />
      <DiscoverMain
        topicPhotos={topicPhotos}
        error={photosError}
        isError={isPhotosError}
        isLoading={isPhotosLoading}
      />
      <Box position={"fixed"} right={1} top={"50%"}>
        <DrawerNavigation
          topics={topics}
          error={topicsError}
          isError={isTopicsError}
          isLoading={isTopicsLoading}
        />
      </Box>
    </LayoutContainer>
  );
};

export default DiscoverLayout;
