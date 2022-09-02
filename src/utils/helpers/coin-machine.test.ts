import {calculateCoins} from "./coin-machine";
import {ICoin} from "../interfaces";

const coins: ICoin[] = [
  { id: 1, label: '1 penny', price: 1 },
  { id: 2, label: '2 pence', price: 2 },
  { id: 3, label: '5 pence', price: 5 },
  { id: 4, label: '10 pence', price: 10 },
  { id: 5, label: '20 pence', price: 20 },
  { id: 6, label: '50 pence', price: 50 },
  { id: 7, label: '1 pound', price: 100 },
  { id: 8, label: '2 pound', price: 200 },
];

describe("calculateCoins()", () => {

  it("should calculate '£2'", () => {
    const input = '£2';
    const output = [
      { coin: coins[7], count: 1 },
    ];

    expect(calculateCoins(coins, input)).toEqual(output);
  });

  it("should calculate '2.53'", () => {
    const input = '2.53';
    const output = [
      { coin: coins[7], count: 1 },
      { coin: coins[5], count: 1 },
      { coin: coins[1], count: 1 },
      { coin: coins[0], count: 1 },
    ];

    expect(calculateCoins(coins, input)).toEqual(output);
  });

  it("should calculate '5.23'", () => {
    const input = '5.23';
    const output = [
      { coin: coins[7], count: 2 },
      { coin: coins[6], count: 1 },
      { coin: coins[4], count: 1 },
      { coin: coins[1], count: 1 },
      { coin: coins[0], count: 1 },
    ];

    expect(calculateCoins(coins, input)).toEqual(output);
  });

  it("should throw 'Parsing price failed!' error", () => {
    const input = '$23';
    try {
      calculateCoins(coins, input);
    } catch (e: any) {
      expect(e.message).toBe('Parsing price failed!');
    }
  });

  it("should throw 'Invalid price!' error", () => {
    const input = '-2.3';
    try {
      calculateCoins(coins, input);
    } catch (e: any) {
      expect(e.message).toBe('Invalid price!');
    }
  });

  it("should throw 'Unable to calculate coins!' error", () => {
    const input = '4.2323';
    try {
      calculateCoins(coins, input);
    } catch (e: any) {
      expect(e.message).toBe('Unable to calculate coins!');
    }
  });
});