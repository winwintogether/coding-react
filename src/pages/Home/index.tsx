import React, {useEffect, useState} from "react";
import Coins from "./Coins";
import CoinMachine from "./CoinMachine";
import {ICoin} from "../../utils/interfaces";
import "./style.css";

const defaultCoins: ICoin[] = [
  { id: 1, label: '1 penny', price: 1 },
  { id: 2, label: '2 pence', price: 2 },
  { id: 3, label: '5 pence', price: 5 },
  { id: 4, label: '10 pence', price: 10 },
  { id: 5, label: '20 pence', price: 20 },
  { id: 6, label: '50 pence', price: 50 },
  { id: 7, label: '1 pound', price: 100 },
  { id: 8, label: '2 pound', price: 200 },
];

const HomePage = () => {
  const [coins, _setCoins] = useState<ICoin[]>([]);

  useEffect(() => {
    try {
      const storage = localStorage.getItem('coins') || '';
      _setCoins(JSON.parse(storage));
    } catch {
      setCoins(defaultCoins);
    }
  }, []);

  const setCoins = (coins: ICoin[]) => {
    _setCoins(coins);
    localStorage.setItem('coins', JSON.stringify(coins));
  };

  return (
    <div className="homepage">
      <Coins coins={coins} onChange={setCoins} />
      <CoinMachine coins={coins} />
    </div>
  );
};

export default HomePage;
