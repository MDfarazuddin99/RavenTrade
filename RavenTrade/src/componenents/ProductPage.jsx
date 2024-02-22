import { Flex, Box } from "@chakra-ui/react";

import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const ProductPage = () => {
  const defaultProps = {
    center: {
      lat: 37.3360820543542,
      lng: -121.88782456259409,
    },
    zoom: 11,
  };

  return (
    <Flex dir="row" h="100vh" w="full" bg="blue.50">
      <Box w="70%">
        
      </Box>
      <Box w="30%">
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBdaYJxlPYKRLKHR7KVSOG4yhNvW97YVGs",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </Box>
    </Flex>
  );
};

export default ProductPage;
