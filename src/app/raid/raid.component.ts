import {Component, OnDestroy, OnInit} from '@angular/core';
import {EthService} from '../services/eth.service';
import {TokenConverter} from '../TokenConverter';
import {Addresses} from '../Addresses';
import {Util} from '../Util';

@Component({
  selector: 'app-raid',
  templateUrl: './raid.component.html',
  styleUrls: ['./raid.component.css']
})
export class RaidComponent implements OnInit, OnDestroy {
  private interval: NodeJS.Timeout;
  chest: {};
  nextRaidBlock: number;
  knights = 0;
  knightsApproved = false;
  raidJoinedResult: boolean = null;
  claimableRewards: boolean;

  constructor(private ethService: EthService) {
  }

  ngOnInit(): void {
    this.init();
    this.interval = setInterval(async () => {
      await this.updateUI();
    }, 5000);
  }

  async init() {
    this.knightsApproved = await this.ethService.isAllowed(Addresses.Knight);
    await this.updateUI();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  async updateUI() {
    this.chest = await this.ethService.getChestAmount();
    this.nextRaidBlock = await this.ethService.nextRaidBlock();
    this.knights = await this.ethService.getBalance(Addresses.Knight);
    const share = await this.ethService.getRaidShare();
    this.claimableRewards = share > 0;
  }

  addressToName(address: string): string {
    return TokenConverter.convert(address);
  }

  async joinRaid() {
    const amount = Util.amountPrompt();
    this.raidJoinedResult = await this.ethService.joinRaid(amount);
  }

  async approve() {
    await this.ethService.approve(Addresses.Knight);
    await this.init();
  }

  async claimRewards() {
    await this.ethService.claimRaidRewards();
    await this.init();
  }
}
