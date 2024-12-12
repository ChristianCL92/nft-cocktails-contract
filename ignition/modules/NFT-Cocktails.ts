//ignition/modules/NFT-Cocktails.ts
import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import dotenv from "dotenv";
 
dotenv.config();

const UniqueCocktailNftsModule = buildModule('UniqueCocktailNftsModule',(m) => {
    const Owner_address = process.env.SEPOLIA_PUBLIC_ADDRESS;
    if (!Owner_address) {
        throw new Error("SEPOLIA_PUBLIC_ADDRESS is not defined in the environment variables");
    }
    const UniqueCocktailNfts = m.contract('UniqueCocktailNfts', [Owner_address], {});

    return { UniqueCocktailNfts };
  }
);

export default UniqueCocktailNftsModule;
