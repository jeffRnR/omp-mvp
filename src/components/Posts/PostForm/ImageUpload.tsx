import { Button, Flex, Image, Stack, Text } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

type ImageUploadProps = {
  selectedFiles: File[];
  onSelectImage: (files: FileList | null) => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFiles,
  onSelectImage,
  setSelectedFiles,
  setSelectedTab,
}) => {
  const selectedFilesRef = useRef<HTMLInputElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleRemoveImage = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    setCurrentImageIndex(0);
  };

  const handleAddAnotherImage = () => {
    if (selectedFilesRef.current) {
      selectedFilesRef.current.value = ''; // Clear the value of the file input
      selectedFilesRef.current.click(); // Trigger the file input to open the file selection dialog
    }
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedFiles.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedFiles.length - 1 ? 0 : prevIndex + 1
    );
  };

  const imageCount = selectedFiles.length;
  const currentImageCount = currentImageIndex + 1;

  return (
    <Flex justify="center" align="center" width="100%" direction="column">
      {selectedFiles.length > 0 ? (
        <Flex direction="column" alignItems="center">
          <Image
            src={URL.createObjectURL(selectedFiles[currentImageIndex])}
            maxWidth="400px"
            maxHeight="400px"
            mb={4}
          />
          <Stack direction="row" mt={2}>
            <Button
              height="28px"
              onClick={() => setSelectedTab('Item')}
            >
              Proceed
            </Button>
            <Button
              height="28px"
              variant="outline"
              onClick={() => handleRemoveImage(currentImageIndex)}
            >
              Remove
            </Button>
          </Stack>
          <Flex direction="row" mt={2}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePreviousImage}
              disabled={imageCount === 1}
              mx={1}
            >
              <ChevronLeftIcon boxSize={4} />
            </Button>
            <Flex direction='row' align='center' justify='center'>
                <Text fontSize='10pt'>
                {currentImageCount}/{imageCount}
                </Text>
                <Button
                variant="ghost"
                size="sm"
                onClick={handleNextImage}
                disabled={imageCount === 1}
                mx={1}
                >
                <ChevronRightIcon boxSize={4} />
                </Button>
            </Flex>           
          </Flex>
        </Flex>
      ) : (
        <Flex
          justify="center"
          align="center"
          p={20}
          border="1px dashed"
          borderColor="gray.300"
          width="100%"
          borderRadius={4}
        >
          <Button
            variant="outline"
            height="20px"
            onClick={() => selectedFilesRef.current?.click()}
          >
            Upload
          </Button>
          <input
            ref={selectedFilesRef}
            type="file"
            multiple
            hidden
            onChange={(event) => onSelectImage(event.target.files)}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default ImageUpload;
