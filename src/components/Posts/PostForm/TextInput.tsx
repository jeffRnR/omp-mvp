import { Button, Flex, Input, Stack, Textarea, Text } from '@chakra-ui/react';
import React from 'react';



type TextInputProps = {
    textInputs: {
        title: string;
        price: number;
        body: string;
    };
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleCreatePost: () => void;
    loading: boolean;
};


const TextInput:React.FC<TextInputProps> = ({ 
    textInputs, 
    onChange,
    handleCreatePost,
    loading,
}) => {
    
    
    return (
        <Stack spacing={3} width='100%' >
            <Input
                name='title'
                value={textInputs.title}
                onChange={onChange}
                fontSize='10pt'
                borderRadius={4}
                placeholder='Item Name'
                _placeholder={{ color: 'gray.500'}}
                _focus={{ 
                    outline: 'none', 
                    bg: 'white', 
                    border: '1px solid', 
                    borderColor:'black'
                }}
             />
             <Input
                name='price'
                value={textInputs.price}
                onChange={onChange}
                type='numer'
                step='1'
                fontSize='10pt'
                borderRadius={4}
                onFocus={(e) => e.target.placeholder = 'Ksh'}
                onBlur={(e) => e.target.placeholder = 'Item Price (Ksh)'}
                placeholder='Item Price (Ksh)'
                _placeholder={{ color: 'gray.500'}}
                _focus={{ 
                    outline: 'none', 
                    bg: 'white', 
                    border: '1px solid', 
                    borderColor:'black'
                }}
                pattern='[0-9]*'
             />
            
            <Textarea 
                name='body'
                value={textInputs.body}
                onChange={onChange}
                fontSize='10pt'
                borderRadius={4}
                height='100px'
                placeholder='Item Description'
                _placeholder={{ color: 'gray.500'}}
                _focus={{ 
                    outline: 'none', 
                    bg: 'white', 
                    border: '1px solid', 
                    borderColor:'black'
                }}
            />
            <Flex justify='flex-end'>
                <Button 
                    height='34px' 
                    padding='0px 30px' 
                    disabled={!textInputs.title}
                    isLoading={loading}
                    onClick={handleCreatePost}
                >
                    Post
                </Button>
            </Flex>
        </Stack>
    )
}
export default TextInput;