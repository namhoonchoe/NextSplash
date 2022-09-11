import React from "react";
import { Flex, chakra, Text, Image } from "@chakra-ui/react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getPhoto } from "@libs/unsplash";
import LoadingSpinner from "@components/LoadingSpinner";
import ImageCard from "./ImageCard";
import { GetServerSideProps } from 'next'

interface IPhotoDetail {
  id: string | string[] | undefined;
}

export const getServerSideProps:GetServerSideProps = async(context) => {
  const { id } = context.query 
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["photo"], () => getPhoto(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const PhotoDetail: React.FC<IPhotoDetail> = ({ id }) => {
  
  const {
    data: photo,
    isError,
    error,
    isLoading,
  } = useQuery<any>("photo", () => getPhoto(id as string));

  const PhotoDetailLayout = chakra(Flex, {
    baseStyle: {
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
      width: "32rem",
      maxHeight: "80vh",
      borderRadius: "md",
      backgroundColor: "white",
      overflowY:"scroll"
    },
  });

  const DetailHeader = chakra(Flex, {
    baseStyle: {
      width: "100%",
      height:"5rem",
      minHeight: "5rem",
      justifyContent: "start",
      alignItems: "center",
      paddingX: "3%",
      paddingY: "1%",
      borderBottom: "1px",
      borderColor: "gray.300",
    },
  });

  const DetailBody = chakra(Flex, {
    baseStyle: {
      width: "100%",
      justifyContent: "start",
      alignItems: "center",
    },
  });

  const DetailFooter = chakra(Flex, {
    baseStyle: {
      width: "100%",
      justifyContent: "start",
      alignItems: "start",
    },
  });
  const warning = error as any;

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <p>Something went wrong: {warning.message}</p>;
  return (
    <>

      {photo && (
        <PhotoDetailLayout
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
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
          <DetailBody>
            <ImageCard
              width={photo.width}
              height={photo.height}
              source={photo.urls.regular}
              componentWidthRem={32}
              borderRadius={"none"}
            />
          </DetailBody>

          <DetailFooter></DetailFooter>
        </PhotoDetailLayout>
      )}
    </>
  );
};

export default PhotoDetail;
