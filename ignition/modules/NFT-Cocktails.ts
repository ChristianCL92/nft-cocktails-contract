//ignition/modules/NFT-Cocktails.ts
import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import dotenv from "dotenv";
 
dotenv.config();

const UniqueCocktailNftsModule = buildModule('UniqueCocktailNftsModule',(m) => {

    const ownerAddress = process.env.SEPOLIA_PUBLIC_ADDRESS;

    if (!ownerAddress) {
      throw new Error(
        'SEPOLIA_PUBLIC_ADDRESS is not defined in the environment variables'
      );
    }
    
    const UniqueCocktailNfts = m.contract('UniqueCocktailNfts',[ownerAddress],{});

    return { UniqueCocktailNfts };
  }
);

export default UniqueCocktailNftsModule;
