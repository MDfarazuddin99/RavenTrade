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
import {useEffect, useState} from "react";
import backend from "../config.js";
import { NavLink, useNavigate } from "react-router-dom";
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

const MarketPlace = (props) => {


    const [items, setItems] = useState([]);
    const [category, setCategory] = useState("Electronics")
    const [radius, setRadius] = useState(10)

    useEffect(() => {
        backend.post('/get/' + category, {lat: 37.3352, long: -121.8811, radius: radius})
            .then(response => {
                setItems(response.data.items);
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [category, radius]);


    const defaultProps = {
        center: {
            lat: 37.3360820543542,
            lng: -121.88782456259409,
        },
        zoom: 11,
    };

    const handleCategoryChange = (category) => {
        setCategory(category);
    };

    const handleRadiusChange = (valueAsString, valueAsNumber) => {
        // Chakra UI NumberInput gives you both the string and number values. Use the number version directly.
        setRadius(valueAsNumber);
    };

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
                        <FormControl as="fieldset">

                            <RadioGroup  value={category} defaultValue="all" onChange={handleCategoryChange}>
                                <HStack spacing="50px">
                                    <Radio value="clothes">Clothes</Radio>
                                    <Radio value="Electronics">Electronics</Radio>
                                    <Radio value="furniture">Furniture</Radio>
                                    <Radio value="giftcards">Gift Cards</Radio>
                                    <Radio value="all"> All</Radio>
                                </HStack>
                            </RadioGroup>
                            <Flex mt={2}>
                                <FormLabel>Search</FormLabel>
                                <Input placeholder="First name" w="70%"/>
                                <FormLabel marginLeft="2">Radius (Miles)</FormLabel>
                                <NumberInput max={500} min={1} value={radius}  w="30%" h="40px" onChange={handleRadiusChange}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper/>
                                        <NumberDecrementStepper/>
                                    </NumberInputStepper>
                                </NumberInput>
                            </Flex>
                        </FormControl>
                    </Box>

                    <Flex flexDir={"column"} overflowY="auto">
                        {items.map((item) => (
                                <Card
                                    key={item.id}
                                    direction={{base: "column", sm: "row"}}
                                    // overflow="hidden"
                                    variant="outline"
                                    mb={5}
                                >
                                    <Image
                                        objectFit="cover"
                                        maxW={{base: "100%", sm: "200px"}}
                                        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                                        alt="Caffe Latte"
                                    />

                                    <Stack>
                                        <CardBody>
                                            <Heading size="md">The perfect latte</Heading>

                                            <Text py="2">
                                                {item.description}
                                            </Text>
                                        </CardBody>

                                        <CardFooter>
                                            <Button variant="solid" colorScheme="blue">
                                                View Details
                                            </Button>
                                        </CardFooter>
                                    </Stack>
                                </Card>
                            )
                        )}
                    </Flex>
                </Box>
            </Box>

            <Box pt={5} px={1} w="30%">
                <div style={{height: "100vh", width: "100%"}}>
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
                        {items.map((item) => {
                            console.log(item, item.address.location.lat, item.address.location.long)
                            return <ItemMarker key={item.id} lat={item.address.location.lat} lng={item.address.location.long}/>;
                        })}
                    </GoogleMapReact>
                </div>
            </Box>
        </Flex>
    );
};

export default MarketPlace;
