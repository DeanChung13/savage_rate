import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: '毒舌顏值評分系統',
  description: '使用AI來評估你的顏值，並給出毒舌評論！',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body style={{ margin: 0 }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 