import React from "react";
import { Flex, chakra } from "@chakra-ui/react";
import Link from "next/link";
import SearchInput from "./SearchInput";

const HeaderLayout = chakra(Flex, {
  baseStyle: {
    width: "94%",
    height: "6vh",
    justifyContent: "center",
    alignItems: "center",
    margin: "1%",
    position: "relative",
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
          <a>NextSplash</a>
        </Link>
      </HomeButton>
      <SearchInput />
    </HeaderLayout>
  );
};

export default Header;
