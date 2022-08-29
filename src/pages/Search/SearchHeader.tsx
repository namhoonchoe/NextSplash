import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import SearchFilter from "./SearchFilter";
import { PhotoIcon, CollectionIcon } from "@components/SvgIcons";

export default function SearchHeader() {
  return (
    <Flex
      padding={"1%"}
      width={"100%"}
      justifyContent={"start"}
      alignItems={"center"}
      position={"relative"}
    >
      <Flex>
        <Link href={"/Search"}>
          <a>
            <Flex
              justifyContent={"start"}
              alignItems={"center"}
              paddingLeft={2}
            >
              <PhotoIcon width={"32px"} height={"32px"} fill={"#9ca3af"} />
              <Text color={"gray.200"} fontWeight={"semibold"} marginLeft={1}>
                Photos
              </Text>
            </Flex>
          </a>
        </Link>
        <Link href={"/Search/Collections"}>
          <Flex
            justifyContent={"start"}
            alignItems={"center"}
            paddingLeft={2}
            marginLeft={2}
          >
            <CollectionIcon width={"32px"} height={"32px"} fill={"#9ca3af"} />
            <Text color={"gray.200"} fontWeight={"semibold"} marginLeft={1}>
              Collections
            </Text>
          </Flex>
        </Link>
      </Flex>
      <SearchFilter />
    </Flex>
  );
}
