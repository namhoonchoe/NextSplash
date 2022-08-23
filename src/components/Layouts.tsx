import { chakra, Flex, Grid } from '@chakra-ui/react'
import React from 'react'

export const ScreenLayout = chakra(Flex,{
  baseStyle:{
    width:"100vw",
    flexDirection:"column",
    justifyContent:"start",
    alignItems:"center"
  }
})
