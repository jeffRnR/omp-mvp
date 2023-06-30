import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Flex, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import TabItemComponent from './TabItem';
import TextInput from './PostForm/TextInput';
import ImageUpload from './PostForm/ImageUpload';
import { Post } from '@/atoms/PostAtom';
import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  getDoc,
  doc,
} from 'firebase/firestore';
import { firestore, storage } from '@/firebase/clientApp';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

type NewPostFormProps = {  
  user: User;
  businessImageURL?: string;
};

type TabItem = {
  title: string;
  icon: typeof IoDocumentText;
};


const formTabs: TabItem[] = [
  {
    title: 'Image',
    icon: IoImageOutline,
  },
  {
    title: 'Item',
    icon: IoDocumentText,
  },
];

const NewPostForm: React.FC<NewPostFormProps> = ({ user, businessImageURL }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);

  const [textInputs, setTextInputs] = useState({
    title: '',
    price: 0,
    body: '',
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const { businessId } = router.query;

  useEffect(() => {
    const fetchBusinessLocation = async () => {
      try {
        const businessDocRef = doc(firestore, 'businesses', businessId as string);
        const businessDocSnap = await getDoc(businessDocRef);
        if (businessDocSnap.exists()) {
          const businessData = businessDocSnap.data();
          if (businessData && businessData.latitude && businessData.longitude) {
            setLatitude(businessData.latitude);
            setLongitude(businessData.longitude);
          }
        }
      } catch (error) {
        console.log('Error fetching business location:', error);
      }
    };

    if (businessId) {
      fetchBusinessLocation();
    }
  }, [businessId]);

  const handleCreatePost = async () => {
    const commissionPercentage = 0.1; // Assuming a 10% commission
  
    const priceWithCommission = +textInputs.price + +(textInputs.price * commissionPercentage);
  
    const newPost: Post = {
      id: '',
      imageURLs: [],
      businessId: businessId as string,
      businessImageURL: businessImageURL || '',
      creatorId: user?.uid!,
      creatorDisplayName: user.email!.split('@')[0],
      title: textInputs.title,
      price: priceWithCommission,
      body: textInputs.body,
      numberOfComments: 0,
      createdAt: serverTimestamp() as Timestamp,
      latitude: latitude,
      longitude: longitude,
    };
  
    setLoading(true);
  
    try {
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);
      const postId = postDocRef.id;
      
      const updatedPost = { ...newPost, id: postId};

      await updateDoc(postDocRef, updatedPost);

  
      if (selectedFiles.length > 0) {
        const imageURLs: string[] = [];
  
        for (const file of selectedFiles) {
          const reader = new FileReader();
  
          reader.onload = async (event) => {
            if (event.target && event.target.result) {
              const dataUrl = event.target.result as string;
  
              const imageRef = ref(
                storage,
                `posts/${postDocRef.id}/${file.name}`
              );
  
              await uploadString(imageRef, dataUrl, 'data_url');
              const downloadURL = await getDownloadURL(imageRef);
              imageURLs.push(downloadURL);
  
              if (imageURLs.length === selectedFiles.length) {
                await updateDoc(postDocRef, {
                  imageURLs,
                });
              }
            }
          };
  
          reader.readAsDataURL(file);
        }
      }
      router.back();
    } catch (error) {
      console.log('Error creating post:', error);
      setError(true);
    }
  
    setLoading(false);
  };
  

  const onSelectImage = (files: FileList | null) => {
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTextInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item) => (
          <TabItemComponent
            key={item.title}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === 'Item' && (
          <TextInput
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
        )}
        {selectedTab === 'Image' && (
          <ImageUpload
            selectedFiles={selectedFiles}
            onSelectImage={onSelectImage}
            setSelectedTab={setSelectedTab}
            setSelectedFiles={setSelectedFiles}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>Error creating post</AlertDescription>
        </Alert>
      )}
    </Flex>
  );
};

export default NewPostForm;
