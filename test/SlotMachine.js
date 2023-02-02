const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SlotMachine", function () {
  let amount, balance, provider, Slot, deployer, user1, user2, tx, res;
  beforeEach(async () => {
    [deployer, user1, user2] = await ethers.getSigners();
    amount = ethers.utils.parseEther("1");
    const slotMachine = await ethers.getContractFactory("SlotMachine");
    Slot = await slotMachine.deploy({ value: amount });
    console.log(`SlotMachine is deployed at:${Slot.address}`);
  });
  describe("Deployment", () => {
    it("has contract owner", async () => {
      expect(await Slot.owner()).to.equal(deployer.address);
    });
  });
  describe("Spin", () => {
    it("gameId updated", async () => {
      tx = await Slot.connect(user1).spin({
        value: ethers.utils.parseEther("0.002"),
      });
      res = await tx.wait();
      expect(await Slot.gameId()).to.equal("2");
    });
  });
});
