export class FAQ {
  constructor(public question: string, public answer: string) {}
}

export const faqs = [
  // new FAQ('Is there a Medium post?', 'Yes at https://medium.com/@dungeon_master_eth/the-dungeon-experience-8cffb201d9af'),
  new FAQ('Deposit shows an error in Metamask?', 'This is because it is not unlocked yet. Deposit and Farming starts at block 10951000.'),
  new FAQ('Is this safe?', 'The code has been tested by me, but no audit has been performed. Even an audit might not help with bugs. Only put in what you can afford to lose.'),
  new FAQ('What is the goal?', 'The goal of this project is to act both as a fundraiser for a browser game on the Ethereum network and a chance for the user to win big with the chest mechanic.'),
  new FAQ('What is the chest mechanic?', 'Everytime someone claims their rewards or stakes in some pool, a certain percentage of this goes into the chest. Each successful raid loots the chest and distributes the rewards to the participants.'),
  new FAQ('What are raids?', 'Raids are once every two days and all knights which were sent at the correct block take part in the raid. To win the raid a minimum percentage of knights must participate. The chest is looted and each participant receives rewards.'),
  new FAQ('How do I get my raid rewards?', 'Anybody can call the raid share calculation functionality after the raid has ended. Afterwards every participant can see a claim button on the Raid page. It is important to claim the rewards before the next raid starts.'),
  new FAQ('Different pools?', '3 different types of pools exist, normal, crafting and training pools. The normal pool is the usual farm pool we all know from all kind of DeFis. The craft pool basically burns the stake to distribute the rewards, the ratio is fixed and does not depend on the total value locked. Last the training pools, these act the same way as the craft pools, only they stake and burn multiple different token to create one single reward.'),
  new FAQ('Will there be voting or governance?', 'Yes and no. There can be voted on one single thing, which is the draining of the chest, which is locked unless the owner allows it. This is a safety mechanism if the game lost its appeal and no more raids are successful for example. Other than that there is no governance planned, this is only the first stage of a browser game on the Ethereum network.'),
  new FAQ('Which browser game?', 'The goal of the developer is to create a browser game which will run on a Layer 2 solution to make it cheaper and more reasonable to play. All token distributed in this version will be used/transformed into useful resources/items in the browser game.'),
  new FAQ('Can my funds be stolen?', 'The safest place to have your funds is in a hardware wallet. But the smart contract allows withdrawal only to the owner of the wallet which deposited the funds. The developer or owner of the smart contract can not withdraw the stake of the users or the chest.'),
  new FAQ('What does the developer get?', 'The developer receives 5% of all collected rewards. This allows him to improve this game as well as building the browser game.'),
];
