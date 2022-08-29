import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { getTopicPhotos, getTopicList, getTopic } from "@libs/unsplash";
import { topicInfoState } from "@libs/recoil-atoms";
import DiscoverMain from "./DiscoverMain";
import DiscoverHeader from "./DiscoverHeader";
import DrawerNavigation from "./DrawerNavigation";
import { chakra, Flex, Box } from "@chakra-ui/react";

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
  const { topicId:selectedId }  = useRecoilValue(topicInfoState);

  const {
    data: topicPhotos,
    isError,
    isLoading,
  } = useQuery<any>(["topicPhotos", topicId], () => getTopicPhotos(topicId));

  const {
    data: topics,
    error:topicsError,
    isLoading:topicsLoading,
  } = useQuery<any>("topics", getTopicList);

  const {
    data: topic,
    error:aTopicError,
    isLoading:aTopicLoading,
  } = useQuery<any>(["topic", topicId],() => getTopic(topicId));

  useEffect(() => {
    let mounted = true;

    const checkTopicId = () => {
      if (selectedId !== "" ) {
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
      <DiscoverHeader topicTitle={topic?.title} topicDescription={topic?.description} />
      <DiscoverMain topicPhotos={topicPhotos} />
      <Box position={"fixed"} right={1} top={"50%"}>
        <DrawerNavigation topics={topics} />
      </Box>
    </LayoutContainer>
  );
};

export default DiscoverLayout;
