const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  console.log();
  console.log(`Deploying WavePortal...\n`);
  await waveContract.deployed();

  console.log("Contract deployed to address:", waveContract.address);
  console.log();

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );
  console.log();

  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log(`Total Waves: ${waveCount}`);

  let waveTxn = await waveContract.wave("Hello there.");
  await waveTxn.wait();

  waveTxn = await waveContract.wave("Hello Twice");
  await waveTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );
  console.log();

  const [_, randomPerson] = await hre.ethers.getSigners();
  console.log(`Random Person: ${randomPerson.address}`);
  waveTxn = await waveContract.connect(randomPerson).wave("Hello again");
  await waveTxn.wait();

  console.log();
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
