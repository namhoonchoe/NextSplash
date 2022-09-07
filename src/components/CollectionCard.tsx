import React from "react";
import { chakra, Flex, Text, Box } from "@chakra-ui/react";
import ThumbNail from "@components/ThumbNail";

const CardLayout = chakra(Flex, {
  baseStyle: {
    flexDirection: "column",
    width: "18rem",
    height: "20rem",
    justifySelf: "center",
  },
});

const InfoContainer = chakra(Flex, {
  baseStyle: {
    width: "100%",
    height: "8rem",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    px: 1,
  },
});

const UserInfo = chakra(Flex, {
  baseStyle: {
    justifyContent: "start",
    alignItems: "center",
    mt: 1,
    color: "gray.600",
  },
});

const TagContainer = chakra(Flex, {
  baseStyle: {
    justifyContent: "start",
    alignItems: "center",
    mt: 1,
  },
});

interface ICollectionCardProp {
  collection:any
}

const CollectionCard: React.FC<ICollectionCardProp> = ({ collection }) => {
  return (
    <CardLayout key={collection.id}>
      <ThumbNail
        sourceOne={collection.preview_photos[0].urls.regular}
        sourceTwo={collection.preview_photos[1].urls.regular}
        sourceThree={collection.preview_photos[2].urls.regular}
      />
      <InfoContainer>
        <Text color={"gray.600"} fontWeight={"semibold"} casing={"capitalize"}>
          {collection.title}
        </Text>
        <UserInfo>
          <Text  fontSize={"sm"}>{collection.total_photos}</Text>
          <Text mx={1} fontSize={"sm"} > Photos</Text>
          <Text mr={1} fontSize={"xs"}>Curated by</Text>
          <Text fontWeight={"semibold"}  fontSize={"sm"}>{collection.user.name}</Text>
        </UserInfo>
        <TagContainer>
          {collection.tags.slice(3).map((tag: any) => {
            return (
              <Box
                key={tag.id}
                rounded={"md"}
                backgroundColor={"gray.300"}
                mr={1}
                px={1}
              >
                <Text fontSize={"sm"} fontWeight={"semibold"} p={1}>
                  {tag.title}
                </Text>
              </Box>
            );
          })}
        </TagContainer>
      </InfoContainer>
    </CardLayout>
  );
};

export default CollectionCard;
