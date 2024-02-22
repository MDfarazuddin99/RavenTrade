import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Image,
  Link,
} from "@chakra-ui/react";

import { useState } from "react";

import homepage from "../assets/homepage.png";


import { NavLink, useNavigate } from "react-router-dom";

const login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigateTo = useNavigate();

  const handleClick = (newPath) => {
    console.log("button pressed");
    navigateTo(newPath);
  };
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Log in to your account</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"blue.400"}>Forgot password?</Text>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={()=>handleClick('/home')}
                >
                  Sign in
                </Button>
                <Stack>
                  <Text align={"center"}>
                    Dont Have Account?{" "}
                    <NavLink to="/signup">
                      <Link color={"blue.400"}>Register</Link>
                    </NavLink>
                  </Text>{" "}
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src={homepage} />
      </Flex>
    </Stack>
  );
};

export default login;
