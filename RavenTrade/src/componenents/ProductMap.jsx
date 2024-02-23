import { Box } from "@chakra-ui/react";

import GoogleMapReact from "google-map-react";

const ProductMap = () => {
  const defaultProps = {
    center: {
      lat: 37.3360820543542,
      lng: -121.88782456259409,
    },
    zoom: 11,
  };

  return (
    <Box px={1} w="30%">
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBdaYJxlPYKRLKHR7KVSOG4yhNvW97YVGs",
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
        </GoogleMapReact>
      </div>
    </Box>
  );
};

export default ProductMap;
