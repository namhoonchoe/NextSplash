import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Button,
  Switch,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Select,
} from "@chakra-ui/react";
import { ExpendMoreIcon, TuneIcon } from "@components/SvgIcons";
import { searchQueryState } from "@libs/recoil-atoms";
import { useRecoilState } from "recoil";

interface IColorOption {
  colorName: string;
  colorCode: string;
}

const ColorOption: React.FC<IColorOption> = ({ colorName, colorCode }) => {
  return (
    <Flex
      justify={"start"}
      alignItems={"center"}
      width={"100%"}
      height={"4rem"}
    >
      <Box
        rounded={"full"}
        backgroundColor={colorCode}
        width={4}
        height={4}
        borderColor={"gray.300"}
        marginRight={2}
      />
      <Text fontWeight={"semibold"}>{colorName}</Text>
    </Flex>
  );
};

const SearchFilter = () => {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [orientation, setOrientation] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [relevant, setRelevant] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const checkOrder = () => {
    if (relevant) {
      return "relevant";
    } else {
      return "latest";
    }
  };

  return (
    <Box position={"absolute"} right={3}>
      <IconButton
        aria-label={"Open Modal"}
        colorScheme={"white"}
        size={"sm"}
        variant={"unstyled"}
        onClick={onOpen}
        icon={<TuneIcon width={"30px"} height={"30px"} />}
      />
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"outside"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filters</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"start"}
              width={"100%"}
              marginBottom={4}
            >
              {searchQuery.orientation !== undefined ? (
                <Flex justifyContent={"start"} alignItems={"center"}>
                  <Text fontWeight={"semibold"} mr={1}>
                    Orientation:
                  </Text>

                  <Text fontWeight={"semibold"} casing={"capitalize"}>
                    {searchQuery.orientation}
                  </Text>
                </Flex>
              ) : (
                <Text fontWeight={"semibold"}>Orientation</Text>
              )}
              <Select
                placeholder="Select Orientation"
                onChange={(event) => setOrientation(event.target.value)}
              >
                <option value="landscape">Landscape</option>
                <option value="portrait">Portrait</option>
                <option value="squarish">Squarish</option>
              </Select>
            </Flex>
            <Flex
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"start"}
              width={"100%"}
              marginBottom={4}
            >
              {searchQuery.color !== undefined ? (
                <Flex justifyContent={"start"} alignItems={"center"}>
                  <Text fontWeight={"semibold"} mr={1}>
                    Color:
                  </Text>
                  {color === "black_and_white" ? (
                    <Text fontWeight={"semibold"} casing={"capitalize"}>
                      Black & white
                    </Text>
                  ) : (
                    <Text fontWeight={"semibold"} casing={"capitalize"}>
                      {searchQuery.color}
                    </Text>
                  )}
                </Flex>
              ) : (
                <p className="font-semibold">Color</p>
              )}
              <Menu size={"md"}>
                <MenuButton
                  as={Button}
                  rightIcon={<ExpendMoreIcon />}
                  bgColor={"whiteAlpha.100"}
                >
                  Select Color
                </MenuButton>
                <MenuList overflowY={"scroll"} height={"10rem"}>
                  <MenuOptionGroup
                    onChange={(value) => setColor(value as string)}
                  >
                    <MenuItemOption value="black_and_white">
                      Black & White
                    </MenuItemOption>
                    <MenuItemOption value="black">
                      <ColorOption
                        colorName={"Black"}
                        colorCode={"blackAlpha.900"}
                      />
                    </MenuItemOption>
                    <MenuItemOption value="white">
                      <ColorOption
                        colorName={"White"}
                        colorCode={"whiteAlpha.900"}
                      />
                    </MenuItemOption>

                    <MenuItemOption value="yellow">
                      <ColorOption
                        colorName={"Yellow"}
                        colorCode={"yellow.200"}
                      />
                    </MenuItemOption>
                    <MenuItemOption value="orange">
                      <ColorOption
                        colorName={"orange"}
                        colorCode={"orange.400"}
                      />
                    </MenuItemOption>
                    <MenuItemOption value="red">
                      <ColorOption colorName={"Red"} colorCode={"red.500"} />
                    </MenuItemOption>
                    <MenuItemOption value="purple">
                      <ColorOption
                        colorName={"Purple"}
                        colorCode={"purple.700"}
                      />
                    </MenuItemOption>
                    <MenuItemOption value="magenta">
                      <ColorOption colorName={"Magenta"} colorCode={"pink.300"} />
                    </MenuItemOption>
                    <MenuItemOption value="green">
                      <ColorOption
                        colorName={"Green"}
                        colorCode={"green.500"}
                      />
                    </MenuItemOption>
                    <MenuItemOption value="teal">
                      <ColorOption colorName={"Teal"} colorCode={"teal.500	"} />
                    </MenuItemOption>
                    <MenuItemOption value="blue">
                      <ColorOption colorName={"Blue"} colorCode={"blue.600"} />
                    </MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Flex>
            <Flex justifyContent={"start"} alignItems={"center"} width={"100%"}>
              {relevant ? (
                <Text mr={2}>Order by Relevant</Text>
              ) : (
                <Text mr={2}>Order by Latest</Text>
              )}
              <Switch size="md" onChange={() => setRelevant(!relevant)} />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() =>
                setSearchQuery({
                  ...searchQuery,
                  orientation: orientation,
                  color: color,
                  orderBy: checkOrder(),
                })
              }
            >
              Set Filter
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() =>
                setSearchQuery({
                  ...searchQuery,
                  orientation: undefined,
                  color: undefined,
                  orderBy: undefined,
                })
              }
            >
              Reset Filter
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SearchFilter;
