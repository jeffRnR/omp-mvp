import { auth, firestore } from '@/firebase/clientApp';
import { getStorage, ref } from 'firebase/storage';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, Text, Input, MenuDivider, Select } from '@chakra-ui/react';
import { doc, getDoc, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import SearchBox from './BusinessLocation/SearchBox';
import { useRecoilValue } from 'recoil';
import { Business, businessState } from '@/atoms/businessesAtom';
import { useRouter } from 'next/router';

type CreateBusinessModalProps = {
  open: boolean;
  handleClose: () => void;
  
};



const CreateBusinessModal: React.FC<CreateBusinessModalProps> = ({
  open,
  handleClose,
  
}) => {
  const [user] = useAuthState(auth);
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [numberOfEmployees, setNumberOfEmployees] = useState(1);
  const [tillNumber, setTillNumber] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const businessStateSnapshot = useRecoilValue(businessState);
  const router = useRouter();
  //const { toogleMenuOpen } = useDirectory();

  const categories = [
    'Apparel and accessories',
    'Beauty and personal care',
    'Books, movies and music',
    'Computers and electronics',
    'Food and beverage',
    'Furniture and home decor',
    'Health and wellness',
    'Home and garden',
    'Jewelry and watches',
    'Kids and baby roducts',
    'Office supplies and equipments',
    'Pet supplies',
    'Sports and outdoors',
    'Toys and games',
    'Vehicles and automotive',
    'Party supplies',
    'Alcohol beverages'
  ];

  const validatePhoneNumber = (phoneNumber: string) => {
    const kenyanPhoneNumberRegex = /^(\+?254|0)[17]\d{8}$/; // Regex to match Kenyan phone numbers
    return kenyanPhoneNumberRegex.test(phoneNumber);
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleCreateBusiness = async () => {
    if (error) setError("");
    //validate the business name
    const format = /[`!@#$%^&*()+=\[\]{};':"\\|,.<>\?~]/
    if (format.test(businessName)) {
      setError('Business names can only contain letters, numbers or underscores');
      return;
    }
    setLoading(true);

    try {
      const businessNameDocRef = doc(firestore, 'businesses', businessName);

      await runTransaction(firestore, async (transaction) => {
        const businessDoc = await transaction.get(businessNameDocRef);
        if (businessDoc.exists()) {
          throw new Error(`Sorry, this business name is being used by another business. Try another`);
        }
        
        

        //create business
        await transaction.set(businessNameDocRef, {
          businessOwner: user?.uid,
          businessDescription: businessDescription,
          businessCategory: selectedCategory,
          businessPhoneNumner: phoneNumber,
          businessEmployees: numberOfEmployees,
          businessTillNumber: tillNumber,
          numberOfRecommendations: 1,
          createdAt: serverTimestamp(),
          imageURL: '',
          address: address,
          latitude: latitude,
          longitude: longitude,
        });

        // create businessSnippet on user
        transaction.set(doc(firestore, `users/${user?.uid}/businessSnippets`, businessName),{
          businessId: businessName,
          isOwner: true,
          imageURL: '',
        })

      });
      handleClose();

      router.push(`/businesses/${businessName}`);
    } catch (error:any) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      isCentered
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Business</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Text mb={2}>Business Name:</Text>
            <Input
              placeholder="Enter Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </Box>

          <Box mt={4}>
            <Text mb={2}>Business Description:</Text>
            <Input
              placeholder="Enter Business Description"
              value={businessDescription}
              onChange={(e) => setBusinessDescription(e.target.value)}
            />
          </Box>

          <Box mt={4}>
            <Text mb={2}>Category:</Text>
            <Select
              placeholder="Select Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {filteredCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </Box>

          <Box mt={4}>
            <Text mb={2}>Phone Number:</Text>
            <Input
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Box>

          <Box mt={4}>
            <Text mb={2}>Number of Employees:</Text>
            <Input
              type="number"
              placeholder="Enter Number of Employees"
              value={numberOfEmployees}
              onChange={(e) => setNumberOfEmployees(Number(e.target.value))}
            />
          </Box>

          <Box mt={4}>
            <Text mb={2}>Till Number:</Text>
            <Input
              placeholder="Enter Till Number"
              value={tillNumber}
              onChange={(e) => setTillNumber(e.target.value)}
            />
          </Box>

          <Box mt={4}>
            <Text mb={2}>Business Location:</Text>
            <SearchBox
              onSelectAddress={(address, latitude, longitude) => {
                setAddress(address);
                setLatitude(latitude);
                setLongitude(longitude);
              }}
              defaultValue={searchValue}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={handleClose}>Cancel</Button>
          <Button colorScheme="blue" ml={3} onClick={handleCreateBusiness} isLoading={loading}>Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateBusinessModal;
function useDirectory() {
  throw new Error('Function not implemented.');
}

