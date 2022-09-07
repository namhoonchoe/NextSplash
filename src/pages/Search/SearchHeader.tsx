import React from "react";
import { Flex, Text, Fade } from "@chakra-ui/react";
import Link from "next/link";
import SearchFilter from "./SearchFilter";
import { PhotoIcon, CollectionIcon } from "@components/SvgIcons";
import { useRouter } from "next/router";

export default function SearchHeader() {
  const { pathname } = useRouter();

  return (
    <Flex
      padding={"1%"}
      width={"90%"}
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
              {pathname.includes("Collection") ? (
                <PhotoIcon width={"32px"} height={"32px"} fill={"#9ca3af"} />
              ) : (
                <PhotoIcon width={"32px"} height={"32px"} fill={"#4A5568"} />
              )}
              {pathname.includes("Collection") ? (
                <Text color={"gray.200"} fontWeight={"semibold"} marginLeft={1}>
                  Photos
                </Text>
              ) : (
                <Text color={"gray.700"} fontWeight={"semibold"} marginLeft={1}>
                  Photos
                </Text>
              )}
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
            {pathname.includes("Collection") ? (
              <CollectionIcon width={"32px"} height={"32px"} fill={"#4A5568"} />
            ) : (
              <CollectionIcon width={"32px"} height={"32px"} fill={"#9ca3af"} />
            )}
            {pathname.includes("Collection") ? (
              <Text color={"gray.700"} fontWeight={"semibold"} marginLeft={1}>
                Collections
              </Text>
            ) : (
              <Text color={"gray.200"} fontWeight={"semibold"} marginLeft={1}>
                Collections
              </Text>
            )}
          </Flex>
        </Link>
      </Flex>
      <Fade in={!pathname.includes("Collection")}>
        <SearchFilter />
      </Fade>
    </Flex>
  );
}
