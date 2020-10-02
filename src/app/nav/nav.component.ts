import {Component, OnInit} from '@angular/core';
import {EthService} from '../services/eth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  account: string;

  constructor(private ethService: EthService) { }

  ngOnInit(): void {
    this.init().then();
  }

  private async init() {
    this.account = await this.ethService.getAccount();
  }
}
