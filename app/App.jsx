import { WalletKitProvider } from '@mysten/wallet-kit';
import { WalletContent } from './WalletContent';
import './App.css';

export default function App() {
  return (
    <WalletKitProvider>
      <div className="App">
        <WalletContent />
      </div>
    </WalletKitProvider>
  );
}