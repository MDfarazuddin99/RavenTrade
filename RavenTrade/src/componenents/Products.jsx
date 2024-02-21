import { Flex, Box, Heading, SimpleGrid, Button } from "@chakra-ui/react";

import ProductCard from "./ProductCard";

import { NavLink, useNavigate } from "react-router-dom";


const Products = () => {
  const navigateTo = useNavigate();
  const handleClick = (newPath) => {
    console.log("button pressed");
    navigateTo(newPath);
  };
  return (
    <Flex
      flexDirection={"column"}
      minH="100vh"
      justifyContent={"center"}
      alignItems={"center"}
      pb={10}
      bg="gray.50"
    >
      <Heading pt={10}>My Products</Heading>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} px={10}>
        {/* Replace the following with your card components */}

        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </SimpleGrid>
      <Button colorScheme="blue" onClick={()=>handleClick('/additem')}>Add Item</Button>
    </Flex>
  );
};

export default Products;
