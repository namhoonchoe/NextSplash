import React from "react";
import { chakra, Flex, Text, Box } from "@chakra-ui/react";
import DOMPurify from "isomorphic-dompurify";
import LoadingSpinner from "@components/LoadingSpinner";

const HeaderLayout = chakra(Flex, {
  baseStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: "1%",
    width: "100vw",
    height: "50vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },
});

const HeaderBackGround = chakra(Box, {
  baseStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "50vh",
    backdropFilter:"brightness(0.75)",
  },
});

const HeaderContainer = chakra(Flex, {
  baseStyle: {
    flexDirection: "column",
    justifyContent: "end",
    alignItems: "start",
    padding: "1%",
    width: "90%",
    height: "40vh",
    color: "white",
    zIndex:10
  },
});

interface IHeaderProps {
  topicTitle: string;
  topicDescription: string;
  imageUrl: string;
  isLoading:boolean
  isError:boolean
  error:any
}

const DiscoverHeader: React.FC<IHeaderProps> = ({
  topicTitle,
  topicDescription,
  imageUrl,
  isLoading,
  isError,
  error,
}) => {
  const markup = () => {
    return { __html: DOMPurify.sanitize(topicDescription) };
  };
  if (isLoading) return <LoadingSpinner />;

  if (isError) return <p>Something went wrong: {error.message}</p>;
  return (
    <HeaderLayout backgroundImage={`url(${imageUrl})`}>
      <HeaderBackGround/>
      <HeaderContainer>
        <Text fontSize={"3xl"} fontWeight={"semibold"}>
          {topicTitle}
        </Text>
        <Flex
          width={"50%"}
          height={"10vh"}
          mt={3}
          flexDirection={"column"}
          alignItems={"start"}
          justifyContent={"start"}
        >
          <div dangerouslySetInnerHTML={markup()} />
        </Flex>
      </HeaderContainer>
    </HeaderLayout>
  );
};

export default DiscoverHeader;
