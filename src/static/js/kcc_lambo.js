
$(function() {
  consoleInit(main)
    });

const LAMBO_STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"RewardsDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"setRewardsDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"stakeWithPermit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const tokens = {};
    const prices = await getKccPrices();

    const pools = LamboStakingContracts.map(c => { return {
        address: c.stakingRewardAddress,
        abi: LAMBO_STAKING_ABI,
        stakeTokenFunction: "stakingToken",
        rewardTokenFunction: "rewardsToken"
    }})

    const pool = {
        address: "0x69e8fc0ABCa332A32B0e4e2e85A90527646f3d5e",
        abi: LAMBO_STAKING_ABI,
        stakeTokenFunction: "rewardsToken",
        rewardTokenFunction: "rewardsToken"
    }


    let p = await loadMultipleKccSynthetixPools(App, tokens, prices, pools)
    let p1 = await loadKccSynthetixPool(App, tokens, prices, pool.abi, pool.address, pool.rewardTokenFunction, pool.stakeTokenFunction)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
    if (p.totalUserStaked > 0 || p1.totalUserStaked > 0) {
        _print(`You are staking a total of $${formatMoney(p.totalUserStaked + p1.totalUserStaked)} at an APR of ${(p.totalApr+p1.totalApr * 100).toFixed(2)}%\n`);
    }

    hideLoading();
}

const LamboStakingContracts = [
    {
        stakingRewardAddress: '0x581f9182FD3817f15a899e9B3C9668E658BCCCAD'
    },
    {
        stakingRewardAddress: '0xf588d38c985bfd8606fef1d5b2d6f08298d6c3de'
    },
    {
        stakingRewardAddress: '0x132989466CfC5091d9733872CC80427Cf5A42fBa'
    },
    {
        stakingRewardAddress: '0x5d3Af94e063132eC363f7EA1160f8263890d8cA1'
    },
    {
        stakingRewardAddress: '0x2c2e25f9dbD879cCcfeb8fb99C367bd13071c1b7'
    },
    {
        stakingRewardAddress: '0x21163A9457A071075304fe2D9Db44AdEEc1A9DB2'
    },
    {
        stakingRewardAddress: '0x8CA8F044bEB83618d3139675F4Eb78c57486437D'
    },
    {
        stakingRewardAddress: '0x7214E2262d6346d266a918422D7BAe83424ed2b6'
    },
    {
        stakingRewardAddress: '0xbcad4bcd3cee73575b2c84d6864079f62663535f'
    }
]
