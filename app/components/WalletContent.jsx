// components/WalletContent.jsx
'use client';
import { ConnectButton, useWalletKit } from '@mysten/wallet-kit';
import { useState, useEffect } from 'react';
import '../styles/App.css';

const PARTNERS = [
  {
    name: "BlobLife Labs",
    logo: "/images/partners/bloblife.png",
    description: "Walrus Community Ecosystem Build",
    url: "https://x.com/BlobLifeLabs"
  },
  {
    name: "NFTRY Pass",
    logo: "/images/partners/nftry.png",
    description: "Your entry to all things BlobLife",
    url: "https://www.tradeport.xyz/sui/collection/bloblifelabs-nftry-pass?bottomTab=trades&tab=items"
  },
  {
    name: "Probably Nothing - Walrus #1",
    logo: "/images/partners/walrus1.png",
    description: "BlobLife's first Open Edition",
    url: "https://www.tradeport.xyz/sui/collection/0x3b653bb66101a001ca088c852b7fb967691b0c181eb73414f0498344ff8c9f48?bottomTab=trades&tab=items"
  },
  {
    name: "TradePort NFT Marketplace",
    logo: "/images/partners/tradeport.png",
    description: "Multichain NFT Marketplace and Developer APIs",
    url: "https://www.tradeport.xyz/"
  },
  {
    name: "DeLorean Labs",
    logo: "/images/partners/delorean.png",
    description: "Driving the future with $DMC and those who dare to change systems",
    url: "https://deloreanlabs.com/"
  },
  {
    name: "Tusky",
    logo: "/images/partners/tusky.png",
    description: "Own your data with decentralized storage, end-to-end encryption and a killer UX.",
    url: "https://app.tusky.io/connect"
  },
  {
    name: "Walrus Sanke Game",
    logo: "/images/partners/snake.png",
    description: "The classic snake arcade game,reimagined with a walrus",
    url: "https://5r36syjf7v90q55hqrl2fwhf4bk9zl424frr12fddbqhf7ikju.walrus.site/"
  },
  // Add more partners as needed...
];

export default function WalletContent() {
  const { currentAccount } = useWalletKit();
  const [hasAccess, setHasAccess] = useState(false);
  const [forceCheck, setForceCheck] = useState(0);

  useEffect(() => {
    // Grant access immediately when wallet connects
    setHasAccess(!!currentAccount);
  }, [currentAccount, forceCheck]);

  if (!currentAccount) {
    return (
      <div className='landing-page'>
        <img
          src='/images/background_bloblife.png'
          alt='Background'
          className="background-image"
        />
        <div className='top-nav'>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="partner-directory">
      <div className="top-nav">
        <ConnectButton />
        <button 
          className="refresh-button"
          onClick={() => setForceCheck(p => p + 1)}
          title="Refresh connection status"
        >
          ↻ Recheck Access
        </button>
      </div>
      
      <div className="partner-grid">
        {PARTNERS.map((partner) => (
          <a
            key={partner.name}
            href={partner.url}
            className="partner-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img 
              src={partner.logo} 
              alt={partner.name} 
              className="partner-logo"
            />
            <div className="partner-info">
              <h3>{partner.name}</h3>
              <p>{partner.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}