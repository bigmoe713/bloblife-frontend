import { WalletKitProvider } from '@mysten/wallet-kit';
import { WalletContent } from './WalletContent';
import './App.css';

export default function App() {
  return (
    <WalletKitProvider features={['sui:signAndExecuteTransaction']} 
      customStyle={{
        '--wkit-modal-background': 'url(/images/background_bloblife.png)',
        '--wkit-modal-background-size': 'cover',
        '--wkit-modal-background-position': 'center'
      }}
    >
      <div className="App">
        <WalletContent />
      </div>
    </WalletKitProvider>
  );
}