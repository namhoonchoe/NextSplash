import React from "react";
import { chakra, Flex, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton } from "@chakra-ui/react";
import { MasonryItem } from "@components/Layouts";
import MasonryLayout from "@components/MasonryLayout";
import ImageCard from "@components/ImageCard";
import Link from "next/link";
import { useRouter } from "next/router";
import Photo from "../Photo/[id]";

const MainContainer = chakra(Flex, {
  baseStyle: {
    alignItems: "start",
    justifyContent: "center",
    width: "90vw",
  },
});


interface IMainProps {
  topicPhotos:Array<ITopicPhoto>
}

const DiscoverMain:React.FC<IMainProps> = ({topicPhotos}) => {
  const router = useRouter();


  return (
    <MainContainer>
      <Modal
        isOpen={!!router.query.id}
        onClose={() => {
          router.push("/");
        }}
      >
        <ModalOverlay/>
        <Photo />
      </Modal>
      <MasonryLayout>
        {topicPhotos?.map((topicPhoto: any) => {
          return (
            <Link key={topicPhoto.id} href={`/Discover/?id=${topicPhoto.id}`} as={`/Photo/${topicPhoto.id}`} 
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
}

export default DiscoverMain