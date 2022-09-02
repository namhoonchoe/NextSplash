import type { ReactElement } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { chakra, Flex, Text, Box } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { searchQueryState } from "@libs/recoil-atoms";
import { searchCollections } from "@libs/unsplash";
import SearchHeader from "../SearchHeader";
import ThumbNail from "@components/ThumbNail";
import { ResponsiveGrid } from "@components/Layouts";

const SearchTitle = chakra(Flex, {
  baseStyle: {
    justifyContent: "start",
    alignItems: "center",
    width: "100%",
    height: "15vh",
    padding:"1%"

  },
});

export default function CollectionLayout() {
  const { query } = useRecoilValue(searchQueryState);
  const router = useRouter();
  const goToDetail = (id:string) => {
    router.push(`/Collection/${id}`);
  };

  const {
    data: collections,
    isError,
    isLoading,
  } = useQuery<Array<any>>(["searchCollections", query], () =>
    searchCollections(query)
  );
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      width={"90vw"}
    >
     
      <SearchHeader />
      <SearchTitle>
        <Text
          fontWeight={"semibold"}
          fontSize={"2xl"}
          color={"gray.800"}
          casing={"capitalize"}
        >
          {query}
        </Text>
      </SearchTitle>
      <ResponsiveGrid>
        {collections?.map((collection) => {
          return (
            <Flex
              flexDirection={"column"}
              width={"20rem"}
              height={"18rem"}
              justifySelf={"center"}
              key={collection.id}
              onClick={() => goToDetail(collection.id)}
            >
              <ThumbNail
                sourceOne={collection.preview_photos[0].urls.regular}
                sourceTwo={collection.preview_photos[1].urls.regular}
                sourceThree={collection.preview_photos[2].urls.regular}
              />
              <Flex
                width={"100%"}
                height={"8rem"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"start"}
                px={1}
              >
                <Text
                  color={"gray.600"}
                  fontWeight={"semibold"}
                  casing={"capitalize"}
                >
                  {collection.title}
                </Text>
                <Flex
                  justifyContent={"start"}
                  alignItems={"center"}
                  mt={1}
                  color={"gray.600"}
                >
                  <p>{collection.total_photos}</p>
                  <p className="mx-1"> Photos</p>
                  <p className="mr-1 text-xs">Curated by</p>
                  <p className=" font-semibold">{collection.user.name}</p>
                </Flex>
                <Flex
                  justifyContent={"start"}
                  alignItems={"center"}
                  mt={1}>
                  {collection.tags.slice(3).map((tag:any) => {
                    return (
                      <Box
                        key={tag.id}
                        rounded={"md"}
                        backgroundColor={"gray.300"}
                        mr={1}
                        px={1}
                      >
                        <Text fontSize={"sm"} p={1}>
                          {tag.title}
                        </Text>
                      </Box>
                    );
                  })}
                </Flex>
              </Flex>
            </Flex>
          );
        })}
      </ResponsiveGrid>
    </Flex>
  );
}
