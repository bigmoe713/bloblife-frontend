import { ConnectButton, useWalletKit } from '@mysten/wallet-kit';
import { useState, useEffect } from 'react';
import { SuiClient } from '@mysten/sui.js/client';
import { NETWORK_CONFIG } from './config';
import '../styles/WalletContent.css';
import { CountdownTimer } from './CountdownTimer';

const NFTRY_TYPE = '0x5fb957b59e6b093c17eb3f0ca0a3e8762530244f1a22bc1c1b8d37e743e3450e::nftry::NFTRY';
export default function WalletContent() {
  const { currentAccount } = useWalletKit();
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function checkAccess() {
      if (currentAccount) {
        setIsChecking(true);
        try {
          // Dev wallet whitelist check
          if (currentAccount.address === '0x44b492576cee496211d375fbb71405af447f0dc31fd909b25a53fdc70e67c4ad') {
            setHasAccess(true);
            setIsChecking(false);
            return;
          }
          // Regular NFTRY check
          const provider = new SuiClient({ url: NETWORK_CONFIG.rpcUrl });
          const objects = await provider.getOwnedObjects({
            owner: currentAccount.address,
            options: { showType: true }
          });
          
          setHasAccess(objects.data.some(obj => 
            obj.data?.type?.includes(NFTRY_TYPE)
          ));
        } catch (error) {
          console.error('Access check failed:', error);
          setHasAccess(false);
        }
        setIsChecking(false);
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
        Sorry, you need a NFTRY Pass to enter the BlobLife ecosystem!
      </div>
      <div className='reject-message reject-message-bottom'>
        Get your NFTRY Pass to unlock exclusive content!
      </div>
    </div>
  );
  }
