import React, { useState, useEffect } from "react";
import { Container, useMediaQuery } from "@chakra-ui/react";

type childComponent = {
  children: React.ReactNode;
};

const MasonryLayout: React.FC<childComponent> = ({ children }) => {
  const [columnCount, setColumnCount] = useState<number>(0);
  const [isLargerThan1440] = useMediaQuery("(min-width: 1440px)");
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");
  const [isLargerThan640] = useMediaQuery("(min-width:  640px)");

  useEffect(() => {
    const checkColumns = () => {
      if (isLargerThan1440) {
        setColumnCount(5);
      }
      if (isLargerThan1024 && isLargerThan1440 === false) {
        setColumnCount(4);
      }
      if (
        isLargerThan640 &&
        isLargerThan1024 === false &&
        isLargerThan1440 === false
      ) {
        setColumnCount(3);
      }
    };

    window.addEventListener("resize", checkColumns);

    return () => {
      window.removeEventListener("resize", checkColumns);
    };
  }, [columnCount, isLargerThan1440, isLargerThan1024, isLargerThan640]);

  useEffect(() => {
    const checkInitialCount = () => {
      if (isLargerThan1440) {
        setColumnCount(5);
      }
      if (isLargerThan1024 && isLargerThan1440 === false) {
        setColumnCount(4);
      }
      if (
        isLargerThan640 &&
        isLargerThan1024 === false &&
        isLargerThan1440 === false
      ) {
        setColumnCount(3);
      }
    };

    let mounted = true;

    if (mounted) {
      checkInitialCount();
    }

    return () => {
      mounted = false;
    };
  }, [columnCount, isLargerThan1440, isLargerThan1024, isLargerThan640]);

  return (
    <Container
      width={"90%"}
      maxWidth={"1582px"}
      sx={{ columnCount: columnCount, columnGap: "0.5vw" }}
      textAlign={"center"}
    >
      {children}
    </Container>
  );
};

export default MasonryLayout;
