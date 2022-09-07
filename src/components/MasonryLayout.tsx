import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";

type childComponent = {
  children: React.ReactNode;
};

const MasonryLayout: React.FC<childComponent> = ({ children }) => {
  const [columnCount, setColumnCount] = useState<number>(0);
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");
  const [isLargerThan640] = useMediaQuery("(min-width:  640px)");
  
  useEffect(() => {
    const checkColumns = () => {
      if (isLargerThan1280) {
        setColumnCount(5);
      } 
      if (isLargerThan1024 && isLargerThan1280 === false ) {
        setColumnCount(4);
      }
      if (isLargerThan640 && isLargerThan1024 === false && isLargerThan1280 === false) {
        setColumnCount(3);
      }
    };

    window.addEventListener("resize", checkColumns);

    return () => {
      window.removeEventListener("resize", checkColumns);
      console.log(columnCount);
    };
  }, [columnCount,isLargerThan1280,isLargerThan1024,isLargerThan640]);

  useEffect(() => {
    const checkInitialCount = () => {
      if (isLargerThan1280) {
        setColumnCount(5);
      } 
      if (isLargerThan1024 && isLargerThan1280 === false ) {
        setColumnCount(4);
      }
      if (isLargerThan640 && isLargerThan1024 === false && isLargerThan1280 === false) {
        setColumnCount(3);
      }
    };

    let mounted = true;

    if (mounted) {
      checkInitialCount();
    }

    return () => {
      mounted = false;
      console.log(columnCount);
    };
  }, [columnCount,isLargerThan1280,isLargerThan1024,isLargerThan640]);

 

  return (
    <Box
      marginX={"auto"}
      padding={4}
      width={"100%"}
      sx={{ columnCount: columnCount, columnGap: "2%" }}
    >
      {children}
    </Box>
  );
};

export default MasonryLayout;
