import React from "react";
import { useRecoilValue } from "recoil";
import { chakra, Flex } from "@chakra-ui/react";

const HeaderContainer = chakra(Flex, {
  baseStyle: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    width: "100%",
    height: "10vh",
    borderColor: "green.300",
  },
});

export default function DiscoverHeader() {
  return (
    <HeaderContainer>
      <p> this is header</p>
    </HeaderContainer>
  );
}
