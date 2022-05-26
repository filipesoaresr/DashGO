
import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, Spinner, Link as ChakraLink } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Pagination from "../../components/Pagination";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useQuery } from "react-query" 
import { api } from "../../services/api";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";
import { GetServerSideProps } from "next/types";

 

export default function UserList() {

    const [ page, setPage ] = useState(1)
    const { data, isLoading, isFetching, error } = useUsers(page)


    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    async function handlePrefetchUser(userId: string) {
        await queryClient.prefetchQuery(['users', userId], async () => {
            const response = await api.get(`users/${userId}`)

            return response.data;
        }, {
            staleTime: 1000 * 60 * 10 // 10 minutes
        });
    }

    return(
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">

                            Usuários
                            { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" /> }

                        </Heading>
                        
                        <Link href="/users/create" passHref>
                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                            >
                                Criar Novo
                            </Button>
                        </Link>
                    </Flex>

                    { isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter os dados dos usuarios</Text>
                        </Flex>
                    ) : (
                                <>
                                    <Table colorScheme="whiteAlpha">
                                        <Thead>
                                            <Tr>
                                                <Th px={["4", "4", "6"]} color="gray.500" width="8">
                                                    
                                                </Th>
                                                <Th>Usuário</Th>
                                                {isWideVersion && <Th>Data de Cadastro</Th>}
                                                <Th width="8"></Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>

                                            { data.users.map(user => {
                                                return (
                                                    <Tr key={user.id}>
                                                        <Td px={["4", "4", "6"]}>
                                                            <Checkbox colorScheme="pink" />
                                                        </Td>
                                                        <Td>
                                                            <Box>
                                                                <ChakraLink color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                                                    <Text fontWeight="bold">{user.name}</Text>
                                                                </ChakraLink>
                                                                <Text fontWeight="bold">{user.email}</Text>
                                                            </Box>
                                                        </Td>
                                                        {isWideVersion && <Td>{user.createdAt}</Td>}
                                                        <Td>
                                                            <Button
                                                                as="a"
                                                                size="sm"
                                                                fontSize="sm"
                                                                colorScheme="purple"
                                                                leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                                            >
                                                                {isWideVersion ? "Editar" : ""}
                                                            </Button>
                                                        </Td>
                                                    </Tr>
                                                )
                                            })}

                                        </Tbody>
                                    </Table>

                                    <Pagination 
                                    totalCountOfRegisters={data.totalCount}
                                    currentPage={page}
                                    onPageChange={setPage}
                                    />
                                </>
                    )}
                </Box>
            </Flex>
        </Box>
    )
}

