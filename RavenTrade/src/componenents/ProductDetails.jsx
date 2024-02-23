import {
  Box,
  Heading,
  IconButton,
  useBreakpointValue,
  Flex,
  Text,
  Badge,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};
import backend from "../config.js";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

export default function ProductDetails(props) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState(null); //<Slider | null>(null);
  const [prod, setProd] = useState(null);

  const { product_category, product_id } = useParams();
  const product_param = `${product_category}/${product_id}`;

  useEffect(() => {
    backend
      .post("/getItem", { id: product_param })
      .then((response) => {
        setProd(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "20px" });

  // These are the images used in the slide
  const cards = [
    // "https://images.unsplash.com/photo-1612852098516-55d01c75769a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    "https://s.yimg.com/ny/api/res/1.2/zx9w5A3IRZvlYk3tqVZcxQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD03OTg7Y2Y9d2VicA--/https://s.yimg.com/os/creatr-uploaded-images/2023-09/ac947980-562e-11ee-bfcf-db4427d46b81",
    "https://images.unsplash.com/photo-1627875764093-315831ac12f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
  ];

  return (
    <Flex w="70%" flexDir={"column"}>
      {prod ? (
        <div>
          <Box
            position={"relative"}
            height={"600px"}
            width={"100%"}
            overflow={"hidden"}
          >
            {/* CSS files for react-slick */}
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            {/* Left Icon */}
            <IconButton
              aria-label="left-arrow"
              colorScheme="messenger"
              borderRadius="full"
              position="absolute"
              left={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickPrev()}
            >
              <BiLeftArrowAlt />
            </IconButton>
            {/* Right Icon */}
            <IconButton
              aria-label="right-arrow"
              colorScheme="messenger"
              borderRadius="full"
              position="absolute"
              right={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickNext()}
            >
              <BiRightArrowAlt />
            </IconButton>
            {/* Slider */}
            <Slider {...settings} ref={(slider) => setSlider(slider)}>
              {cards.map((url, index) => (
                <Box
                  key={index}
                  height={"6xl"}
                  position="relative"
                  //   backgroundPosition="center"
                  //   backgroundRepeat="no-repeat"
                  //   backgroundSize="cover"
                  backgroundImage={`url(${url})`}
                />
              ))}
            </Slider>
          </Box>
          <Box p={"2%"} bg="gree.200" w="full" h="30vh" overflowY="auto">
            <Heading>
              {prod.name}
              <Badge colorScheme="purple" ml={5} fontSize={"xl"}>
                {prod.collection}
              </Badge>
            </Heading>

            <Text size={"lg"}>{prod.description}</Text>
            <Text>{`${prod.address.street} ${prod.address.city} ${prod.address.state} ${prod.address.zipcode}`}</Text>
          </Box>
        </div>
      ) : 
        ""
      }
    </Flex>
  );
}
