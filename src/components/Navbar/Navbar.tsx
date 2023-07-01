import React, { useState } from "react";
import { Box, Flex, Image, IconButton } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import {
  defaultMenuItem,
  directoryMenuState,
} from "../../atoms/directoryMenuAtom";
import { auth } from "../../firebase/clientApp";
import Directory from "./Directory/Directory";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import router from "next/router";
import useDirectory from "../../hooks/useDirectory";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  const [showSearchInput, setShowSearchInput] = useState(false);

  // Use <Link> for initial build; implement directory logic near end
  const { onSelectMenuItem } = useDirectory();

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  const closeSearchInput = () => {
    setShowSearchInput(false);
  };

  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justifyContent={{ md: "space-between" }}
      top={0}
      position="sticky"
      zIndex={999}
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        cursor="pointer"
        onClick={() => onSelectMenuItem(defaultMenuItem)}
      >
        <Image src="/images/omplogo1.jpeg" height="30px" />
      </Flex>
      {user && <Directory />}
      {showSearchInput ? (
        <SearchInput user={user as User} />
      ) : (
        <IconButton
          icon={<SearchIcon />}
          aria-label="Search"
          variant="ghost"
          onClick={toggleSearchInput}
          fontSize={18}
          marginLeft="auto"
        />
      )}
      {!showSearchInput && <RightContent user={user as User} />}
      {showSearchInput && (
        <IconButton
          icon={<CloseIcon />}
          aria-label="Close"
          variant="ghost"
          onClick={closeSearchInput}
          fontSize={18}
        />
      )}
    </Flex>
  );
};

export default Navbar;
