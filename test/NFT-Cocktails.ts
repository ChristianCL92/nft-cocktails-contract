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
})
