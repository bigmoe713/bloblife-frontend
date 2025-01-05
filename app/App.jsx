import { WalletKitProvider } from '@mysten/wallet-kit';
import { WalletContent } from './WalletContent';
import './App.css';

export default function App() {
  return (
    <WalletKitProvider features={['sui:signAndExecuteTransaction']}
      customTheme={{
        '--wkit-accent-hs': '252, 100%',
        '--wkit-on-accent-rgb': '255, 255, 255',
        '--wkit-bg-rgb': '0, 0, 0',
        '--wkit-modal-bg': `url('/images/background_bloblife.png')`,
        '--wkit-modal-bg-size': 'cover'
      }}
    >
      <div className="App">
        <WalletContent />
      </div>
    </WalletKitProvider>
  );
}