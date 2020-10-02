export const Util = {
  amountPrompt: () => {
    const amount = +(window.prompt('Enter the amount!', '1').replace(',', '.'));
    if (amount == null || amount === 0 || isNaN(amount)) {
      return;
    }
    return amount;
  }
};
