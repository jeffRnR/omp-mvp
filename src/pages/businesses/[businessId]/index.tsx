import { Business, businessState } from "@/atoms/businessesAtom";
import { firestore } from "../../../firebase/clientApp";
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import safeJsonStringify from 'safe-json-stringify';
import NotFound from "@/components/Business/NotFound";
import Header from "@/components/Business/Header";
import PageContent from "@/components/Layout/PageContent";
import CreatePostLink from "@/components/Business/CreatePostLink";
import Posts from "@/components/Posts/Posts";
import { useSetRecoilState } from "recoil";
import About from "@/components/Business/About";
import { Text } from "@chakra-ui/react";




type BusinessPageProps = {
    businessData: Business;
};

const BusinessPage:React.FC<BusinessPageProps> = ({ businessData}) => {
    console.log('here is data', businessData);

    const setBusinessStateValue = useSetRecoilState(businessState);

    if (!businessData){
        return(
            <NotFound />
        )
    }

    useEffect(() => {
        setBusinessStateValue((prev) => ({
            ...prev,
            currentBusiness: businessData
        }))
    }, [businessData])
    return (
        <>
            <Header businessData={businessData}/>
            <PageContent>
                <>
                    <Text mt={3} mb={3} alignSelf='center' display={{ md: 'none'}}>Posts</Text> 
                    <Posts businessData={businessData} />  
                                  
                </>
                
                <>
                    <About businessData={businessData} />
                </>
            </PageContent>
        </>
    )
};

export async function getServerSideProps(context: GetServerSidePropsContext){


    //get business data and pass it to client
    try{
        const businessDocRef = doc(firestore, 'businesses', context.query.businessId as string);
        const businessDoc = await getDoc(businessDocRef);

        return {
            props:{
                businessData: businessDoc.exists() 
                    ? JSON.parse(
                        safeJsonStringify(
                            { id: businessDoc.id, ...businessDoc.data() }
                        )
                    )
                : "",
            },
        };
    }catch (error){

        // could add error page here
        console.log('getServerSideProps error', error);
    }
}
export default BusinessPage;