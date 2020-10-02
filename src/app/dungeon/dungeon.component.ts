import {Component, OnInit} from '@angular/core';
import {pools} from '../Pool';

@Component({
  selector: 'app-dungeon',
  templateUrl: './dungeon.component.html',
  styleUrls: ['./dungeon.component.css']
})
export class DungeonComponent implements OnInit {

  constructor() { }

  allPools = pools.filter(value => !value.deprecated);

  ngOnInit(): void {
  }
}
