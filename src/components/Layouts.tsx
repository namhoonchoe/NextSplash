import { chakra, Flex, Grid } from '@chakra-ui/react'

export const ScreenLayout = chakra(Flex,{
  baseStyle:{
    width:"100vw",
    flexDirection:"column",
    justifyContent:"start",
    alignItems:"center"
  }
})

export const MasonryGrid = chakra(Grid,{
  baseStyle:{
    width:"100%",
    gridTemplateColumns:"repeat(auto-fill, 16rem)",
    gridTemplateRows:"masonry",
    columnGap:"6",
    rowGap:"6",
    justifyItems:"center",
    alignItems:"start"
  }
})