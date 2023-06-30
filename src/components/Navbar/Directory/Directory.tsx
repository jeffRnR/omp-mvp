import { ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Menu, MenuButton, MenuList, Icon, Text, Image } from '@chakra-ui/react';
import React from 'react';
import { TiHome } from 'react-icons/ti';
import Businesses from './Businesses';
import useDirectory from '@/hooks/useDirectory';



const UserMenu:React.FC = () => {

    const { directoryState, toogleMenuOpen, onSelectMenuItem } =useDirectory();
       
    return (
        <Menu isOpen={directoryState.isOpen}>
            <MenuButton 
                cursor='pointer' 
                padding='0px 6px' 
                borderRadius={4} 
                mr={2}
                ml={{ base:1, md: 2}}
                _hover={{ outline: '1px solid', outlineColor: 'gray.200'}}
                onClick={toogleMenuOpen}
                flexDirection='row'
            >
                <Flex align='center' justify='space-between' width={{ base: 'auto', lg: '100px'}} direction='row'>
                    <Flex align='center' justify='space-between'>
                        {directoryState.selectedMenuItem.imageURL ? (
                            <Image 
                                boxSize='24px' 
                                borderRadius='full' 
                                src={directoryState.selectedMenuItem.imageURL}
                                mr={2}
                             />
                                
                                
                        ) : (
                            <Icon 
                                fontSize={24} 
                                mr={{ base: 1, md: 2}} 
                                as={directoryState.selectedMenuItem.icon} 
                                color={directoryState.selectedMenuItem.iconColor}
                            />
                        )}
                        <Flex display={{ base: 'none', lg:'flex'}}>
                            <Text fontSize='10pt'>{directoryState.selectedMenuItem.displayText}</Text>
                        </Flex>                        
                    </Flex>     
                    <ChevronDownIcon />                   
                </Flex>
            </MenuButton>
            <MenuList>             
                <Businesses />
            </MenuList>
        </Menu>
    )
}
export default UserMenu;