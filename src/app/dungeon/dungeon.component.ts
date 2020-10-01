import {Component, OnInit} from '@angular/core';
import {Pool, pools} from '../Pool';
import {EthService} from '../services/eth.service';
import {Addresses} from '../Addresses';

@Component({
  selector: 'app-dungeon',
  templateUrl: './dungeon.component.html',
  styleUrls: ['./dungeon.component.css']
})
export class DungeonComponent implements OnInit {

  constructor(private ethService: EthService) { }

  allPools = pools;

  ngOnInit(): void {
    // this.update().then(r => {});
  }

  async update() {
  }
}
