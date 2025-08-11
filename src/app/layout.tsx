import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'eight_portforio',
  description: 'eight_portforio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
