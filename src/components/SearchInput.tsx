import React, { useState, useEffect } from "react";
import {
  Flex,
  chakra,
  Fade,
  SlideFade,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { searchQueryState } from '@libs/recoil-atoms'
import { useRouter } from "next/router";
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
    height: "4rem",
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


export default function SearchInput() {
  const [keyword, setKeyword] = useState<string>("");
  const [searchTerm, setSearchTerm] = useRecoilState(searchQueryState);
  const [redirect, setRedirect] = useState<boolean>(false)
  const router = useRouter()
  const { onOpen, onClose, isOpen } = useDisclosure();

  const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.currentTarget.value);
  };

  const redirectHandler = () => {
    setSearchTerm({ ...searchTerm, query: keyword });
    setKeyword("");
    setRedirect(true)
  }

  
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (keyword !== "") {
      redirectHandler()
    } else {
      alert("enter search keyword");
    }
  };

  useEffect(() => {
    if(redirect){
      router.replace("./Search")
    }
    
    return () => {
      setRedirect(false)
    }
  }, [redirect])
  


  return (
    <SearchLayout>
      {isOpen ? (
        <SearchContainer
        >
          <SearchForm onSubmit={handleSubmit}>
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
