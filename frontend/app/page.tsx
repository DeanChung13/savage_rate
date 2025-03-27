'use client';

import { Box, Container, Heading, Text } from '@chakra-ui/react';
import ImageUploader from '@/components/ImageUploader';
import ResultDisplay from '@/components/ResultDisplay';
import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState<{
    score: number;
    comment: string;
  } | null>(null);

  return (
    <Container maxW="container.md" py={10}>
      <Box textAlign="center" mb={10}>
        <Heading as="h1" size="2xl" mb={4}>
          毒舌顏值評分系統
        </Heading>
        <Text fontSize="lg" color="gray.600">
          上傳你的照片，讓AI來毒舌一下你的顏值！
        </Text>
      </Box>

      <Box mb={10}>
        <ImageUploader onResult={setResult} />
      </Box>

      {result && (
        <Box mt={8}>
          <ResultDisplay score={result.score} comment={result.comment} />
        </Box>
      )}
    </Container>
  );
} 