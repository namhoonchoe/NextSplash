import { Spinner, Flex } from "@chakra-ui/react"


export default function LoadingSpinner() {
  return (
  <Flex my={32} justifyContent={"center"} alignItems={"center"}>
    <Spinner size="xl" color="blue.500" />
  </Flex>
  )
}