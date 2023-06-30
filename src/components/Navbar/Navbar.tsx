import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import SearchInput from './SearchInput';
import RightContent from './RightContent/RightContent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import Directory from './Directory/Directory';
import Link from 'next/link';

const Navbar:React.FC= () => {
    const [user, loading, error] = useAuthState(auth)    
    return (
        <Flex bg="white" height="45px" padding="6px 12px" justify={{ md: 'space-between'}}>
            <Flex align="center" width={{ base: '40px', md: 'auto'}} mr={{ base: 0, md: 2 }}>
                <Link href='/'>
                    <Image src="/images/omplogo1.jpeg" height={{ base:"24px", md:'30px'}} cursor='pointer' />
                </Link>
                
            </Flex>
            {user && <Directory />}
            <SearchInput user={user}/>    
            <RightContent user={user} /> 
        </Flex>
    )
        
    
}
export default Navbar;