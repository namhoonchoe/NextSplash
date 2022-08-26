import { chakra, Flex, Box } from '@chakra-ui/react'

export const ScreenLayout = chakra(Flex,{
  baseStyle:{
    width:"100vw",
    flexDirection:"column",
    justifyContent:"start",
    alignItems:"center"
  }
})




export const MasonryItem = chakra(Box, {
  baseStyle: {
    display: "inline-block",
    marginBottom: "3vh",
    breakInside: "avoid",
  },
});