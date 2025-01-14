import { ConnectButton, useWalletKit } from '@mysten/wallet-kit';
import { useState, useEffect } from 'react';
import { SuiClient } from '@mysten/sui.js/client';
import { NETWORK_CONFIG, NFTRY_TYPE } from '../config';
import '../styles/WalletContent.css';
import { CountdownTimer } from './CountdownTimer';

export default function WalletContent() {
  const { currentAccount } = useWalletKit();
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    async function checkAccess() {
      if (!currentAccount) return;
      setIsLoading(true);
      try {
        // Dev wallet override
        if (currentAccount.address === '0x44b492576cee496211d375fbb71405af447f0dc31fd909b25a53fdc70e67c4ad') {
          setHasAccess(true);
          return;
        }
  
        const provider = new SuiClient({ url: NETWORK_CONFIG.fullnode });
        
        // Get transfer receipt
        const receiptId = '0x9e722e13dd3c633bbc704bb5371c406353acef08d3b52b08a05db73da7351f6e';
        const receipt = await provider.getObject({
          id: receiptId,
          options: { showContent: true }
        });
        
        console.log('Transfer receipt:', receipt);
        
        // Check if receipt matches wallet
        const hasAccess = receipt.data?.content?.fields?.owner === currentAccount.address;
        setHasAccess(hasAccess);
      } catch (err) {
        console.error('Receipt check failed:', err);
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    }
    checkAccess();
  }, [currentAccount]);

  if (!currentAccount) {
    return (
      <div className='landing-page'>
        <img
          src='/images/background_bloblife.png'
          alt='Background'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.2)',
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain'
          }}
        />
        <div className='top-nav'>
          <ConnectButton />
        </div>
      </div>
    );
  }
  if (hasAccess) {
    return (
      <div className='countdown-page'>
        <img 
          src='/images/background_bloblife.png'
          alt='BlobLife'
          style={{
            position: 'absolute',
            top: '30px',
            left: '40px', 
            width: '280px',
            zIndex: 1000
          }}
        />
        <div className='top-nav'>
          <ConnectButton />
        </div>
        <div className='countdown-circle'>
          <CountdownTimer />
        </div>
        <div className='nft-container' style={{position: 'absolute', right: '50px', top: '63%'}}>
          <a href='https://www.tradeport.xyz/sui/collection/0x3b653bb66101a001ca088c852b7fb967691b0c181eb73414f0498344ff8c9f48?tab=mint&bottomTab=trades&mintTokenId=9bf11e8f-4112-4a44-a12c-35816b90c7a9' target='_blank' rel='noopener noreferrer'>
            <img 
              src='/images/walrus1.webp'
              alt='Walrus NFT'
              style={{width: '200px', transform: 'scale(1.0)'}}
            />
          </a>
          <div className=' probably-nothing' style={{marginTop: '2px', textAlign: 'center', fontSize: '24px', fontWeight: 700}}>probably nothing</div>
<div className='shrug-bold' style={{textAlign: 'center', fontSize: '28px', fontWeight: 800}}> ¯\_(ツ)_/¯</div>
        </div>
      </div>
    );
  }
  return (
    <div className='landing-page'>
      <img
        src='/images/background_bloblife.png'
        alt='Background'
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1.2)',
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain'
        }}
      />
      <div className='top-nav'>
        <ConnectButton />
      </div>
      <div className='reject-message reject-message-top'>
        ACCESS DENIED!
      </div>
      <div className='reject-message reject-message-bottom'>
        ACCESS DENIED! 
      </div>
    </div>
  );
  }
