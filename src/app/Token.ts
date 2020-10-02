export class Token {
  constructor(public name: string, public pendingAmount: number, public burnAmount: number = 0, public balance: number, public address: string) {}
}
