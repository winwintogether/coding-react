import React, {FC, FormEvent, useState} from "react";
import {Input} from "../../../components";
import {calculateCoins} from "../../../utils/helpers";
import {ICoin, ICoins} from "../../../utils/interfaces";
import "./style.css";

export interface ICoinMachineProps {
  coins: ICoin[];
}

const CoinMachine: FC<ICoinMachineProps> = ({
  coins,
}) => {
  const [price, setPrice] = useState('');
  const [result, setResult] = useState<ICoins[]>([]);
  const [error, setError] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      setResult(calculateCoins(coins, price));
      setError('');
    } catch (err: any) {
      setError(err.error);
    }
  };

  return (
    <div className="white-card">
      <form className="d-flex align-items-center flex-wrap" onSubmit={onSubmit}>
        <Input
          className="flex-grow-1 mr-5"
          name="price"
          label="Price:"
          placeholder="£2"
          required
          value={price}
          onChange={(_, value) => setPrice(value)}
        />

        <button className="btn btn-primary">Calculate</button>
      </form>

      <div className="mt-4">
        {error ? (
          <p className="text-center p-5">{error}</p>
        ) : (
          <table>
            <thead>
            <tr>
              <th>Coin</th>
              <th>Count</th>
            </tr>
            </thead>
            <tbody>
            {result.map((item, i) => (
              <tr key={i}>
                <td>{item.coin.label}</td>
                <td>{item.count}</td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CoinMachine;
