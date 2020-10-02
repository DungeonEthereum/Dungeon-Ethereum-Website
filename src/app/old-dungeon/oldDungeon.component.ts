import {Component, OnInit} from '@angular/core';
import {pools} from '../Pool';

@Component({
  selector: 'app-dungeon',
  templateUrl: './oldDungeon.component.html',
  styleUrls: ['./oldDungeon.component.css']
})
export class OldDungeonComponent implements OnInit {

  constructor() { }

  allPools = pools.filter(value => value.deprecated);

  ngOnInit(): void {
  }
}
