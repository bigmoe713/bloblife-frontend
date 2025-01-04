'use client';
import Image from 'next/image';
import { ConnectButton, useWalletKit } from '@mysten/wallet-kit';
import { useState, useEffect } from 'react';
import { SuiClient } from '@mysten/sui.js/client';
import { NETWORK_CONFIG } from '../config';
import '../../styles/WalletContent.css';
import { CountdownTimer } from '../components/CountdownTimer';

const NFTRY_TYPE = '0x5fb957b59e6b093c17eb3f0ca0a3e8762530244f1a22bc1c1b8d37e743e3450e::nftry::NFTRY';

export function WalletContent() {
  // ... rest of your component logic ...
  return (
    <div className="landing-page">
      <Image 
        src="/images/background_bloblife.png"
        alt="Background"
        fill
        style={{ objectFit: 'contain' }}
      />
      <div className="top-nav">
        <ConnectButton />
      </div>
    </div>
  );
}