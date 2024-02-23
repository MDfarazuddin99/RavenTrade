import ProductDetails from "../componenents/ProductDetails";
import ProductMap from "../componenents/ProductMap";

import { Flex, Box } from "@chakra-ui/react";

const ProductPage = () => {
  return (
     <Flex p={2} bg="gray.50" h="auto" mb={10}>
      <ProductDetails />
      <ProductMap />
    </Flex>
  );
};

export default ProductPage;
