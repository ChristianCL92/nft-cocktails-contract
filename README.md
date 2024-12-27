## UniqueCocktailNfts Smart Contract 🍸

The smart contract component of the UniqueCocktailNfts project, enabling users to mint unique cocktail NFTs on the Ethereum Sepolia testnet. 
This contract implements ERC721 functionality with custom minting limitations and metadata handling.

- ERC721 compliant NFT implementation
- Limited minting per wallet (2 per cocktail)
- Total supply cap of 10,000 NFTs
- Custom metadata URI handling pointing to GitHub
- Built with OpenZeppelin contracts for security
- Owner management functionality
- Event emission for minting tracking

## Frontend Integration

This contract is used by the UniqueCocktailNfts frontend application.
See the frontend repository for the complete dapp implementation.


## Prerequisities

Make sure you have:

- Node.js
- Hardhat development environment
- OpenZeppelin Contracts
- An Alchemy API key for Sepolia testnet (Or other like Infuria)
- Sepolia testnet ETH for deployment

## Installation

1. Clone the repository

git clone [Respository URL]

cd into the directory

2. Install dependencies:

- npm install

3. Create a .env file with the following variables:

- ETHERSCAN_API_KEY=your_etherscan_api_key
- ALCHEMY_API_KEY=your_alchemy_api_key
- PRIVATE_KEY=your_wallet_private_key

## Contract Architecture

The contract inherits from several OpenZeppelin contracts:

- ERC721 - Base NFT functionality
- ERC721URIStorage - Metadata storage
- Ownable - Owner management

## Deployment

1. Configure network in hardhat.config.js
2. Deploy to Sepolia:

- npx hardhat ignition deploy ignition/modules/NFT-Cocktails.ts --network sepolia --verify (verify is optional bur recommended)

## Testing

- npx hardhat test