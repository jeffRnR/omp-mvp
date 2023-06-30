import React, { useState } from 'react';
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiOutlineMapPin } from "react-icons/hi2";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { useRouter } from 'next/router';
import Link from 'next/link';


const products = [];
const Icons: React.FC = () => {
  const router = useRouter();

  const [cartVisibility, setCartVisibility] = useState(false);
  const [productsInCart, setProducts] = useState([])

  return (
    <Flex>
      <Flex
        display={{ base: 'none', md: 'flex'}}
        align='center'
        borderRight='1px solid'
        borderColor='blue.200'
      >
        {/*<Flex 
            mr={1.5} 
            ml={1.5} 
            padding={1} 
            cursor='pointer' 
            borderRadius={4} 
            _hover={{ bg:'gray.200'}}                    
        >
            <Icon as={HiOutlineMapPin} fontSize={22}/>
        </Flex>
        
        <Flex 
            mr={1.5} 
            ml={1.5} 
            padding={1} 
            cursor='pointer' 
            borderRadius={4} 
            _hover={{ bg:'gray.200'}}                    
        >
            <Icon as={HiOutlineShoppingBag} fontSize={20}/>
        </Flex> */}
      </Flex>
      <>
        <Link href='/Map/Map'>
          <Flex
            mr={1.5}
            ml={1.5}
            padding={1}
            cursor='pointer'
            borderRadius={4}
            _hover={{ bg:'gray.200'}}
          >
            <Icon as={HiOutlineMapPin} fontSize={22}/>
          </Flex>
        </Link>

        <Link href='/src/components/Cart/Cart'> {/* Update the link to the cart file */}
          <Flex
            mr={1.5}
            ml={1.5}
            padding={1}
            cursor='pointer'
            borderRadius={4}
            _hover={{ bg:'gray.200'}}
            
          >
            <Icon as={HiOutlineShoppingBag} fontSize={20}/>
          </Flex>
        </Link>

        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor='pointer'
          borderRadius={4}
          _hover={{ bg:'gray.200'}}
        >
          <Icon as={IoNotificationsOutline} fontSize={20}/>
        </Flex>
        <Flex
          display={{ base:'none', md: 'flex'}}
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor='pointer'
          borderRadius={4}
          _hover={{ bg:'gray.200'}}
        >
          <Icon as={GrAdd} fontSize={20}/>
        </Flex>
      </>
    </Flex>
  );
}

export default Icons;
