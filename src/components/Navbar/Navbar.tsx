import { Flex, Image, IconButton, useBreakpointValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import SearchInput from './SearchInput';
import RightContent from './RightContent/RightContent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import Directory from './Directory/Directory';
import Link from 'next/link';
import Icons from './RightContent/Icons';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import UserMenu from './RightContent/UserMenu';

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  const closeSearchInput = () => {
    setShowSearchInput(false);
  };

  return (
    <Flex
      bg="white"
      height="45px"
      padding="6px 12px"
      justify={{ md: 'space-between' }}
      position="sticky" /* Fixed position to prevent movement when scrolling */
      top={0} /* Stick to the top of the viewport */
      width="100%"
      zIndex={999} /* Adjust the z-index as needed */
    >
      <Flex align="center" width={{ base: '40px', md: 'auto' }} mr={{ base: 0, md: 2 }}>
        <Link href="/">
          <Image src="/images/omplogo1.jpeg" height={{ base: '24px', md: '30px' }} cursor="pointer" />
        </Link>
      </Flex>
      {user && <Directory />}
      {isSmallScreen && showSearchInput ? (
        <Flex align='center'>
          <SearchInput user={user} />
          <IconButton
            icon={<CloseIcon />}
            aria-label="Close"
            variant="ghost"
            onClick={closeSearchInput}
            fontSize={15}
            marginLeft="auto" /* Move the close icon to the right side */
          />
        </Flex>
      ) : (
        <IconButton
          icon={<SearchIcon />}
          aria-label="Search"
          variant="ghost"
          onClick={toggleSearchInput}
          fontSize={18}
          marginLeft="auto" /* Move the search icon to the right side */
        />
      )}
      {!isSmallScreen && <RightContent user={user} />}
      {showSearchInput || !isSmallScreen ? null : (
        <Flex>
          <Icons />
          <UserMenu />
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
