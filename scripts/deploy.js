// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

async function main() {
  const amount = ethers.utils.parseEther("0.1");
  const slotMachine = await ethers.getContractFactory("SlotMachine");
  const SlotMachine = await slotMachine.deploy({ value: amount });
  await SlotMachine.deployed();

  console.log(`SlotMachine is deployed at:${SlotMachine.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
