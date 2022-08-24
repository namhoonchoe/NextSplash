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
import Link from "next/link";
import { useSetRecoilState, useRecoilState } from "recoil";
import { SearchIcon, CloseIcon } from "./SvgIcons";

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

const SearchContainer = chakra(Flex, {
  baseStyle: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    position: "absolute",
    top: 3,
    left: 2,
    right: 2,
  },
});

const SearchIconContainer = chakra(Flex, {
  baseStyle: {
    width: "100%",
    height: "5rem",
    justifyContent: "center",
    alignItems: "center",
    focus: "outline-none",
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

const NavigationContainer = chakra(Flex, {
  baseStyle: {
    width: "100%",
    height: "10vh",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
    borderRadius: "xl",
    mt: 5,
  },
});


export default function SearchInput() {
  const [keyword, setKeyword] = useState<string>("");
  /* const [searchTerm, setSearchTerm] = useRecoilState(searchQueryState);
  const redirectionValue = useSetRecoilState(redirectionState); */

  const { onOpen, onClose, isOpen } = useDisclosure();

  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.currentTarget.value);
  };

  const handleSubmit = (e:React.FormEvent<HTMLInputElement>) => {
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
        <SearchContainer
        >
          <SearchForm onSubmit={() => handleSubmit}>
            <InputBox
              value={keyword}
              onChange={changeHandler}
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
          <NavigationContainer>
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
          </NavigationContainer>
        </SearchContainer>
      ) : (
        <SlideFade in={!isOpen}>
          <SearchIconContainer onClick={onOpen}>
            <SearchIcon />
            <p>Search</p>
          </SearchIconContainer>
        </SlideFade>
      )}
    </SearchLayout>
  );
}
