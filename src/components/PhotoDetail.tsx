import React from "react";
import { Flex, chakra, Text, Image } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getPhoto } from "@libs/unsplash";
import ImageCard from "./ImageCard";

interface IPhotoDetail {
  id: string | string[] | undefined;
}

const PhotoDetail: React.FC<IPhotoDetail> = ({ id }) => {
  const {
    data: photo,
    isError,
    isLoading,
  } = useQuery<any>("photo", () => getPhoto(id as string));

  const PhotoDetailLayout = chakra(Flex, {
    baseStyle: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "start",
      width: "32rem",
      borderRadius: "md",
      backgroundColor: "white",
    },
  });

  const DetailHeader = chakra(Flex, {
    baseStyle: {
      width: "100%",
      height: "10vh",
      justifyContent: "start",
      alignItems: "center",
      paddingX: "3%",
      borderBottom: "1px",
      borderColor: "gray.300",
    },
  });

  const DetailFooter = chakra(Flex, {
    baseStyle: {
      width: "100%",
      justifyContent: "start",
      alignItems: "start",
    },
  });

  return (
    <>
      {isLoading && <p>Loading....</p>}

      {photo && (
        <PhotoDetailLayout>
          <DetailHeader>
            <Image
              src={`${photo.user.profile_image.medium}`}
              alt="Profile Image"
              rounded={"full"}
              width={"3rem"}
              height={"3rem"}
              mr={3}
              boxShadow={"md"}
            />
            <Text fontWeight={"semi-bold"} fontSize={"md"}>
              {photo.user.name}
            </Text>
          </DetailHeader>
          <ImageCard
            width={photo.width}
            height={photo.height}
            source={photo.urls.regular}
            componentWidthRem={32}
            borderRadius={"none"}
          />
          <DetailFooter></DetailFooter>
        </PhotoDetailLayout>
      )}
    </>
  );
};

export default PhotoDetail;
