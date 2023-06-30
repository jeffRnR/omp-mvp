import { businessState } from '@/atoms/businessesAtom';
import { DirectoryMenuItem, directoryMenuState } from '@/atoms/directoryMenuAtom';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FaSmile } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';


export const useDirectory = () => {
    const [directoryState, setDirectoryState] = useRecoilState(directoryMenuState);
    const router = useRouter();
    const businessStateValue = useRecoilValue(businessState)

    const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
        setDirectoryState(prev => ({
            ...prev,
            selectedMenuItem: menuItem
        }));

        router.push(menuItem.link);
        if (directoryState.isOpen){
            toogleMenuOpen();
        }
        
    }

    const toogleMenuOpen = () => {
        setDirectoryState(prev => ({
            ...prev,
            isOpen: !directoryState.isOpen,
        }));
    };

    useEffect(() => {
        const { currentBusiness } = businessStateValue;
        if(currentBusiness){
            setDirectoryState((prev) => ({
                ...prev,
                selectedMenuItem: { 
                    displayText: currentBusiness.id, 
                    link: `/${currentBusiness.id}`,
                    imageURL: currentBusiness.imageURL,
                    icon: FaSmile,
                    iconColor: 'blue.500'
                }
            }))
        }
    }, [businessStateValue.currentBusiness])
    
    return  { directoryState, toogleMenuOpen, onSelectMenuItem };
}
export default useDirectory;