
const { expect } = require("chai");
const { parseUnits, formatUnits } = require("@ethersproject/units");

const { ethers } = require("hardhat");
const abi = require('ethereumjs-abi');

const nftFactoryAddress = '0xe2Be0eb4D5157328073EDc26Ab95108cf3aBA67d'
let nftFactory;
let signature;

let tokenURI = 'beef'

describe("NFTFactory", function() {

	before(async () => {
		const [owner, borrower] = await ethers.getSigners();
		nftFactory = await ethers.getContractAt("NFTFactory", nftFactoryAddress);

		// Create Hashed Message
		const hash = "0x" + abi.soliditySHA3([
				'address'
			], [
				owner.address
			]).toString('Hex');
		
		console.log("HASH")
		console.log(hash)

		// Sign Transaction
		signature = await owner.signMessage(hash);

		console.log("SIGNATURE")
		console.log(signature)
		console.log('---accounts---')
		console.log(owner.address)
	})

	it('mints an NFT', async() => {
	// it.only('mints an NFT', async() => {
		const [owner] = await ethers.getSigners();

		const balance = await nftFactory.balanceOf(owner.address)
		console.log(balance.toString())

		// let contract = new ethers.Contract(contractAddress, abi, ethers.provider);
		const tokenMetadata = ethers.utils.formatBytes32String("howdie:" + balance.toString())

    // function issueNFTCommitment(address owner, uint depositAmount, uint daysAfter, bytes memory dataHash, string memory tokenUri) public {

		const res = await nftFactory.issueNFTCommitment(owner.address, 30, "b6a385ba8f14ac4403721c27c6960432791e347b8676641fa381bd95a9e85812", "http://")
		console.log(res)
	})
	
	it('get the balance of the NFT', async() => {
	// it.only('get the balance of the NFT', async() => {
		const [owner] = await ethers.getSigners();

		// get balanceOf
		const balance = await nftFactory.balanceOf(owner.address)
		console.log(balance.toString())
	})

	it.only('issues an nft and commitment', async () => {
	// it.only('issues an nft and commitment', async () => {
		// sign media string
		// deposit collateral with media string

		const [owner] = await ethers.getSigners();

		// get balanceOf
		// address owner, uint price, uint weeksAfter, bytes memory dataHash
		const res = await nftFactory.issueNFTCommitment(owner.address, 10, 52, signature, tokenURI)
		console.log(res)

		// get balanceOf
		const balance = await nftFactory.balanceOf(owner.address)
		console.log(balance.toString())

		// send raw data key
	})


	it('reveals an nft', async () => {
	// it.only('reveals an nft', async () => {
		// sign media string
		// deposit collateral with media string

		const [owner, borrower] = await ethers.getSigners();

		// get balanceOf
		// address owner, uint price, uint weeksAfter, bytes memory dataHash
    	// address owner, uint tokenId, string memory _dataKey, bytes memory _dataHash, address buyer) public {

		const res = await nftFactory.reveal(owner.address, 1, tokenURI, signature, borrower.address)
		console.log(res)

		// get balanceOf
		const balance = await nftFactory.balanceOf(owner.address)
		console.log(balance.toString())

		// send raw data key
	})

	it('gets balance of makers', async () => {
	// it.only('gets balance of makers', async () => {
		const [owner, borrower] = await ethers.getSigners();

				// get balanceOf
		let balance = await nftFactory.balanceOf(owner.address)
		console.log(`owner: ${balance.toString()}`)


		balance = await nftFactory.balanceOf(borrower.address)
		console.log(`borrower: ${balance.toString()}`)
	})

	it('redeems an nft', async () => {

	})
	
})