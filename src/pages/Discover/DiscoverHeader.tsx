import React from "react";
import { chakra, Flex, Text  } from "@chakra-ui/react";

const HeaderContainer = chakra(Flex, {
  baseStyle: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    padding: "1%",
    width: "90%",
    height: "20vh",
    border: "2px",
    borderColor: "green.400",
  },
});

interface IHeaderProps {
  topicTitle: string;
  topicDescription: string;
}

const DiscoverHeader: React.FC<IHeaderProps> = ({
  topicTitle,
  topicDescription,
}) => {
  return (
    <HeaderContainer>
      <Text fontSize={'3xl'} fontWeight={"medium"} >{topicTitle}</Text>
      <Flex width={"80%"} height={"10vh"} mt={3} flexDirection={"column"} alignItems={"start"} justifyContent={"start"} >
        <p className="italic text-gray-500	">{topicDescription}</p>
      </Flex>
    </HeaderContainer>
  );
};

export default DiscoverHeader;
