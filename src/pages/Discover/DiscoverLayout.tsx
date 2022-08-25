import React from "react";
import DiscoverMain from "./DiscoverMain";
import DiscoverHeader from "./DiscoverHeader";
import DrawerNavigation from "./DrawerNavigation";
import { chakra, Flex,Box } from "@chakra-ui/react";

const LayoutContainer = chakra(Flex, {
  baseStyle: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "start",
  },
});

const DiscoverLayout: React.FC = () => {
  return (
    <LayoutContainer>
      <DiscoverHeader />
      <DiscoverMain />
      <Box position={"fixed"} right={1} top={"50%"}>
        <DrawerNavigation />
      </Box>
    </LayoutContainer>
  );
};

export default DiscoverLayout;
