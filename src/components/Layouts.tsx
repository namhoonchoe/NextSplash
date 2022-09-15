import { chakra, Flex, Box, Grid } from '@chakra-ui/react'

export const CenterBenchMark = chakra(Box,{
  baseStyle:{
    width:"100vw",
    position:"relative"
  }
})

export const ScreenLayout = chakra(Flex,{
  baseStyle:{
    width:"100%",
    flexDirection:"column",
    justifyContent:"start",
    alignItems:"center",
    position:"absolute",
    top:0,
    left:0,
    right:0,
    marginX:"auto",
    overflowX:"hidden"
  }
})

export const ColumnLayout = chakra(Flex,{
  baseStyle:{
    width:"100%",
    maxWidth:"1582px",
    flexDirection:"column",
    justifyContent:"start",
    alignItems:"center",
  }
})


export const ResponsiveGrid = chakra(Grid,{
  baseStyle:{
    width:"90%",
    gridTemplateColumns:"repeat(auto-fill, minmax(18rem, 1fr))",
    columnGap:"2rem",
    rowGap:"2rem",
  }
}) 


export const MasonryItem = chakra(Box, {
  baseStyle: {
    display: "inline-block",
    marginY:"1vw",
    breakInside: "avoid",
    _hover:{filter: "brightness(65%)"}
  },
});