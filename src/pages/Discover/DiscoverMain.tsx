import React from "react";
import { chakra, Flex } from "@chakra-ui/react";
import { MasonryItem } from "@components/Layouts";
import MasonryLayout from "@components/MasonryLayout";
import ImageCard from "@components/ImageCard";
import PopupModal from "@components/PopupModal";
import Link from "next/link";
import { useRouter } from "next/router";
import Photo from "../Photo/[id]";
import LoadingSpinner from "@components/LoadingSpinner";

const MainContainer = chakra(Flex, {
  baseStyle: {
    alignItems: "start",
    justifyContent: "center",
    width: "100%",
  },
});

interface IMainProps {
  topicPhotos: Array<ITopicPhoto>;
  isLoading:boolean
  isError:boolean
  error:any
}

const DiscoverMain: React.FC<IMainProps> = ({ topicPhotos,  isLoading,
  isError,
  error, }) => {
  const router = useRouter();
  if (isLoading) return <LoadingSpinner />;

  if (isError) return <p>Something went wrong: {error.message}</p>;
  return (
    <MainContainer>
      <PopupModal
        onClose={() => {
          router.replace("/Discover");
        }}
      >
        <Photo />
      </PopupModal>
      <MasonryLayout>
        {topicPhotos?.map((topicPhoto: any) => {
          return (
            <Link
              key={topicPhoto.id}
              href={`/Discover/?id=${topicPhoto.id}`}
              as={`/Photo/${topicPhoto.id}`}
            >
              <MasonryItem key={topicPhoto.id}>
                <ImageCard
                  width={topicPhoto.width}
                  height={topicPhoto.height}
                  source={topicPhoto.urls.regular}
                />
              </MasonryItem>
            </Link>
          );
        })}
      </MasonryLayout>
    </MainContainer>
  );
};

export default DiscoverMain;
