import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData ?: boolean;
}

export default function Profile({showProfileData=true}: ProfileProps) {

    return (
        
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Filipe Rocha</Text>
                    <Text
                        color="gray.500" fontSize="small">developer.fsr@gmail.com</Text>
                </Box>
            )}

            <Avatar size="md" name="Filipe Rocha" src="https://github.com/filipesoaresr.png" />
        </Flex>
    );
}