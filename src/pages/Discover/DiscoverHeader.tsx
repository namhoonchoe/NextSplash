import React from "react";
import { useRecoilValue } from "recoil";
import { chakra, Flex } from "@chakra-ui/react";

const HeaderContainer = chakra(Flex, {
  baseStyle: {
    justifyContent: "start",
    alignItems: "start",
    padding:"1%",
    width: "90%",
    height: "20vh",
    border:"2px",
    borderColor: "green.400",
  },
});

export default function DiscoverHeader() {
  return (
    <HeaderContainer>
      <p> this is header</p>
    </HeaderContainer>
  );
}
