import React from "react";
import { chakra, Flex, Box, Text, Image } from "@chakra-ui/react";
import Link from "next/link";
import { MasonryItem } from "@components/Layouts";
import ImageCard from "@components/ImageCard";
import MasonryLayout from "@components/MasonryLayout";
import PopupModal from "@components/PopupModal";
import { useRouter } from "next/router";
import Photo from "../../Photo/[id]";

interface ICollectionProps {
  isLoading: boolean;
  error: boolean;
  collection: any;
  collectionPhotos: any;
}

const CollectionLayout = chakra(Flex, {
  baseStyle: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "start",
  },
});

const BackgroundContainer = chakra(Box, {
  baseStyle: {
    position: "fixed",
    top: 0,
    width: "100%",
    height: "35vh",
    zIndex: -1,
    opacity: 0.7,
    backgroundPosition: "top",
    backgroundSize: "cover",
    boxShadow: `inset 0px -25vh 15vh 30px  white`,
  },
});

const HeaderContainer = chakra(Flex, {
  baseStyle: {
    flexDirection: "column",
    width: "90%",
    height: "35vh",
    paddingX: "2%",
    paddingY: "3%",
    justifyContent: "center",
    alignItems: "start",
  },
});

const UserContainer = chakra(Flex, {
  baseStyle: {
    width: "40%",
    height: "10vh",
    mt: "1%",
    justifyContent: "start",
    alignItems: "center",
  },
});

const MainContainer = chakra(Flex, {
  baseStyle: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    border: "1px",
    borderColor: "red.400",
  },
});

const CollectionPresenter: React.FC<ICollectionProps> = ({
  isLoading,
  error,
  collection,
  collectionPhotos,
}) => {
  const router = useRouter();
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {collection && (
        <CollectionLayout>
          <PopupModal
            onClose={() => {
              router.push(`/Collection/${collection.id}`);
            }}
          >
            <Photo />
          </PopupModal>
          <BackgroundContainer
            backgroundImage={collection.cover_photo.urls.regular}
          />
          <HeaderContainer>
            <Text
              fontSize={"4xl"}
              fontWeight={"medium"}
              color={"gray.700"}
              casing={"uppercase"}
            >
              {collection.title}
            </Text>
            <UserContainer>
              <Image
                src={`${collection.user.profile_image.medium}`}
                alt="profile"
                width={"3rem"}
                height={"3rem"}
                rounded={"full"}
                boxShadow={"md"}
                mr={4}
              />
              <Text fontSize={"xl"} fontWeight={"medium"} color={"gray.700"}>
                {collection.user.username}
              </Text>
            </UserContainer>
            <Text
              mt={3}
              fontSize={"lg"}
              fontWeight={"semibold"}
              color={"gray.700"}
            >
              {collection.total_photos} Photos
            </Text>
          </HeaderContainer>
          <MainContainer>
            <MasonryLayout>
              {collectionPhotos?.map((photo: any) => {
                return (
                  <Link
                    key={photo.id}
                    href={`/Collection/${collection.id}/?id=${photo.id}`}
                  >
                    <MasonryItem>
                      <ImageCard
                        width={photo.width}
                        height={photo.height}
                        source={photo.urls.regular}
                      />
                    </MasonryItem>
                  </Link>
                );
              })}
            </MasonryLayout>
          </MainContainer>
        </CollectionLayout>
      )}
    </>
  );
};

export default CollectionPresenter;
