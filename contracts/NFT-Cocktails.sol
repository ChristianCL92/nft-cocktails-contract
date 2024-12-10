// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.28;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract UniqueCocktailNfts is ERC721, ERC721URIStorage, Ownable {

    mapping(uint256 => string) cocktails;
    mapping(address =>mapping(string => uint256)) mintLimitForEachNFT;
    mapping(string => bool) validCocktails;


    uint256 public tokenIds = 0;
    uint256 public limit = 10000;
    uint256 private eachTokenMintLimit = 2;
    string private baseUri = "https://raw.githubusercontent.com/ChristianCL92/theNftCocktails/main/metadata/Cocktails/";
    
    event Minted(address indexed to, uint256 tokenIds, string cocktail);
   
    modifier withinMintLimit () {
    require(tokenIds < limit, "Contract mint limit reached, contract is closed");
        _;
    }

    constructor(address _initialOwner) ERC721("UniqueCocktailNfts", "CNFT") Ownable(_initialOwner) {
        

        validCocktails["WHITERUSSIAN"] = true;
        validCocktails["AMARETTOSOUR"] = true;
        validCocktails["BRANDYALEXANDER"] = true;
        validCocktails["COSMOPOLITAN"] = true;
        validCocktails["DAIQUIRI"] = true;
        validCocktails["MANHATTAN"] = true;
        validCocktails["MOJITO"] = true;
        validCocktails["PINACOLADA"] = true;
        validCocktails["TEQUILASUNRISE"] = true;
        validCocktails["TOMCOLLINS"] = true;
    }

    function safeMint(address to, string memory cocktail)
        public
        withinMintLimit
    {   
        require(validCocktails[cocktail] == true , "Invalid cocktail name");
        require(mintLimitForEachNFT[msg.sender][cocktail] < eachTokenMintLimit, "This cocktail has reached it's minting limit per user");
        
        mintLimitForEachNFT[msg.sender][cocktail]++;
        tokenIds++;
        cocktails[tokenIds] = cocktail;
        _safeMint(to, tokenIds);
        _setTokenURI(tokenIds, cocktail);

        emit Minted (to, tokenIds, cocktail);
    }

    function addFutureValidCocktails(string memory cocktail) 
    public
    onlyOwner
    withinMintLimit 
    {
        require(validCocktails[cocktail] == false, "This cocktail already exists in the contract");
        validCocktails[cocktail] = true;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        
        return string.concat(baseUri, cocktails[tokenId], ".json");
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}