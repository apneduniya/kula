'use client'

import { WalletConnectButton } from '@solana/wallet-adapter-react-ui'

export function Header() {
  return (
    <header className="w-full fixed top-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-b z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Kula</div>
        <WalletConnectButton />
      </div>
    </header>
  )
} 