import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Pool, pools} from '../Pool';
import {EthService} from '../services/eth.service';
import {Token} from '../Token';
import {PoolType} from '../PoolType';
import {Util} from '../Util';
import {TokenConverter} from '../TokenConverter';

@Component({
  selector: 'app-dungeon-detail',
  templateUrl: './dungeon-detail.component.html',
  styleUrls: ['./dungeon-detail.component.css']
})
export class DungeonDetailComponent implements OnInit, OnDestroy {
  pool: Pool;
  approved = false;
  private account: string;
  token: Token;
  balance: number;
  stakedAmount = 0;
  burnAmount = 0;
  private interval: NodeJS.Timeout;

  constructor(private route: ActivatedRoute, private ethService: EthService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id.startsWith(PoolType.MultiBurn)) {
      this.router.navigateByUrl('/dungeon/multi/' + id);
    }
    this.pool = pools.find(value => value.id === id);

    this.init().then();
    this.interval = setInterval(async () => {
      await this.update();
    }, 1500);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  async init() {
    this.account = await this.ethService.getAccount();
    this.approved = await this.ethService.getIsStakeTokenAllowed(this.pool);
    this.stakedAmount = await this.ethService.getStakedTokenAmount(this.pool.id);
  }

  async update() {
    this.token = await this.ethService.getPendingToken(this.pool.id);
    this.balance = await this.ethService.getBalance(this.pool.stakeAddress[0]);
    this.burnAmount = this.token.burnAmount;
  }

  approve() {
    this.ethService.approve(this.pool.stakeAddress[0]).then(async () => {
      await this.init();
    });
  }

  async deposit() {
    const amount = Util.amountPrompt();
    await this.ethService.deposit(this.pool, amount);
    this.init().then();
  }

  async withdraw() {
    const amount = Util.amountPrompt();
    await this.ethService.withdraw(this.pool, amount);
    this.init().then();
  }

  async collect() {
    await this.ethService.collect(this.pool);
    this.init().then();
  }

  addressToName(address: string): string {
    return TokenConverter.convert(address);
  }
}
