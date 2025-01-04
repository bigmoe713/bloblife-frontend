'use client';
import { WalletKitProvider } from '@mysten/wallet-kit';

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body>
        <WalletKitProvider>
          {children}
        </WalletKitProvider>
      </body>
    </html>
  );
}