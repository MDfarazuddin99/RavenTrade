import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Box: {
      variants: {
        footerBox: {
          _hover: { color: "red", fontWeight: "bold" },
        },
      },
    },
  },
});

export default theme;
