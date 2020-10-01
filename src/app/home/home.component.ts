import {Component, OnDestroy, OnInit} from '@angular/core';
import {EthService} from '../services/eth.service';
import {Token} from '../Token';
import {TokenConverter} from '../TokenConverter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: string;
  pendingTokens: Token[];
  totalSupplyMap = {};
  chest: {} = {};
  nextRaidBlock = 0;
  private interval: NodeJS.Timeout;

  constructor(private ethService: EthService) {
  }

  ngOnInit(): void {
    this.updateUI().then();
    this.interval = setInterval(async () => {
      await this.updateUI();
    }, 1500);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  async updateUI() {
    this.account = await this.ethService.getAccount();
    await this.updatePendingTokens();
    this.chest = await this.ethService.getChestAmount();
    this.nextRaidBlock = await this.ethService.nextRaidBlock();
    for (const token of this.pendingTokens) {
      this.totalSupplyMap[token.address] = await this.getTotalSupply(token.address);
    }
  }

  // tslint:disable-next-line:typedef
  async updatePendingTokens() {
    this.pendingTokens = await this.ethService.getAllPendingTokens();
  }

  async getTotalSupply(address: string) {
    return this.ethService.getTotalSupply(address);
  }

  addressToName(address: string): string {
    return TokenConverter.convert(address);
  }
}
