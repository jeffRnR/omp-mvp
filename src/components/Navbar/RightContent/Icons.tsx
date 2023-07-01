import React from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { Flex, Icon } from '@chakra-ui/react';
import { HiOutlineMap, HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Icons: React.FC = () => {
  const router = useRouter();

  return (
    <Flex>
      <Link href="/Map/Map">
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: 'gray.200' }}
        >
          <Icon as={HiOutlineMap} fontSize={22} />
        </Flex>
      </Link>

      <Link href="/src/components/Cart/Cart"> {/* Update the link to the cart file */}
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: 'gray.200' }}
        >
          <Icon as={HiOutlineShoppingBag} fontSize={20} />
        </Flex>
      </Link>

      <Flex
        mr={1.5}
        ml={1.5}
        padding={1}
        cursor="pointer"
        borderRadius={4}
        _hover={{ bg: 'gray.200' }}
      >
        <Icon as={IoNotificationsOutline} fontSize={20} />
      </Flex>
      <Flex
        display={{ base: 'none', md: 'flex' }}
        mr={1.5}
        ml={1.5}
        padding={1}
        cursor="pointer"
        borderRadius={4}
        _hover={{ bg: 'gray.200' }}
      >
        <Icon as={HiOutlineUser} fontSize={20} />
      </Flex>
    </Flex>
  );
};

export default Icons;
