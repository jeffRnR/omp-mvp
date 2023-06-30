import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type PageContentProps = {
  children: ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <Flex justify="center" align="right" p="16px 0">
      <Flex
        width="95%"
        justify="center"
        maxWidth="860px"
        direction={{ base: 'column-reverse', md: 'row' }}
      >
        {/* LHS */}
        <Flex
          direction="column"
          width={{ base: '100%', md: '95%' }}
          mb={{ base: 6, md: 0 }}
          mr={{ md: '20px' }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/* RHS */}
        <Flex
          direction="column"
          display={{ base: 'block', md: 'flex' }}
          
          width={{ base: '100%', md: '40%' }}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageContent;
