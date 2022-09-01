import React from "react";
import { Flex, chakra, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getPhoto } from "@libs/unsplash";

interface IPhotoDetail {
  id:string | string[] | undefined
}

 const PhotoDetail:React.FC<IPhotoDetail> = ({id}) => {
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
      width: "100vw",
    },
  });

  const DetailMainLayout = chakra(Flex, {
    baseStyle: {
      width: "80%",
      justifyContent: "start",
      alignItems: "start",
    },
  });

  const RelatedCollectionContainer = chakra(Flex, {
    baseStyle: {
      paddingX: "2%",
      justifyContent: "start",
      alignItems: "center",
    },
  });
  return (
    <PhotoDetailLayout>
      <DetailMainLayout>
       
      </DetailMainLayout>
      <RelatedCollectionContainer></RelatedCollectionContainer>
    </PhotoDetailLayout>
  );
}

export default PhotoDetail