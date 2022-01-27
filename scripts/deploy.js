const { ethers } = require("ethers");

async function main() {
  const EarlyRetireFactory = await hre.ethers.getContractFactory("EarlyRetire");
  const earlyRetireContract = await EarlyRetireFactory.deploy();

  await earlyRetireContract.deployed();

  console.log("Contract deployed to:", earlyRetireContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
