import { authModalState } from '@/atoms/authModalAtom';
import { Business, businessState, BusinessSnippet } from '@/atoms/businessesAtom';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, doc, getDoc, getDocs, increment, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';


const useBusinessData = () => {
    const [user] = useAuthState(auth);
    const [businessStateValue, setBusinessStateValue] = 
        useRecoilState(businessState);
    const setAuthModalState = useSetRecoilState(authModalState);
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onRecommendOrUnrecommendBusiness = (businessData: Business, isRecommended: boolean) => {
        // is the user signed in?
        // if not => open auth modal

        if(!user){
            //open modal
            setAuthModalState({ open: true, view: "login"});
            return;
        }

        /*if(isRecommended){
            unrecommendBusiness(businessData.id);
            return;
        }
        recommendBusiness(businessData);*/
    };

    const getMySnippets = async () => {
        setLoading(true);
        try{
            // get users snippets
            const snippetDocs = await getDocs(
                collection(firestore, `users/${user?.uid}/businessSnippets`)
            );

            const snippets = snippetDocs.docs.map(doc => ({ ...doc.data() }));
            setBusinessStateValue(prev => ({
                ...prev,
                mySnippets: snippets as BusinessSnippet[]
            }));

            console.log("here are snippets", snippets);
        }catch(error){
            console.log('getMySnippets error', error);
            
        }
        setLoading(false);
    }

    /*const recommendBusiness = async (businessData: Business) => {
        //batchwrite
        try{
            const batch = writeBatch(firestore);

            const newSnippet: BusinessSnippet = {
                businessId: businessData.id,
                imageURL: businessData.imageURL || "",
            };

            // creating new business snippet
            batch.set(doc(firestore, `users/${user?.uid}/businessSnippets`, businessData.id), newSnippet);

            //updatinng the number of recommendations
            batch.update(doc(firestore, 'businesses', businessData.id), {
                numberOfRecommendations: increment(1),
            });

            await batch.commit();

            //update recoil state

            setBusinessStateValue(prev => ({
                ...prev,
                mysSnippets: [...prev.mySnippets, newSnippet],
            }));
        }catch(error){
            console.log('recommendBusiness error', error);            
        }
        setLoading(false);
    };
    const unrecommendBusiness = async (businessId: string) => {
        //batchwrite
        try {
            const batch = writeBatch(firestore);

                    

            //updatinng the number of recommendations
            batch.update(doc(firestore, 'businesses', businessId), {
                numberOfRecommendations: increment(-1),
            });

            await batch.commit();

            //updaterecoil state
            setBusinessStateValue(prev => ({
                ...prev,
                mySnippets: prev.mySnippets.filter((item) => item.businessId != businessId),
            }));
            
        } catch (error) {
            console.log('unRecommendBusiness error');
        }
    }; */
    const getBusinessData = async (businessId: string) => {
        try {
            const businessDocRef = doc(firestore, 'businesses', businessId);
            const businessDoc = await getDoc(businessDocRef);
            
            
        } catch (error) {
            console.log('getBusinessData Error', error);
            
        }
    }
    useEffect(() => {
        if(!user) return;
        getMySnippets();
    }, [user]);

    useEffect(() => {
        const { businessId } = router.query;

        if( businessId && !businessStateValue.currentBusiness) {
            getBusinessData(businessId as string);
        }
    })
    
    return {
        
        businessStateValue,
        //onRecommendOrUnrecommendBusiness,
        loading,
    }
}
export default useBusinessData;