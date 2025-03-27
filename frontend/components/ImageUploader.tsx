import { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Image,
  useToast,
  Text,
} from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import axios from 'axios';

interface ImageUploaderProps {
  onResult: (result: { score: number; comment: string }) => void;
}

export default function ImageUploader({ onResult }: ImageUploaderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 檢查文件大小（最大 5MB）
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: '錯誤',
          description: '圖片大小不能超過 5MB',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // 檢查文件類型
      if (!file.type.startsWith('image/')) {
        toast({
          title: '錯誤',
          description: '請選擇圖片文件',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      toast({
        title: '錯誤',
        description: '請先選擇一張圖片',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // 將 base64 圖片轉換為 Blob
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      
      // 創建 FormData
      const formData = new FormData();
      formData.append('file', blob, 'image.jpg');

      // 發送請求到後端
      const result = await axios.post('http://localhost:8000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 秒超時
      });

      if (result.data.score === undefined || result.data.comment === undefined) {
        throw new Error('伺服器返回格式錯誤');
      }

      onResult(result.data);
      
      toast({
        title: '分析完成',
        description: '已成功分析您的照片',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error('上傳失敗:', error);
      
      let errorMessage = '圖片上傳失敗，請稍後再試';
      
      if (error.response) {
        // 伺服器返回錯誤
        errorMessage = error.response.data.detail || errorMessage;
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = '請求超時，請稍後再試';
      } else if (!navigator.onLine) {
        errorMessage = '網絡連接失敗，請檢查您的網絡連接';
      }
      
      toast({
        title: '錯誤',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing={4} align="center">
      <Box
        borderWidth={2}
        borderStyle="dashed"
        borderRadius="lg"
        p={6}
        w="100%"
        textAlign="center"
        position="relative"
        _hover={{ borderColor: 'blue.500' }}
        transition="all 0.2s"
      >
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          opacity={0}
          cursor="pointer"
        />
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt="預覽"
            maxH="300px"
            mx="auto"
            objectFit="contain"
          />
        ) : (
          <VStack spacing={2}>
            <AttachmentIcon boxSize={8} />
            <Text>點擊或拖放圖片到這裡</Text>
            <Text fontSize="sm" color="gray.500">
              支持 JPG、PNG 格式，最大 5MB
            </Text>
          </VStack>
        )}
      </Box>

      <Button
        colorScheme="blue"
        onClick={handleUpload}
        isLoading={isLoading}
        loadingText="分析中..."
        w="200px"
        isDisabled={!selectedImage}
      >
        開始分析
      </Button>
    </VStack>
  );
} 