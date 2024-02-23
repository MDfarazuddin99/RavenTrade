import {
    Card,
    Image,
    Stack,
    CardBody,
    Heading,
    Text,
    CardFooter,
    Button,
} from "@chakra-ui/react";

import {NavLink, useNavigate} from "react-router-dom";

// Assuming 'item' is an object that contains 'id', 'description', and possibly other properties you might use
const ItemCard = (props) => {
    let item = props.item;
    const basePath = "/public/static/images/"
    const navigateTo = useNavigate();

    console.log("Images::::", item)
    const handleClick = (newPath) => {
        console.log("button pressed");
        navigateTo(newPath);
    };
    // console.log("Item Card: ", item.description);
    return (
        <Card
            key={item.id}
            direction={{base: "column", sm: "row"}}
            variant="outline"
            mb={5}
        >
            <Image
                objectFit="cover"
                maxW={{base: "100%", sm: "200px"}}
                src={basePath + item.id + '/' + item.images[0]}
            />

            <Stack>
                <CardBody>
                    <Heading size="md">{item.name}</Heading>
                    <Text py="2">{item.description}</Text>
                </CardBody>

                <CardFooter>
                    <Button
                        variant="solid"
                        colorScheme="blue"
                        onClick={() => handleClick(`/product/${item.id}`)}
                    >
                        View Details
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};

export default ItemCard;
