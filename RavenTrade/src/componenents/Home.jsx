import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Link
} from "@chakra-ui/react";
import homepage from "../assets/homepage.png";
import { NavLink, useNavigate } from "react-router-dom";

const home = () => {
    const navigateTo = useNavigate();
    
  const handleClick = (newPath) => {
    console.log("button pressed");
    navigateTo(newPath);
  };
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
            color={'#418689'}
            >
              Exchange anything and Everything
            </Text>
            {/* <br />{" "} */}
            <Text color={"#D67567"} as={"span"}>Only On
              <Text color={"#E4A548"}>RavenTrade</Text>
            </Text>{" "}
          </Heading>

          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={() => handleClick("/login")}
            >
              Login
            </Button>
            <Button rounded={"full"} onClick={() => handleClick("/signup")}>
              Register
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src={homepage} />
      </Flex>
    </Stack>
  );
};

export default home;
