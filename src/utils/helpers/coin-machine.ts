import {ICoin, ICoins} from "../interfaces";

export const calculateCoins = (coins: ICoin[], price: string) => {
  let unit = 100;
  price = price.trim();
  if (price.startsWith('£')) {
    price = price.substr(1).trim();
  } else if (price.endsWith('p')) {
    price = price.substr(0, price.length - 1).trim();
    unit = 1;
  }
  let value = Number(price);
  if (Number.isNaN(value)) {
    throw new Error('Parsing price failed!');
  }
  if (value <= 0) {
    throw new Error('Invalid price!');
  }

  value = Math.round(value * unit);
  const result: ICoins[] = [];
  for (let i = coins.length - 1; i >=0 ; i --) {
    const coin = coins[i];
    const count = Math.floor(value / coin.price);
    if (count) {
      result.push({ coin, count });
      value = value % coin.price;
    }
  }
  if (value) {
    throw new Error('Unable to calculate coins!');
  }

  return result;
};

export const formatCoinPrice = (price: number) => {
  if (price < 100) {
    return `${price}p`;
  }
  return `£${price / 100}`;
};
