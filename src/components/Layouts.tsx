import { chakra, Flex, Box, Grid } from '@chakra-ui/react'

export const ScreenLayout = chakra(Flex,{
  baseStyle:{
    width:"100vw",
    flexDirection:"column",
    justifyContent:"start",
    alignItems:"center"
  }
})

export const ResponsiveGrid = chakra(Grid,{
  baseStyle:{
    gridTemplateColumns:"repeat(3, 1fr)",
    columnGap:"5vw",
    rowGap:"5vh"
  }
}) 


export const MasonryItem = chakra(Box, {
  baseStyle: {
    display: "inline-block",
    marginBottom: "3vh",
    breakInside: "avoid",
  },
});