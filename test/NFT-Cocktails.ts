import {expect} from "chai";
import hre from "hardhat";
import { UniqueCocktailNfts } from "../typechain-types";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("UniqueCocktailNfts", function () {
    async function deployContractFixture() {
        const [owner, userOne, userTwo] = await hre.ethers.getSigners();

        const UniqueCocktailNfts = await hre.ethers.getContractFactory('UniqueCocktailNfts');
        const uniquecocktailsnfts = await UniqueCocktailNfts.deploy(owner.address) as UniqueCocktailNfts;


        return { uniquecocktailsnfts, owner, userOne, userTwo};
    }

    describe("Deployment",  function () {
        it("Should deploy successfully", async function () {

            const {uniquecocktailsnfts, owner } = await loadFixture(deployContractFixture);
            expect(await uniquecocktailsnfts.owner()).to.equal(owner.address);

        })

    })

    describe("Minting", function () {
        it("should mint a valid NFT successfully", async function () {
            const { uniquecocktailsnfts, userOne } = await loadFixture(deployContractFixture);
            await expect(uniquecocktailsnfts.connect(userOne).safeMint(userOne.address, "MANHATTAN"))
            .to.emit(uniquecocktailsnfts, "Minted").withArgs(userOne.address, 1, "MANHATTAN");
        })
    })

    describe("Minting validation", function () {
        it("should revert when trying to mint an invalid cocktail nft", async function (){
            const {uniquecocktailsnfts, userOne} = await deployContractFixture();
            await expect(uniquecocktailsnfts.connect(userOne).safeMint(userOne.address, "GINFIZZ")).to.be.revertedWith("Invalid cocktail name");
        })

        it("should revert when user tries to mint same cocktail more than the limit allowed", async function () {
            const { uniquecocktailsnfts, userOne } = await deployContractFixture();
            
            await uniquecocktailsnfts.connect(userOne).safeMint(userOne.address, 'DAIQUIRI');

            await uniquecocktailsnfts.connect(userOne).safeMint(userOne.address, 'DAIQUIRI');

            await expect(uniquecocktailsnfts.connect(userOne).safeMint(userOne.address, 'DAIQUIRI'))
            .to.be.revertedWith("This cocktail has reached it's minting limit per user");

        })
    })

    describe("Token URI", function (){
        it("Should return correct URI for minted cocktail nft", async function () {
            const { uniquecocktailsnfts, userOne } = await deployContractFixture();
            
            await uniquecocktailsnfts.connect(userOne).safeMint(userOne.address, 'DAIQUIRI');
            const tokenUri = await uniquecocktailsnfts.tokenURI(1);

            expect(tokenUri)
            .to.equal('https://raw.githubusercontent.com/ChristianCL92/theNftCocktails/main/metadata/Cocktails/DAIQUIRI.json');
        })
    })

    describe("Contract Minting Limit", function () {
        it("is set to 10000 nfts", async function () {
                const { uniquecocktailsnfts} = await loadFixture(deployContractFixture);

                const mintingLimit = await uniquecocktailsnfts.limit();
                expect(mintingLimit).to.equal(10000);

        })
    })

    describe("Contract Limits", function () {
        it("should keep track of token Ids correctly when minting", async function () {
            const { uniquecocktailsnfts, userOne} = await loadFixture(deployContractFixture);

            expect(await uniquecocktailsnfts.tokenIds()).to.equal(0);

            await uniquecocktailsnfts.connect(userOne).safeMint(userOne.address, "MANHATTAN");
            expect (await uniquecocktailsnfts.tokenIds()).to.equal(1);

            await uniquecocktailsnfts .connect(userOne).safeMint(userOne.address, 'MOJITO');
            expect(await uniquecocktailsnfts.tokenIds()).to.equal(2);
            
        })
    })

})
