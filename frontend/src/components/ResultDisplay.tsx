import {
  Box,
  Text,
  VStack,
  Progress,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

interface ResultDisplayProps {
  score: number;
  comment: string;
}

export default function ResultDisplay({ score, comment }: ResultDisplayProps) {
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // 根據分數決定進度條顏色
  const getProgressColor = (score: number) => {
    if (score <= 2) return 'red';
    if (score <= 3) return 'yellow';
    if (score <= 4) return 'blue';
    return 'green';
  };

  return (
    <Box
      p={6}
      borderRadius="lg"
      bg={bgColor}
      borderWidth={1}
      borderColor={borderColor}
    >
      <VStack spacing={4} align="stretch">
        <Heading size="md" textAlign="center">
          分析結果
        </Heading>

        <Box>
          <Text mb={2} fontSize="sm" color="gray.500">
            顏值評分
          </Text>
          <Progress
            value={(score / 5) * 100}
            colorScheme={getProgressColor(score)}
            height="32px"
            borderRadius="full"
          />
          <Text
            position="absolute"
            width="100%"
            textAlign="center"
            mt="-28px"
            fontSize="lg"
            fontWeight="bold"
            color="white"
            textShadow="0 0 4px rgba(0,0,0,0.3)"
          >
            {score.toFixed(1)} / 5.0
          </Text>
        </Box>

        <Box>
          <Text mb={2} fontSize="sm" color="gray.500">
            AI 毒舌評論
          </Text>
          <Text
            p={4}
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="md"
            borderWidth={1}
            borderColor={borderColor}
            fontSize="lg"
          >
            {comment}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
} 