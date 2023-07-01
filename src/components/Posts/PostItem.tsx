import { Post } from '@/atoms/PostAtom';
import { Flex, Stack, Text, Image, Icon, Skeleton } from '@chakra-ui/react';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { BsChat, BsDot, BsJustifyLeft } from 'react-icons/bs';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { IoArrowRedoOutline } from 'react-icons/io5';
import { AiOutlineDelete } from 'react-icons/ai';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the styles
import { Carousel } from 'react-responsive-carousel';
import { getDistance } from 'geolib';
import { FaSmile } from 'react-icons/fa';
import Link from 'next/link'; 



type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  onPlaceOrder: (post: Post) => void;
  userLatitude: number;
  userLongitude: number;
  homePage?: boolean;
};

const products = [

]

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  onDeletePost,
  onSelectPost,
  onPlaceOrder,
  userLatitude,
  userLongitude,
  homePage,
}) => {
  const {
    creatorDisplayName,
    createdAt,
    title,
    body,
    imageURLs,
    price,
    numberOfComments,
    latitude,
    longitude,
  } = post;

  const [cartVisibility, setCartVisibility] = useState(false);

  const [productsInCart, setProducts] = useState([])

  const formattedDate = moment(createdAt?.seconds * 1000).fromNow();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageChange = (selectedIndex: number) => {
    setCurrentImageIndex(selectedIndex);
  };

  const [loadingImage, setLoadingImage] = useState(true);
  const [error, setError] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);

  const handleDelete = async () => {
    try {
      const success = await onDeletePost(post);

      if (!success) {
        throw new Error("Failed to delete post");
      }

      console.log("Post was successfully deleted");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): string => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInKm = R * c; // Distance in km
    const distanceInMeters = distanceInKm * 1000; // Distance in meters
  
    return `${distanceInKm.toFixed(2)} km (${distanceInMeters.toFixed(2)} meters)`;
  };
  
  


  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;
          const calculatedDistance = calculateDistance(
            userLatitude,
            userLongitude,
            latitude,
            longitude
          );
          setDistance(parseFloat(calculatedDistance));
        },
        (error) => {
          console.log('Geolocation error:', error);
        }
      );
    }
  }, [latitude, longitude]);

  

  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor="gray.200"
      borderRadius={10}
      _hover={{ borderColor: 'gray.500' }}
      cursor="pointer"
      /*onClick={() => onSelectPost && onSelectPost(post)}*/
      
    >
      
      <Flex direction="column" width="100%" >
        <Stack spacing={1} p="10px">
          <Stack direction="row" align="center" fontSize="9pt">
            {/* Home page check */}
            {homePage && (
              <>
                {post.businessImageURL ? (
                  <Image 
                    src={post.businessImageURL} 
                    borderRadius='full'
                    boxSize='24px'
                    mr={2}
                  />
                ) : (
                  <Icon as={FaSmile} fontSize='18pt' mr={1} color='blue.500'> </Icon>
                )}
                <Link href={`/businesses/${post.businessId}`}>
                  <Text 
                    fontWeight={700} 
                    _hover={{ textDecoration:'underline'}}
                    onClick={event => event.stopPropagation()}
                  >{`${post.businessId}`}</Text>
                </Link>
                <Icon as={BsDot} m={-1} color='gray.500' fontSize={8}/>
              </>
            )}
            <Text>Posted by</Text>
            <Text fontWeight={600}> {creatorDisplayName}</Text>
            <Text>{"      "}</Text>
            <Text fontStyle="italic">{formattedDate}</Text>
          </Stack>
          <Text fontSize="12pt" fontWeight={600}>
            {title}
          </Text>
          <Text fontSize="10pt">{body}</Text>
          {imageURLs && imageURLs.length > 0 && (
            <Flex justify="center" align="center" p={2} direction='column'>
              {loadingImage && (
                <Skeleton height='200px' width='100%' borderRadius={4} />
              )}
              <Carousel
                selectedItem={currentImageIndex}
                onChange={handleImageChange}
                showArrows={true}
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
              >
                {imageURLs.map((imageURL, index) => (
                  <div key={index}>
                    <Image
                      src={imageURL}
                      maxHeight="460px"
                      alt={`Post Image ${index + 1}`}
                      display={loadingImage ? 'none' : 'unset'}
                      onLoad={() => setLoadingImage(false)}
                    />
                  </div>
                ))}
              </Carousel>
              <Text fontSize="10pt" mt={2}>{`${currentImageIndex + 1}/${imageURLs.length}`}</Text>
            </Flex>
          )}
          <Stack direction="row" spacing={5}>
            <Text fontSize="11pt" fontWeight={600}>Ksh {price}</Text>
            {distance !== null && (
              <Text fontSize="11pt" fontWeight={600} ml={6}>
                {distance}m away
              </Text>
            )}
          </Stack>
        </Stack>
        <Flex ml={1} mb={0.5} color={'gray.500'} direction='row'>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: 'gray.300' }}
            cursor="pointer"
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize="9pt">{numberOfComments}</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: 'gray.300' }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="9pt">share</Text>
          </Flex>
          {!userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: 'gray.300' }}
              cursor="pointer"
              onClick={() => setCartVisibility(true)}
            >
              <Icon as={HiOutlineShoppingBag} mr={2} />
              <Text fontSize="9pt">Place order</Text>
            </Flex>
          )}
          {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: 'gray.300' }}
              cursor="pointer"
              onClick={handleDelete}
            >
              <Icon as={AiOutlineDelete} mr={2} />
              <Text fontSize="9pt">Delete</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
};

export default PostItem;
