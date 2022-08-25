import React from 'react'
import { Image, chakra, Flex } from "@chakra-ui/react";

interface IImageProps {
  width:number
  height:number
  source:string
  componentWidth?:string
}

const CenterBox = chakra(Flex, {
  baseStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom:"3vh",
    breakInside:"avoid"
  },
});


const ImageCard:React.FC<IImageProps> = ({ width, height, source ,componentWidth = '16rem'}) =>  {
  const ratio = Math.round((height / width)*100)/100
  return (
    <CenterBox width={componentWidth} height={`${16*ratio}rem`}>
      <Image src={source} width={"100%"}  height={"100%"} alt="cannot load image" borderRadius={"lg"} display={"inline-block"}/>
    </CenterBox>
  )
}

export default ImageCard