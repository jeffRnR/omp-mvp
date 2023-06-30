import { Business, businessState } from '@/atoms/businessesAtom';
import CreateBusinessModal from '@/components/Modal/CreateBusiness/CreateBusinessModal';
import { Flex, MenuItem, Icon, Text, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { CgEnter } from 'react-icons/cg';
import { GrAdd } from 'react-icons/gr';
import { useRecoilValue } from 'recoil';
import MenuListItem from './MenuListItem';
import { FaSmile } from 'react-icons/fa';
import useBusinessData from '@/hooks/useBusinessData';
import Link from 'next/link';
import { useRouter } from 'next/router';

type BusinessesProps = {};

const Businesses: React.FC<BusinessesProps> = () => {
  const [open, setOpen] = useState(false);
  const { businessStateValue } = useBusinessData(); // Retrieve the businessStateValue from the hook

  const router = useRouter();
  
  const mySnippets = useRecoilValue(businessState).mySnippets; // Access mySnippets from the businessStateValue

  return (
    <>
      <CreateBusinessModal open={open} handleClose={() => setOpen(false)} />
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="9pt" fontWeight={500}>
          My businesses
        </Text>
      </Box>
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: 'gray.100 ' }}
        onClick={() => setOpen(true)}
      >
        <Flex align="center">
          <Icon fontSize={20} mr={2} as={GrAdd} />
          Create a Business
        </Flex>
      </MenuItem>
      {mySnippets.map((snippet) => (
        
        <MenuListItem 
            key={snippet.businessId}
            icon={FaSmile}
            displayText={`${snippet.businessId}`}
            link={`/businesses/${snippet.businessId}`}
            iconColor="blue.500"
            imageURL={snippet.imageURL}
        />
              
        
      ))}
    </>
  );
};

export default Businesses;
