import { businessState } from '@/atoms/businessesAtom';
import About from '@/components/Business/About';
import PageContent from '@/components/Layout/PageContent';
import NewPostForm from '@/components/Posts/NewPostForm';
import { auth } from '@/firebase/clientApp';
import useBusinessData from '@/hooks/useBusinessData';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';


const SubmitPostPage:React.FC = () => {
    const [user] = useAuthState(auth);
    //const businessStateValue = useRecoilValue(businessState);

    const { businessStateValue } =useBusinessData();

    console.log("Business", businessStateValue);
    
    return (
        <PageContent>
            <>
                <Box p='14px 0px' borderBottom='1px solid' borderColor='white'>
                    <Text>Create a post</Text>
                </Box>
                {user && <NewPostForm user={user} businessImageURL={businessStateValue.currentBusiness?.imageURL}/>}
            </>

            <>
                {businessStateValue.currentBusiness && (<About businessData={businessStateValue.currentBusiness}/> )}
            </>
        </PageContent>
    )
}
export default SubmitPostPage;