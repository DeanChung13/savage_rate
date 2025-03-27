import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('/api/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: '分析失敗，請再試一次' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">毒舌顏值評分</h1>
            <p className="text-gray-600 mb-8">上傳一張正面照片，讓 AI 毒舌點評你的顏值</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                選擇照片
              </label>
            </div>

            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full h-auto rounded-lg mx-auto"
                />
              </div>
            )}

            {preview && (
              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
                >
                  {loading ? '分析中...' : '開始分析'}
                </button>
              </div>
            )}

            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">AI 毒舌評價:</h2>
                <p className="text-gray-700">{result.comment}</p>
                <p className="text-lg font-bold mt-2">顏值評分: {result.score}/5</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 