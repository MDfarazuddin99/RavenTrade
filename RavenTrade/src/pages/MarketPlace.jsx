import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
} from "@chakra-ui/react";

import GoogleMapReact from "google-map-react";
import mapMarkerIcon from "../assets/map_marker.png";
import itemMarkerIcon from "../assets/item_marker.png";
import { NavLink, useNavigate } from "react-router-dom";

import { useState } from "react";

const Marker = () => (
  <div
    style={{
      width: "15px",
      height: "20px",
      backgroundImage: `url(${mapMarkerIcon})`,
      backgroundSize: "cover",
    }}
  ></div>
);

const ItemMarker = () => (
  <div
    style={{
      width: "15px",
      height: "20px",
      backgroundImage: `url(${itemMarkerIcon})`,
      backgroundSize: "cover",
    }}
  ></div>
);

const MarketPlace = () => {
  const navigateTo = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [radius, setRadius] = useState(0);

  const handleClick = (newPath) => {
    console.log("button pressed");
    navigateTo(newPath);
  };

  const handleSubmit = () => {
    // Do something with the form values, e.g., send them to an API
    console.log("Category:", selectedCategory);
    console.log("Radius:", radius);
  };

  const defaultProps = {
    center: {
      lat: 37.3360820543542,
      lng: -121.88782456259409,
    },
    zoom: 11,
  };

  const locations = [
    {
      lat: 37.368364451061005,
      lng: -121.94735298397816,
    },

    {
      lat: 37.38016597178145,
      lng: -121.88055391963168,
    },

    {
      lat: 37.33004548382843,
      lng: -121.88502699103763,
    },

    {
      lat: 37.32980863282362,
      lng: -121.84141438130071,
    },

    {
      lat: 37.3790094462222,
      lng: -121.85672023683446,
    },
  ];

  return (
    <Flex bg="gray.50" h="auto" mb={10}>
      <Box pt={5} px={1} w="70%">
        <Box
          h="100vh"
          w="full"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Heading mb={4}>Near By Available Items</Heading>

          <Box mb={5} w="95%">
            <form onSubmit={handleSubmit}>
              <FormControl as="fieldset">
                <FormLabel as="legend">Favorite Naruto Character</FormLabel>
                <RadioGroup
                  value={selectedCategory}
                  onChange={() => setSelectedCategory}
                >
                  <HStack spacing="50px">
                    <Radio value="clothes">Clothes</Radio>
                    <Radio value="electronics">Electronics</Radio>
                    <Radio value="furniture">Furniture</Radio>
                    <Radio value="giftcards">Gift Cards</Radio>
                    <Radio value="all"> All</Radio>
                  </HStack>
                </RadioGroup>
                <Flex mt={2}>
                  <FormLabel>Search</FormLabel>
                  <Input
                    placeholder="First name"
                    w="70%"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FormLabel marginLeft="2">Radius (Miles)</FormLabel>
                  <NumberInput
                    max={10}
                    min={0}
                    w="30%"
                    h="40px"
                    value={radius}
                    onChange={(value) => setRadius(value)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
              </FormControl>
              <button type="submit">Submit</button>
            </form>
          </Box>

          <Flex flexDir={"column"} overflowY="auto">
            <Card
              direction={{ base: "column", sm: "row" }}
              // overflow="hidden"
              variant="outline"
              mb={5}
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
              />

              <Stack>
                <CardBody>
                  <Heading size="md">The perfect latte</Heading>

                  <Text py="2">
                    Caffè latte is a coffee beverage of Italian origin made with
                    espresso and steamed milk.
                  </Text>
                </CardBody>

                <CardFooter>
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    onClick={() => handleClick("/product")}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
          </Flex>
        </Box>
      </Box>

      <Box pt={5} px={1} w="30%">
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBdaYJxlPYKRLKHR7KVSOG4yhNvW97YVGs",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <Marker
              lat={defaultProps.center.lat}
              lng={defaultProps.center.lng}
            />
            {locations.map((loc, idx) => {
              return <ItemMarker key={idx} lat={loc.lat} lng={loc.lng} />;
            })}
          </GoogleMapReact>
        </div>
      </Box>
    </Flex>
  );
};

export default MarketPlace;
