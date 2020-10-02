import {Injectable} from '@angular/core';
import Web3 from 'web3';
import {Token} from '../Token';
import {TokenConverter} from '../TokenConverter';
import {Pool, pools} from '../Pool';
import {PoolType} from '../PoolType';
import {Addresses} from '../Addresses';

const contract = require('@truffle/contract');

let erc20Abi = [
  {
    'constant': true,
    'inputs': [],
    'name': 'name',
    'outputs': [
      {
        'name': '',
        'type': 'string'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_spender',
        'type': 'address'
      },
      {
        'name': '_value',
        'type': 'uint256'
      }
    ],
    'name': 'approve',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'totalSupply',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_from',
        'type': 'address'
      },
      {
        'name': '_to',
        'type': 'address'
      },
      {
        'name': '_value',
        'type': 'uint256'
      }
    ],
    'name': 'transferFrom',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'decimals',
    'outputs': [
      {
        'name': '',
        'type': 'uint8'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_owner',
        'type': 'address'
      }
    ],
    'name': 'balanceOf',
    'outputs': [
      {
        'name': 'balance',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'symbol',
    'outputs': [
      {
        'name': '',
        'type': 'string'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_to',
        'type': 'address'
      },
      {
        'name': '_value',
        'type': 'uint256'
      }
    ],
    'name': 'transfer',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_owner',
        'type': 'address'
      },
      {
        'name': '_spender',
        'type': 'address'
      }
    ],
    'name': 'allowance',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'payable': true,
    'stateMutability': 'payable',
    'type': 'fallback'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'owner',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': 'spender',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'value',
        'type': 'uint256'
      }
    ],
    'name': 'Approval',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'from',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': 'to',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'value',
        'type': 'uint256'
      }
    ],
    'name': 'Transfer',
    'type': 'event'
  }
];

declare let window: any;
const dm = require('../../assets/contracts/DungeonMaster.json');

function e(val: number) {
  const BN = window.web3.utils.BN;
  return new BN(Math.pow(10, val).toString());
}

@Injectable({
  providedIn: 'root'
})
export class EthService {
  private readonly web3: any;
  private enable: any;
  private dmContractAddress = '0x1F72BEa2eBB3938F9A770DF6e49e47e970D8fd96';
  private dm: any;
  BN;

