import { Avatar, Box, Flex, Text } from "@chakra-ui/react";


export default function Profile() {

    return (
        
        <Flex align="center">
            <Box mr="4" textAlign="right">
                <Text>Filipe Rocha</Text>
                <Text
                    color="gray.500" fontSize="small">developer.fsr@gmail.com</Text>
            </Box>

            <Avatar size="md" name="Filipe Rocha" src="https://github.com/filipesoaresr.png" />
        </Flex>

    );
}