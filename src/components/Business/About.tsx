import { Business, businessState } from '@/atoms/businessesAtom';
import { Box, Flex, Text, Icon, Stack, Divider, Button, Image, Spinner } from '@chakra-ui/react';
import { HiOutlineDotsHorizontal, HiCake } from 'react-icons/hi';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore, storage } from '@/firebase/clientApp';
import useSelectFile from '@/hooks/useSelectFile';
import { FaSmile } from 'react-icons/fa';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { useSetRecoilState } from 'recoil';

type AboutProps = {
    businessData: Business;
};

const About:React.FC<AboutProps> = ({ businessData }) => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const selectedFileRef = useRef<HTMLInputElement>(null);
    const { selectedFile, setSelectedFile, onSelectFile} = useSelectFile();
    const [uploadingImage, setUploadingImage] = useState(false);
    const setBusinessStateValue = useSetRecoilState(businessState);

    const onUpdateImage = async () => {
        if (!selectedFile) return;
        setUploadingImage(true);
        try {
            const imageRef = ref(storage, `businesses/${businessData.id}/image`);
            await uploadString(imageRef, selectedFile, 'data_url');
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(firestore, 'businesses', businessData.id), {
                imageURL: downloadURL,
            });

            setBusinessStateValue(prev => ({
                ...prev,
                currentBusiness: {
                    ...prev.currentBusiness,
                    imageURL: downloadURL,
                } as Business,
            }))
            
        } catch (error) {
            console.log('onUpdateImageError', error);
             
        }
        setUploadingImage(false);
    };

    return (
        <Box position='sticky' top='14px' width='100%'>
            <Flex 
                justify='space-between' 
                align='center' 
                bg={'blue.400'}
                color='whitesmoke'
                p={3}
                borderRadius='4px 4px 0px 0px'
            >
                <Text fontSize='10pt' fontWeight={700}>About Business</Text>
                <Icon as={HiOutlineDotsHorizontal}/>

            </Flex>

            <Flex
                direction='column'
                p={3}
                bg='white'
                borderRadius='0px 0px 4px 4px'
            >
                <Stack>
                    
                    <Flex direction='column' >
                        <Text fontSize='10pt' fontWeight={700}>Category</Text>
                        <Text fontSize='11pt' >{businessData.businessCategory}</Text>
                    </Flex>
                    <Flex direction='column' >
                        <Text fontSize='10pt' fontWeight={700}>Description</Text>
                        <Text fontSize='11pt' >{businessData.businessDescription}</Text>
                    </Flex>
                    <Flex direction='column' >
                        <Text fontSize='10pt' fontWeight={700}>Phone Number</Text>
                        <Text fontSize='11pt' >{businessData.businessPhoneNumner}</Text>
                    </Flex>
                    <Flex direction='column' >
                        <Text fontSize='10pt' fontWeight={700}>Address</Text>
                        <Text fontSize='11pt' >{businessData.address}</Text>
                    </Flex>

                    <Divider />  
                    <Flex 
                        align='center' 
                        width='100%' 
                        p={1}
                        fontWeight={500}
                        fontSize='10pt'
                    >
                        <Icon as={HiCake} fontSize={18} mr={2} color='magenta'/>
                        {businessData.createdAt && (
                            <Text>Created{" "} 
                                {moment(new Date(businessData.createdAt.seconds * 1000)).format('MMM DD, YYY')}
                            </Text>
                        )}
                    </Flex>                      
                    
                    {user?.uid === businessData.businessOwner && (
                        <>
                            <Link href={`/businesses/${router.query.businessId}/submit`}>
                                <Button mt={3} height='38px' width='100%'>Create Post</Button>
                            </Link>
                            <Divider />
                            <Stack spacing={1} fontSize='10pt'>
                                <Text fontWeight={600} fontSize='12pt'>Owner</Text>
                                <Flex align='center' justify='space-between'>
                                    <Text 
                                        color='blue.500' 
                                        cursor='pointer'
                                        _hover={{ textDecoration:'underline' }}
                                        onClick={() => selectedFileRef.current?.click()}
                                    >Change Image</Text>
                                    {businessData.imageURL || selectedFile ? (
                                        <Image src={selectedFile || businessData.imageURL} borderRadius='full' boxSize='40px' alt='Business Image'/>
                                    ) : (
                                        <Icon 
                                            as={FaSmile} 
                                            fontSize={40} 
                                            position='relative' 
                                            top={-3}
                                            color="blue.300"
                                            border='4px solid white'
                                            borderRadius='50%'
                                        />
                                    )}
                                </Flex>
                                {selectedFile && 
                                    (uploadingImage ? 
                                        <Spinner />
                                     : 
                                        <Text cursor='pointer' onClick={onUpdateImage}>Save Changes</Text>
                                                                      
                                )}
                                <input
                                    id='file-upload'
                                    type='file'
                                    accept='image/x-png, image/gif, image/jpeg'
                                    hidden
                                    ref={selectedFileRef}
                                    onChange={onSelectFile}
                                />
                            </Stack>
                        </>
                    )}
                </Stack>

            </Flex>
        </Box>
    )
}
export default About;