import React from "react";
import { Flex, chakra, Text } from "@chakra-ui/react";
import Link from "next/link";
import SearchInput from "./SearchInput";

const HeaderLayout = chakra(Flex, {
  baseStyle: {
    width: "94%",
    height: "9vh",
    paddingY:"1%",
    justifyContent: "center",
    alignItems: "center",
    position: "sticky",
    backgroundColor:"white",
    top:0,
    zIndex:"10"
  },
});

const HomeButton = chakra(Flex, {
  baseStyle: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: "5%",
  },
});

const Header: React.FC = () => {
  return (
    <HeaderLayout>
      <HomeButton>
        <Link href="/">
          <a>
            <Text fontSize={"xl"} fontWeight={"semibold"} as={"i"}>Next Splash</Text>
          </a>
        </Link>
      </HomeButton>
      <SearchInput />
    </HeaderLayout>
  );
};

export default Header;
