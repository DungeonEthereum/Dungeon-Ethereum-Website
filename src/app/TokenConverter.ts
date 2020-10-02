import {Addresses} from './Addresses';

export const TokenConverter = {
  convert: (address: string) => {
    switch (address) {
      case Addresses.Iron:
        return 'Iron';
      case Addresses.Gold:
        return 'Gold';
      case Addresses.Wood:
        return 'Wood';
      case Addresses.Armor:
        return 'Armor';
      case Addresses.Sword:
        return 'Sword';
      case Addresses.Shield:
        return 'Shield';
      case Addresses.OldKnight:
        return 'Old Knight';
      case Addresses.Knight:
        return 'Knight';
      case Addresses.Weenus:
        return 'Weenus';
      case Addresses.Xeenus:
        return 'Xeenus';
      case Addresses.Uni:
        return 'UNI';
      case Addresses.LRC:
        return 'LRC';
      case Addresses.Link:
        return 'LINK';
    }
  }
};
