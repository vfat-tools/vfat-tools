
$(function() {
consoleInit(main)
});

const xCOMB_CHEF_ABI = 

async function main() {
  const App = await init_ethers();

  _print("*** Please note 95% of rewards are vesting. ***\n")
  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const xCOMB_CHEF_ADDR = "0xf712a82DD8e2Ac923299193e9d6dAEda2d5a32fd";
  const xCOMB_CHEF = new ethers.Contract(xCOMB_CHEF_ADDR, xCOMB_CHEF_ABI, App.provider);

  const tokens = {};
  const prices = await getXdaiPrices();

  //const rewardPerBlock = await xCOMB_CHEF.REWARD_PER_BLOCK();
  //const rewardsPerWeek = rewardPerBlock / 1e18 * 604800 / 5

  //cant find function for reward calculation

  await loadHoneycombContract(App, tokens, prices, xCOMB_CHEF, xCOMB_CHEF_ADDR, xCOMB_CHEF_ABI, "xCOMB",
      "hsf", null, rewardsPerWeek, "pendingHsf");

  hideLoading();
}

async function loadHoneycombContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocationPoints();

  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getXdaiToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ?? 
    await chefContract.callStatic[rewardsPerBlockFunction]() 
    / 10 ** rewardToken.decimals * 604800 / 3

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getHoneycombPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getXdaiToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo => 
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "xdai") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "xdai") : undefined);


  _print("Finished reading smart contracts.\n");
    
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, "xdai");
    }
  }
}

async function getHoneycombPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  //cant find function for userInfo, pending rewards function is very complex
  const poolInfo = await chefContract.getPoolByIndex(poolIndex);
  if (poolInfo.allocation == 0) {
    return {
      address: poolInfo.poolToken,
      allocPoints: poolInfo.allocation ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
    };
  }
  const poolToken = await getXdaiToken(app, poolInfo.poolToken, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  return {
      address: poolInfo.poolToken,
      allocPoints: poolInfo.allocation ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
  };
}