import { chakra, Flex, Box, Grid } from '@chakra-ui/react'

export const ScreenLayout = chakra(Flex,{
  baseStyle:{
    width:"100vw",
    flexDirection:"column",
    justifyContent:"start",
    alignItems:"center",
    position:"relative"
  }
})

export const ResponsiveGrid = chakra(Grid,{
  baseStyle:{
    width:"100%",
    gridTemplateColumns:"repeat(auto-fill, minmax(20rem, 1fr))",
    columnGap:"2%",
    rowGap:"2%",

  }
}) 


export const MasonryItem = chakra(Box, {
  baseStyle: {
    display: "inline-block",
    marginBottom: "3vh",
    breakInside: "avoid",
  },
});