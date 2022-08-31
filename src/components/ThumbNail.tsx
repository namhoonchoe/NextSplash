import { chakra, Grid, GridItem, Image } from "@chakra-ui/react";
import React from "react";

interface IThumbNailProps {
  sourceOne: string;
  sourceTwo: string;
  sourceThree: string;
}

const ThumbNailContainer = chakra(Grid, {
  baseStyle: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    width: "18rem",
    height: "12rem",
    rounded: "lg",
    shadow: "md",
    justifySelf: "center",
  },
});

const ThumbNails: React.FC<IThumbNailProps> = ({
  sourceOne,
  sourceTwo,
  sourceThree,
}) => {
  return (
    <ThumbNailContainer>
      <GridItem
        rowSpan={2}
        colSpan={2}
        backgroundImage={`url(${sourceOne})`}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        borderColor={"white"}
        borderLeftRadius={"md"}
      />
      <GridItem
        rowSpan={1}
        colSpan={1}
        backgroundImage={`url(${sourceTwo})`}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        borderColor={"white"}
        borderTopRightRadius={"md"}
      />

      <GridItem
        rowSpan={1}
        colSpan={1}
        borderColor={"white"}
        borderBottomRightRadius={"md"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        backgroundImage={`url(${sourceThree})`}
      />
    </ThumbNailContainer>
  );
};

export default ThumbNails;
