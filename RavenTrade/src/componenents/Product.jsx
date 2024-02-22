import { Box } from "@chakra-ui/react";

import GoogleMapReact from "google-map-react";

const Product = () => {
  const defaultProps = {
    center: {
      lat: 37.3360820543542,
      lng: -121.88782456259409,
    },
    zoom: 11,
  };

  return (
    <Box h="100vh">
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBdaYJxlPYKRLKHR7KVSOG4yhNvW97YVGs",
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {/* <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" /> */}
        </GoogleMapReact>
      </div>
    </Box>
  );
};

export default Product;