  constructor() {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    }
    else {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.web3.currentProvider;
      }
      else {
        this.web3 = new Web3.providers.HttpProvider('http://localhost:7545');
      }
      window.web3 = new Web3(window.ethereum);
      this.enable = this.enableMetaMaskAccount();
      this.deploy().then(r => console.log('deployed'));
      this.BN = window.web3.utils.BN;
    }
  }

  // tslint:disable-next-line:typedef
  async deploy() {
    const dmContract = contract(dm);
    dmContract.setProvider(window.web3.currentProvider);
    this.dm = await dmContract.deployed();
  }

  private async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.enable();
    });
    return Promise.resolve(enable);
  }

  private bnToNumber(bn): number {
    try {
      const x = bn.div(e(14)).toNumber();
      return x / 10000;
    } catch (error) {
      return bn.div(e(18)).toNumber();
    }
  }

  numberToBn(nr: number) {
    return new this.BN(nr * 100000).mul(e(13)).toString(10);
  }

  async getAccount(): Promise<string> {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
  }

  async getPoolSize(poolType: PoolType = PoolType.Normal): Promise<number> {
    switch (poolType) {
      case PoolType.Normal:
        return this.dm.normalPoolLength();
      case PoolType.Burn:
        return this.dm.burnPoolLength();
      default:
        return -1;
    }
  }

  async getBalance(tokenAddress: string): Promise<number> {
    const account = await this.getAccount();
    const erc20Contract = await this.getERC20Contract(tokenAddress);
    let balance = await erc20Contract.balanceOf(account);
    balance = this.bnToNumber(balance);
    return balance;
  }

  async getTotalSupply(tokenAddress: string): Promise<number> {
    const erc20Contract = await this.getERC20Contract(tokenAddress);
    return erc20Contract.totalSupply().then(val => this.bnToNumber(val));
  }

  async getAllowance(tokenAddress: string) {
    const account = await this.getAccount();
    const erc20Contract = await this.getERC20Contract(tokenAddress);
    return erc20Contract.allowance(account, this.dmContractAddress);
  }

  async isAllowed(tokenAddress: string) {
    const allowance = await this.getAllowance(tokenAddress);
    // return allowance.toString() === '115792089237316195423570985008687907853269984665640564039457584007913129639935' || allowance.toString() === '79228162514264337593543950335';
    return allowance.toString() !== '0';
  }

  async getIsStakeTokenAllowed(pool: Pool): Promise<boolean> {
    for (const tokenAddress of pool.stakeAddress) {
      if (!(await this.isAllowed(tokenAddress))) {
        return false;
      }
    }
    return true;
  }

  async approve(tokenAddress: string) {
    const account = await this.getAccount();
    const erc20Contract = await this.getERC20Contract(tokenAddress);
    await erc20Contract.approve(this.dm.address, '115792089237316195423570985008687907853269984665640564039457584007913129639935', {from: account});
  }

  async getStakedTokenAmount(poolId: string): Promise<number> {
    const account = await this.getAccount();
    const poolType = this.poolIdToPoolType(poolId);
    switch (poolType) {
      case PoolType.Normal:
        return this.dm.normalUserInfo(poolId.substr(1), account).then(val => this.bnToNumber(val.amountStaked));
      case PoolType.Burn:
        return this.dm.burnUserInfo(poolId.substr(1), account).then(val => this.bnToNumber(val.amountStaked));
      case PoolType.MultiBurn:
        return this.dm.multiBurnUserInfo(poolId.substr(1), account).then(val => this.bnToNumber(val.amountStakedOfEach));
      default:
        return -1;
    }
  }

  async getPendingToken(poolId: string): Promise<Token> {
    const account = await this.getAccount();
    const poolType = this.poolIdToPoolType(poolId);
    switch (poolType) {
      case PoolType.Normal:
        return this.dm.normalPending(poolId.substr(1), account).then(async value => {
          const address = value[1];
          const balance = await this.getBalance(address);
          return new Token(TokenConverter.convert(address), this.bnToNumber(value[0]), 0, balance, address);
        });
      case PoolType.Burn:
        return this.dm.burnPending(poolId.substr(1), account).then(async value => {
          const address = value[2];
          const balance = await this.getBalance(address);
          return new Token(TokenConverter.convert(address), this.bnToNumber(value[0]), this.bnToNumber(value[1]), balance, address);
        });
      case PoolType.MultiBurn:
        return this.dm.multiBurnPending(poolId.substr(1), account).then(async value => {
          const address = value[2];
          const balance = await this.getBalance(address);
          return new Token(TokenConverter.convert(address), this.bnToNumber(value[0]), this.bnToNumber(value[1]), balance, address);
        });
    }
  }

  async getAllPendingTokens(): Promise<Token[]> {
    const tokens: Token[] = [];
    for (const pool of pools) {
      const token = await (this.getPendingToken(pool.id));
      const foundToken = tokens.find(value => value.address === token.address);
      if (foundToken) {
        foundToken.balance += token.balance;
      }
      else {
        tokens.push(token);
      }
    }
    return tokens;
  }

  async deposit(pool: Pool, amount: number) {
    const account = await this.getAccount();
    const poolType = this.poolIdToPoolType(pool.id);
    switch (poolType) {
      case PoolType.Normal:
        return this.dm.depositNormalPool(pool.id.substr(1), this.numberToBn(amount), {from: account});
      case PoolType.Burn:
        return this.dm.depositBurnPool(pool.id.substr(1), this.numberToBn(amount), {from: account});
      case PoolType.MultiBurn:
        return this.dm.depositMultiBurnPool(pool.id.substr(1), this.numberToBn(amount), {from: account});
    }
  }

  async withdraw(pool: Pool, amount: number) {
    const account = await this.getAccount();
    const poolType = this.poolIdToPoolType(pool.id);
    switch (poolType) {
      case PoolType.Normal:
        return this.dm.withdrawNormalPool(pool.id.substr(1), this.numberToBn(amount), {from: account});
      case PoolType.Burn:
        return this.dm.withdrawBurnPool(pool.id.substr(1), this.numberToBn(amount), {from: account});
      case PoolType.MultiBurn:
        return this.dm.withdrawMultiBurnPool(pool.id.substr(1), this.numberToBn(amount), {from: account});
    }
  }

  async collect(pool: Pool) {
    const account = await this.getAccount();
    const poolType = this.poolIdToPoolType(pool.id);
    switch (poolType) {
      case PoolType.Normal:
        return this.dm.collectNormalPool(pool.id.substr(1), {from: account});
      case PoolType.Burn:
        return this.dm.collectBurnPool(pool.id.substr(1), {from: account});
      case PoolType.MultiBurn:
        return this.dm.collectMultiBurnPool(pool.id.substr(1), {from: account});
    }
  }

  async getChestAmount() {
    // const chest: { token: string, amount: number }[] = [];
    const chest: {} = {};
    for (const pool of pools) {
      switch (this.poolIdToPoolType(pool.id)) {
        case PoolType.Normal: {
          const poolInfo = await this.dm.normalPoolInfo(pool.id.substr(1));
          const stakeAmount = this.bnToNumber(poolInfo.stakeChestAmount);
          const stakeToken = poolInfo.stakeToken;
          const receiveAmount = this.bnToNumber(poolInfo.receiveChestAmount);
          const receiveToken = poolInfo.receiveToken;
          chest[stakeToken] = chest[stakeToken] ? chest[stakeToken] + stakeAmount : stakeAmount;
          chest[receiveToken] = chest[receiveToken] ? chest[receiveToken] + receiveAmount : receiveAmount;
          break;
        }
        case PoolType.Burn: {
          const poolInfo = await this.dm.burnPoolInfo(pool.id.substr(1));
          const stakeAmount = this.bnToNumber(poolInfo.stakeChestAmount);
          const stakeToken = poolInfo.burningStakeToken;
          const receiveAmount = this.bnToNumber(poolInfo.receiveChestAmount);
          const receiveToken = poolInfo.receiveToken;
          chest[stakeToken] = chest[stakeToken] ? chest[stakeToken] + stakeAmount : stakeAmount;
          chest[receiveToken] = chest[receiveToken] ? chest[receiveToken] + receiveAmount : receiveAmount;
          break;
        }
        case PoolType.MultiBurn: {
          const poolInfo = await this.dm.multiBurnPoolInfo(pool.id.substr(1));
          const stakeAmount = this.bnToNumber(poolInfo.stakeChestAmount);
          for (const stakeToken of pool.stakeAddress) {
            chest[stakeToken] = chest[stakeToken] ? chest[stakeToken] + stakeAmount : stakeAmount;
          }
          break;
        }
      }
    }
    return chest;
  }

  async nextRaidBlock(): Promise<number> {
    return await this.dm.raidBlock().then(val => val.toNumber());
  }

  async joinRaid(amount: number): Promise<boolean> {
    const account = await this.getAccount();
    const balanceBefore = await this.getBalance(Addresses.OldKnight);
    await this.dm.joinRaid(this.numberToBn(amount), {from: account}); // not working
    const balanceAfter = await this.getBalance(Addresses.OldKnight);
    return (balanceAfter + amount) === balanceBefore;
  }

  async getRaidShare(): Promise<number> {
    const account = await this.getAccount();
    return this.dm.raidShare(account, {from: account}).then(val => val.toNumber());
  }

  async claimRaidRewards() {
    const account = await this.getAccount();
    await this.dm.claimRaidRewards({from: account});
  }

  private poolIdToPoolType(poolId: string): PoolType {
    switch (poolId[0]) {
      case 'n':
        return PoolType.Normal;
      case 'b':
        return PoolType.Burn;
      case 'm':
        return PoolType.MultiBurn;
    }
  }

  private async getERC20Contract(tokenAddress) {
    let erc20Contract = contract({abi: erc20Abi});
    erc20Contract.setProvider(window.web3.currentProvider);
    erc20Contract = await erc20Contract.at(tokenAddress);
    return erc20Contract;
  }
}
