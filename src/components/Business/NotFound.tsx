import React from "react";
import { Flex, Button} from "@chakra-ui/react";
import Link from "next/link";

const BusinessNotFound: React.FC = () => {
    return (
        <Flex
            direction='column'
            justifyContent='center'
            alignItems='center'
            minHeight='60vh'
        >
            Sorry, this business does not exist in omp or has been banned
            <Link href="/">
                <Button mt={4}>GO HOME</Button>
            </Link>
        </Flex>
    );
};

export default BusinessNotFound;