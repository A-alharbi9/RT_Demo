import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Redtag Portal',
  description: 'A Redtag employee portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
