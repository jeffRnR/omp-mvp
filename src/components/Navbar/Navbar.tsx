import { Flex, Image, IconButton, useBreakpointValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import SearchInput from './SearchInput';
import RightContent from './RightContent/RightContent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import Directory from './Directory/Directory';
import Link from 'next/link';
import Icons from './RightContent/Icons';
import { SearchIcon } from '@chakra-ui/icons';

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  return (
    <Flex bg="white" height="45px" padding="6px 12px" justify={{ md: 'space-between' }}>
      <Flex align="center" width={{ base: '40px', md: 'auto' }} mr={{ base: 0, md: 2 }}>
        <Link href="/">
          <Image src="/images/omplogo1.jpeg" height={{ base: '24px', md: '30px' }} cursor="pointer" />
        </Link>
      </Flex>
      {user && <Directory />}
      {isSmallScreen && showSearchInput ? (
        <SearchInput user={user} />
      ) : (
        <IconButton
          icon={<SearchIcon />}
          aria-label="Search"
          variant="ghost"
          onClick={toggleSearchInput}
        />
      )}
      {!isSmallScreen && <RightContent user={user} />}
      {showSearchInput || !isSmallScreen ? null : <Icons />} {/* Show Icons component when search icon is visible */}
    </Flex>
  );
};

export default Navbar;
