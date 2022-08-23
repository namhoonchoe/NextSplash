import React, { useState } from "react";
import {
  Flex,
  chakra,
  Tooltip,
  Fade,
  SlideFade,
  useOutsideClick,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSetRecoilState, useRecoilState } from "recoil";
import { SearchIcon, CloseIcon } from "./SvgIcons";

export default function SearchInput() {
  const [keyword, setKeyword] = useState<string>("");
  /* const [searchTerm, setSearchTerm] = useRecoilState(searchQueryState);
  const redirectionValue = useSetRecoilState(redirectionState); */
  const { pathname } = useRouter();

  const { onOpen, onClose, isOpen } = useDisclosure();

  const onChange = (e: any) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  const SearchLayout = chakra(Flex, {
    baseStyle: {
      width: "60%",
      height: "100%",
      justifyContent: "start",
      alignItems: "center",
      backgroundColor: "gray.300",
      borderRadius: "xl",
      padding: "2%",
      position: "relative",
    },
  });

  const SearchForm = chakra("form", {
    baseStyle: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "center",
      width: "98%",
      height: "100%",
    },
  });

  const InputBox = chakra("input", {
    baseStyle: {
      width: "100%",
      height: "100%",
      backgroundColor: "gray.300",
    },
  });

  const NavigationBox = chakra(Flex, {
    baseStyle: {
      width: "100%",
      height: "12rem",
      flexDirection: "column",
      alignItems: "start",
      justifyContent: "center",
    },
  });

  const CenteredBox = chakra(Flex, {
    baseStyle: {
      width: "100%",
      height: "5rem",
      justifyContent: "center",
      alignItems: "center",
      focus: "outline-none",
    },
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (keyword !== "") {
      //     setSearchTerm({ ...searchTerm, query: keyword });
      setKeyword("");
    } else {
      alert("enter search keyword");
    }
  };

  return (
    <SearchLayout>
      {isOpen ? (
        <Flex
          flexDirection={"column"}
          alignItems={"start"}
          justifyContent={"center"}
          width="100%"
          position={"absolute"}
          top={3}
          left={2}
          right={2}
        >
          <SearchForm onSubmit={onSubmit}>
            <InputBox
              value={keyword}
              onChange={onChange}
              placeholder="Search"
            />
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              onClick={onClose}
            >
              <CloseIcon />
            </Flex>
          </SearchForm>
          <Flex
            flexDirection={"column"}
            justifyContent={"start"}
            width={"98%"}
            height={"10vh"}
            backgroundColor={"green.400"}
            borderRadius={"xl"}
            mt={5}
          >
            <Fade in={isOpen}>
              <Flex>
                <Link href="/Search">
                  <a>search</a>
                </Link>
              </Flex>
              <Flex>
                <Link href="/Discover">
                  <a>discover</a>
                </Link>
              </Flex>
            </Fade>
          </Flex>
        </Flex>
      ) : (
        <SlideFade in={!isOpen}>
          <CenteredBox onClick={onOpen}>
            <SearchIcon />
            <p>Search</p>
          </CenteredBox>
        </SlideFade>
      )}
    </SearchLayout>
  );
}
