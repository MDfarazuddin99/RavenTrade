import {Card, Image, Stack, CardBody, Heading, Text, CardFooter, Button} from '@chakra-ui/react';

// Assuming 'item' is an object that contains 'id', 'description', and possibly other properties you might use
const ItemCard = (item) => {
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
    );
}

export default ItemCard;
