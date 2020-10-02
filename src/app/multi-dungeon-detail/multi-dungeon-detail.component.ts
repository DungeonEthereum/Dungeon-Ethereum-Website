import {Component, OnInit} from '@angular/core';
import {Pool, pools} from '../Pool';
import {Token} from '../Token';
import {ActivatedRoute} from '@angular/router';
import {EthService} from '../services/eth.service';
import {TokenConverter} from '../TokenConverter';
import {Util} from '../Util';

@Component({
  selector: 'app-multi-dungeon-detail',
  templateUrl: './multi-dungeon-detail.component.html',
  styleUrls: ['./multi-dungeon-detail.component.css']
})
export class MultiDungeonDetailComponent implements OnInit {
  pool: Pool;
  approved = false;
  private account: string;
  token: Token;
  stakedAmount = 0;
  burnAmount = 0;
  balances: { tokenName: string, tokenBalance: number }[] = [];

  constructor(private route: ActivatedRoute, private ethService: EthService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.pool = pools.find(value => value.id === id);

    this.init().then();
    setInterval(async () => {
      await this.update();
    }, 1500);
  }

  async init() {
    this.balances = [];
    this.account = await this.ethService.getAccount();
    this.approved = await this.ethService.getIsStakeTokenAllowed(this.pool);
    this.stakedAmount = await this.ethService.getStakedTokenAmount(this.pool.id);
    for (const stakeAddress of this.pool.stakeAddress) {
      const balance = await this.ethService.getBalance(stakeAddress);
      this.balances.push({tokenName: this.addressToName(stakeAddress), tokenBalance: balance});
    }
  }

  async update() {
    this.token = await this.ethService.getPendingToken(this.pool.id);
    this.burnAmount = this.token.burnAmount;
  }

  async approve() {
    for (const stakeAddress of this.pool.stakeAddress) {
      const isAllowed = await this.ethService.isAllowed(stakeAddress);
      if (!isAllowed) {
        await this.ethService.approve(stakeAddress);
      }
    }
    await this.init();
  }

  async deposit() {
    const amount = Util.amountPrompt();
    await this.ethService.deposit(this.pool, amount);
  }

  async withdraw() {
    const amount = Util.amountPrompt();
    await this.ethService.withdraw(this.pool, amount);
  }

  async collect() {
    await this.ethService.collect(this.pool);
  }

  addressToName(address: string): string {
    return TokenConverter.convert(address);
  }
}
