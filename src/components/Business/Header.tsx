import { Business } from '@/atoms/businessesAtom';
import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { FaSmile } from 'react-icons/fa';
import useBusinessData from '@/hooks/useBusinessData';

type HeaderProps = {
    businessData: Business;
};

const Header:React.FC<HeaderProps> = ({ businessData }) => {
    
    const { businessStateValue, loading } = useBusinessData();
    const isRecommended = !!businessStateValue.mySnippets.find(item => item.businessId === businessData.id);
    
    return (
        <Flex 
            direction='column'
            width='100%'
            height='146px'
        >
            <Box height='50%' bg='blue.400'/>
            <Flex justify='center' bg='white' flexGrow={1}>
                <Flex width='95%' maxWidth='860px'>
                    {businessStateValue.currentBusiness?.imageURL ? (
                        <Image 
                            src={businessStateValue. currentBusiness.imageURL} 
                            borderRadius='full'
                            boxSize='66px'
                            alt='Business Image'
                            position='relative'
                            top={-3}
                            color='blue.500'
                            border='4px solid white'
                        />
                    ) : (                    
                        <Icon 
                            as={FaSmile} 
                            fontSize={64} 
                            position='relative' 
                            top={-3}
                            color="blue.300"
                            border='4px solid white'
                            borderRadius='50%'
                        />
                    )}
                    <Flex padding='10px 16px'>
                        <Flex direction='column' mr={6}>
                            <Text fontWeight={800} fontSize='16pt'>{businessData.id}</Text>
                            <Text fontWeight={600} fontSize='10pt' color='gray.500'>omp business</Text>
                        </Flex>
                        {/*<Button 
                            variant={isRecommended ? 'outline' : 'solid'} 
                            height='30px' 
                            pr={6} 
                            pl={6} 
                            isLoading={loading}
                            onClick={() => onRecommendOrUnrecommendBusiness(businessData, isRecommended)}
                        >
                            {isRecommended ? 'Recommended' : "Recommend"}
                        </Button>*/}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
export default Header;
