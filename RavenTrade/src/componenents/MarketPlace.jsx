import { Box, Flex, Stack, Heading, Center } from "@chakra-ui/react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MarketPlace = () => {
  const defaultProps = {
    center: {
      lat: 37.3360820543542,
      lng: -121.88782456259409,
    },
    zoom: 11,
  };
  return (
    <Flex dir="row" mb={10} bg="gray.50">
              <Box pt={5} px={1} w="70%" height={"100vh"}>
        <Box h="100vh" w="100%" bg={'blue.100'} display={'flex'} justifyContent={'center'}>
            <Heading>Near By Available Items</Heading>
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
            <AnyReactComponent
              lat={37.3360820543542}
              lng={-121.88782456259409}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </Box>

    </Flex>
  );
};

export default MarketPlace;
