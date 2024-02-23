import React, {useState} from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    useToast,
    Image,
    Flex,
    InputGroup,
    InputRightAddon,
    Text,
    Center, Heading, VStack, Select, Checkbox
} from '@chakra-ui/react';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import backend from "../config.js";

function AddItem() {
    const toast = useToast();
    const [imagePreviews, setImagePreviews] = useState([]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        category: Yup.string().required('Category is required'),
        street: Yup.string().required('Street is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        zipcode: Yup.string().required('Zipcode is required'),
        lat: Yup.number().typeError('Latitude must be a number').required('Latitude is required'),
        long: Yup.number().typeError('Longitude must be a number').required('Longitude is required'),
        isGift: Yup.boolean().typeError("Is Gift must be boolean")
    });

    const handleImageChange = (event, setFieldValue) => {
        const files = event.target.files;
        setFieldValue("images", files); // Update Formik's state
        const imageFiles = Array.from(files);

        const newImagePreviews = imageFiles.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file)
        }));

        setImagePreviews(newImagePreviews);
    };

    const handleCurrentLocation = (setFieldValue) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setFieldValue('lat', position.coords.latitude);
                setFieldValue('long', position.coords.longitude);
                toast({
                    title: "Location obtained",
                    description: "Current location has been set.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }, (error) => {
                toast({
                    title: "Error obtaining location",
                    description: error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            });
        } else {
            toast({
                title: "Geolocation is not supported by this browser.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <VStack spacing={8} mt={15}>
            <Heading as="h2" size="xl" textAlign="center">Create a New Listing</Heading>
            <Center width="full">
                <Box p={15} shadow="md" borderWidth="1px" w={{base: "100%", md: "80%", lg: "30%"}}>
                    <Formik
                        initialValues={{
                            name: '',
                            description: '',
                            category: '',
                            images: null,
                            street: '',
                            city: '',
                            state: '',
                            zipcode: '',
                            lat: '',
                            long: '',
                            is_gift: false
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, actions) => {
                            console.log(values.images)
                            const formData = new FormData();
                            formData.append('user_id', values.user_id);
                            formData.append('street', values.street);
                            formData.append('city', values.city);
                            formData.append('state', values.state);
                            formData.append('zipcode', values.zipcode);
                            formData.append('lat', values.lat);
                            formData.append('long', values.long);
                            formData.append('name', values.name);
                            formData.append('description', values.description);
                            formData.append('collection', values.category);
                            formData.append('is_gift', values.is_gift);

                            for (const image of  values.images) {
                                formData.append('file', image)
                            }
                            backend.post('/createItem', formData)
                                .then((response) => {
                                    console.log("booking successful and : " + response.data.id);
                                }).catch(() => {
                            });

                            toast({
                                title: "Listing submitted.",
                                description: "Your listing has been submitted successfully.",
                                status: "success",
                                duration: 5000,
                                isClosable: true,
                            });
                            actions.setSubmitting(false);
                        }}
                    >
                        {({setFieldValue, handleSubmit, errors, touched}) => (
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={4}>
                                    <Field name="name">
                                        {({field}) => (
                                            <FormControl isInvalid={errors.name && touched.name}>
                                                <FormLabel>Name</FormLabel>
                                                <Input {...field} placeholder="Name of the item"/>
                                                {errors.name && touched.name ?
                                                    <Text color="red.500">{errors.name}</Text> : null}
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="description">
                                        {({field}) => (
                                            <FormControl isInvalid={errors.description && touched.description}>
                                                <FormLabel>Description</FormLabel>
                                                <Input {...field} placeholder="Description of the item"/>
                                                {errors.description && touched.description ?
                                                    <Text color="red.500">{errors.description}</Text> : null}
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="category">
                                        {({field, form}) => (
                                            <FormControl isInvalid={form.errors.category && form.touched.category}>
                                                <FormLabel>Category</FormLabel>
                                                <Select {...field} placeholder="Select category">
                                                    <option value="Electronics">Electronics</option>
                                                    <option value="Furniture">Furniture</option>
                                                    <option value="Clothes">Clothing</option>
                                                    <option value="Giftcards">GiftCard</option>
                                                </Select>
                                                {form.errors.category && form.touched.category ? (
                                                    <Text color="red.500">{form.errors.category}</Text>
                                                ) : null}
                                            </FormControl>
                                        )}
                                    </Field>

                                    <FormControl>
                                        <FormLabel>Images</FormLabel>
                                        <Input type="file" multiple
                                               onChange={(event) => handleImageChange(event, setFieldValue)}/>
                                        <Flex mt={2}>
                                            {imagePreviews.map((image, index) => (
                                                <Image key={index} src={image.url} alt={image.name} boxSize="100px"
                                                       objectFit="cover" mr={2}/>
                                            ))}
                                        </Flex>
                                    </FormControl>

                                    <Field name="street">
                                        {({field}) => (
                                            <FormControl isInvalid={errors.street && touched.street}>
                                                <FormLabel>Street</FormLabel>
                                                <Input {...field} placeholder="Street address"/>
                                                {errors.street && touched.street ?
                                                    <Text color="red.500">{errors.street}</Text> : null}
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="city">
                                        {({field}) => (
                                            <FormControl isInvalid={errors.city && touched.city}>
                                                <FormLabel>City</FormLabel>
                                                <Input {...field} placeholder="City"/>
                                                {errors.city && touched.city ?
                                                    <Text color="red.500">{errors.city}</Text> : null}
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="state">
                                        {({field}) => (
                                            <FormControl isInvalid={errors.state && touched.state}>
                                                <FormLabel>State</FormLabel>
                                                <Input {...field} placeholder="State"/>
                                                {errors.state && touched.state ?
                                                    <Text color="red.500">{errors.state}</Text> : null}
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="zipcode">
                                        {({field}) => (
                                            <FormControl isInvalid={errors.zipcode && touched.zipcode}>
                                                <FormLabel>Zipcode</FormLabel>
                                                <Input {...field} placeholder="Zipcode"/>
                                                {errors.zipcode && touched.zipcode ?
                                                    <Text color="red.500">{errors.zipcode}</Text> : null}
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="lat">
                                        {({field}) => (
                                            <FormControl isInvalid={errors.lat && touched.lat}>
                                                <FormLabel>Latitude</FormLabel>
                                                <InputGroup>
                                                    <Input {...field} placeholder="Latitude"/>
                                                    <InputRightAddon children={<Button size="sm"
                                                                                       onClick={() => handleCurrentLocation(setFieldValue)}>Current</Button>}/>
                                                </InputGroup>
                                                {errors.lat && touched.lat ?
                                                    <Text color="red.500">{errors.lat}</Text> : null}
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="long">
                                        {({field}) => (
                                            <FormControl isInvalid={errors.long && touched.long}>
                                                <FormLabel>Longitude</FormLabel>
                                                <InputGroup>
                                                    <Input {...field} placeholder="Longitude"/>
                                                    <InputRightAddon children={<Button size="sm"
                                                                                       onClick={() => handleCurrentLocation(setFieldValue)}>Current</Button>}/>
                                                </InputGroup>
                                                {errors.long && touched.long ?
                                                    <Text color="red.500">{errors.long}</Text> : null}
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name="isGift">
                                        {({field, form}) => (
                                            <FormControl isInvalid={form.errors.isGift && form.touched.isGift}
                                                         display="flex" alignItems="center">
                                                <Checkbox {...field} id="isGift" isChecked={field.value}>
                                                    Is this item a gift?
                                                </Checkbox>
                                                {form.errors.isGift && form.touched.isGift ? (
                                                    <Text color="red.500">{form.errors.isGift}</Text>
                                                ) : null}
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Button mt={4} colorScheme="teal" type="submit" isLoading={false}>
                                        Submit Listing
                                    </Button>
                                </Stack>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Center>
        </VStack>
    );
}

export default AddItem;

