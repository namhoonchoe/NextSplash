import React, { useEffect } from "react";
import { chakra, Flex, Text } from "@chakra-ui/react";
import SearchHeader from "./SearchHeader";
import { searchQueryState } from "@libs/recoil-atoms";
import { useRecoilValue } from "recoil";

const SearchTitle = chakra(Flex, {
  baseStyle: {
    justifyContent: "start",
    alignItems: "center",
    width: "100%",
    height: "15vh",
  },
});

const SearchPhotos = () => {
  const { query } = useRecoilValue(searchQueryState);
 
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      width={"90vw"}
    >
      <SearchTitle>
        <Text
          fontWeight={"semibold"}
          fontSize={"md"}
          color={"gray.800"}
          casing={"capitalize"}
        >
          {query}
        </Text>
      </SearchTitle>
      <SearchHeader />
      <section className="w-full h-screen border-2"></section>
    </Flex>
  );
};

export default SearchPhotos;
