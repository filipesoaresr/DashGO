
import { Icon, Link, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ElementType } from "react";
import { RiInputMethodLine } from "react-icons/ri";


interface NavLinkProps extends ChakraLinkProps{
    icon: ElementType;
    children: string;
}

export default function NavLink({children, icon, ...rest}: NavLinkProps) {

    return (
        <Link display="flex" alignItems="center" color="pink.400" {...rest}>
            <Icon as={icon} fontSize="20" />
            <Text ml="4" fontWeight="medium">{children}</Text>
        </Link>
    );
}