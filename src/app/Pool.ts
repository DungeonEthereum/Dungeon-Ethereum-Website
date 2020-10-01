import {Addresses} from './Addresses';
import {PoolType} from './PoolType';

export class Pool {
  constructor(public id: string, public icon: string, public header: string, public text: string, public stakeAddress: string[], public deprecated = false) {}
}

export const pools = [
  new Pool(`${PoolType.Normal}0`, '⛏️', 'Iron Mine', 'Mine Iron', [Addresses.Uni]),
  new Pool(`${PoolType.Normal}1`, '⛏️', 'Gold Mine', 'Mine Gold', [Addresses.LRC]),
  new Pool(`${PoolType.Normal}2`, '🪓', 'Woods', 'Chop Wood', [Addresses.Link]),
  new Pool(`${PoolType.Burn}0`, '️⚒', 'Blacksmith', 'Melt Iron and craft Armor', [Addresses.Iron]),
  new Pool(`${PoolType.Burn}1`, '🗡️', 'Swordsmith', 'Melt Gold and craft Swords', [Addresses.Gold]),
  new Pool(`${PoolType.Burn}2`, '⚙️', 'Workshop', 'Chop Wood and craft Shield', [Addresses.Wood]),
  new Pool(`${PoolType.MultiBurn}2`, '🧜🏻‍️', 'Training Camp', 'Train your knights', [Addresses.Armor, Addresses.Shield, Addresses.Sword]),
  new Pool(`${PoolType.MultiBurn}3`, '🧜🏻‍️', 'Barracks', 'Form Iron, Gold and Wood into a knight. With Magic!', [
    Addresses.Iron,
    Addresses.Gold,
    Addresses.Wood
  ]),
  new Pool(`${PoolType.MultiBurn}0`, '🧜🏻‍️', 'Old Training Camp', 'Withdraw', [Addresses.Armor, Addresses.Shield, Addresses.Sword], true),
  new Pool(`${PoolType.MultiBurn}1`, '🧜🏻‍️', 'Old Barracks', 'Withdraw', [Addresses.Iron, Addresses.Gold, Addresses.Wood], true),
];
