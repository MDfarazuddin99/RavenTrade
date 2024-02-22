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
} from "@chakra-ui/react";

import GoogleMapReact from "google-map-react";
import mapMarkerIcon from "../assets/map_marker.png";
import itemMarkerIcon from "../assets/item_marker.png";

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

const generateRandomLocations = (
    centerLat,
    centerLng,
    radius,
    numLocations
) => {
  const locations = [];

  // Convert radius from miles to degrees
  const radiusInDegrees = radius / 69.0;

  for (let i = 0; i < numLocations; i++) {
    // Generate random angle in radians
    const randomAngle = Math.random() * (2 * Math.PI);

    // Generate random distance within the radius
    const randomDistance = Math.sqrt(Math.random()) * radiusInDegrees;

    // Calculate new latitude and longitude
    const newLat = centerLat + randomDistance * Math.cos(randomAngle);
    const newLng = centerLng + randomDistance * Math.sin(randomAngle);

    locations.push({
      lat: newLat,
      lng: newLng,
    });
  }

  return locations;
};

const MarketPlace = () => {
  const defaultProps = {
    center: {
      lat: 37.3360820543542,
      lng: -121.88782456259409,
    },
    zoom: 11,
  };

  const radiusInMiles = 5;
  const numLocations = 5;
  // const locations = generateRandomLocations(
  //   defaultProps.center.lat,
  //   defaultProps.center.lng,
  //   radiusInMiles,
  //   numLocations
  // );
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
  console.log(locations);

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

            <Box mb={5}>
              <FormControl as="fieldset">
                <FormLabel as="legend">Favorite Naruto Character</FormLabel>
                <RadioGroup defaultValue="all">
                  <HStack spacing="50px">
                    <Radio value="clothes">Clothes</Radio>
                    <Radio value="electronics">Electronics</Radio>
                    <Radio value="furniture">Furniture</Radio>
                    <Radio value="giftcards">Gift Cards</Radio>
                    <Radio value="all">Sage of the six Paths</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
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
                    <Button variant="solid" colorScheme="blue">
                      View Details
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>

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
                    <Button variant="solid" colorScheme="blue">
                      View Details
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>

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
                    <Button variant="solid" colorScheme="blue">
                      View Details
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>

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
                    <Button variant="solid" colorScheme="blue">
                      View Details
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>

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
                    <Button variant="solid" colorScheme="blue">
                      View Details
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>

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
                    <Button variant="solid" colorScheme="blue">
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