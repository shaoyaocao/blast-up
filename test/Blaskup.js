const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Blaskup contract", function () {
  let Blaskup;
  let blaskup;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let wishAddr1;
  let wishAddr2;

  beforeEach(async function () {
    // Get contract factory and signers
    Blaskup = await ethers.getContractFactory("Blaskup");
    [owner, addr1, addr2, addr3, wishAddr1, wishAddr2] = await ethers.getSigners();
    // Deploy the contract
    blaskup = await Blaskup.deploy();
    // Init the contract
    const initTx = await blaskup.init();
    await initTx.wait();
    // Init the sample key
    const sharesSubject = addr3.address; // Example subject address
    const amount = 30n; // Example amount
    const valueToSend = await blaskup.getBuyPriceAfterFee(sharesSubject, amount);
    blaskup.connect(addr3).buyShares(sharesSubject, amount, { value: valueToSend })
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      // Check if the owner is set correctly
      expect(await blaskup.owner()).to.equal(owner.address);
    });
  });


  describe("Contract data query methods that do not involve transactions", function () {

    it("Get the current price for a specific key amount", async function () {
      const sharesSubject = addr3.address; // Example subject address
      const amount = 1; // Example amount
      const price = await blaskup.getBuyPrice(sharesSubject, amount);
      console.log(`\tThe key:${addr3.address},current price for ${amount} key(s):${price.toString()}`);
      expect(price).to.be.a("BigInt");
    });

    it("Get the current supply for a specific key", async function () {
      const sharesSubject = addr3.address; // Example subject address
      const supply = await blaskup.getSupply(sharesSubject);
      console.log(`\tThe key:${addr3.address},current supply:${supply.toString()}`);
      expect(supply).to.be.a("BigInt");
    });

  });

  describe("Sequential key trade actions", function () {
    it("The key's owner buy the first key", async function () {
      const sharesSubject = addr1.address;
      const amount = 1n;
      const valueToSend = 0;
      const price = await blaskup.getBuyPrice(sharesSubject, amount)
      const tx = await blaskup.connect(addr1).buyShares(sharesSubject, amount, { value: valueToSend })
      console.log(`\ttransaction:${tx.hash.toString()},buy price:${price}`);
    });

    it("Another buy user's key", async function () {
      const sharesSubject = addr3.address;
      const amount = 5n;
      const price = await blaskup.getBuyPrice(sharesSubject, amount)
      const valueToSend = await blaskup.getBuyPriceAfterFee(sharesSubject, amount)
      const tx = await blaskup.connect(addr2).buyShares(sharesSubject, amount, { value: valueToSend })
      console.log(`\ttransaction:${tx.hash.toString()},buy price:${price}`);
    });

    it("Player sell user's key", async function () {
      const sharesSubject = addr3.address;
      const amount = 5n;
      const price = await blaskup.getSellPrice(sharesSubject, amount)
      const tx = await blaskup.connect(addr3).sellShares(sharesSubject, amount)
      console.log(`\ttransaction:${tx.hash.toString()},sell price:${price}`);
    });
  })

  describe("Wish List functionality", function () {
    it("should allow creating a new wish pass", async function () {
      // Create a new wishlist for testing
      await expect(blaskup.connect(owner).newWishPass(wishAddr1.address, 10))
        .to.emit(blaskup, "WishCreated")
        .withArgs(wishAddr1.address, 10);

      // Verify that the wishlist was created correctly
      const wishPass = await blaskup.wishPasses(wishAddr1.address);
      expect(wishPass.owner).to.equal(wishAddr1.address);
      expect(wishPass.reservedQuantity).to.equal(10);
    });

    it("should allow binding a wish pass to a subject", async function () {
      // Start by creating a new wishlist
      await blaskup.connect(owner).newWishPass(wishAddr1.address, 10);

      // Bind a wish list to a theme
      await expect(blaskup.connect(owner).bindWishPass(wishAddr2.address, wishAddr1.address))
        .to.emit(blaskup, "WishBound")
        .withArgs(wishAddr2.address, wishAddr1.address);

      // Verify that the wishlist is bound correctly
      const authorizedWish = await blaskup.connect(owner).authorizedWishes(wishAddr2.address);
      expect(authorizedWish).to.equal(wishAddr1.address);
    });

    it("should allow claiming reserved wish pass", async function () {
      // Create and bind wish lists
      await blaskup.connect(owner).newWishPass(wishAddr1.address, 10);
      await blaskup.connect(owner).bindWishPass(wishAddr2.address, wishAddr1.address);

      // Simulate wishlist owner declaring his reserved wishes
      const price = await blaskup.getBuyPriceAfterFee(wishAddr2.address, 10);
      await blaskup.connect(wishAddr2).claimReservedWishPass({ value: price })

      // Verify that the wishlist is declared correctly
      const balance = await blaskup.getBalanceOf(wishAddr2.address, wishAddr2.address);
      expect(balance).to.equal(10);
    });
  });
});
