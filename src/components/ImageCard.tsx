import React from "react";
import { Image, chakra, Flex } from "@chakra-ui/react";
import LoadingSpinner from "./LoadingSpinner"

interface IImageProps {
  width: number;
  height: number;
  source: string;
  componentWidthRem?: number;
  borderRadius?: string;
}

const CenterBox = chakra(Flex, {
  baseStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const ImageCard: React.FC<IImageProps> = ({
  width,
  height,
  source,
  componentWidthRem = 16,
  borderRadius = "lg",
}) => {
  const ratio = Math.round((height / width) * 100) / 100;
  return (
    <CenterBox
      width={`${componentWidthRem}rem`}
      height={`${componentWidthRem * ratio}rem`}
      borderRadius={borderRadius}
      backgroundColor={"gray.100"}
    >
      <Image
        src={source}
        width={"100%"}
        height={"100%"}
        alt="cannot load image"
        borderRadius={borderRadius}
        display={"inline-block"}
        loading={"lazy"}
        fallback={<LoadingSpinner/>}
      />
    </CenterBox>
  );
};

export default ImageCard;
