import React, {FC, useState} from "react";
import AddCoinModal from "./AddCoinModal";
import EditCoinModal from "./EditCoinModal";
import {formatCoinPrice} from "../../../utils/helpers";
import {ICoin} from "../../../utils/interfaces";
import "./style.css";

export interface ICoinsProps {
  coins: ICoin[];
  onChange(coins: ICoin[]): void;
}

const Coins: FC<ICoinsProps> = ({
  coins,
  onChange,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCoin, setEditingCoin] = useState<ICoin>();

  const onAddCoin = (coin) => {
    const maxId = Math.max(0, ...coins.map((item) => item.id));
    const newCoins = [...coins, { ...coin, id: maxId + 1 }];
    onChange(newCoins.sort((a, b) => a.price - b.price));
    setShowAddModal(false);
  };

  const onEditCoin = (coin) => {
    const newCoins = coins.map((item) => item.id === coin.id ? coin : item);
    onChange(newCoins.sort((a, b) => a.price - b.price));
    setEditingCoin(undefined);
  };

  const onDeleteCoin = (coin) => {
    if (!window.confirm('Are you sure you want to delete this coin?')) {
      return;
    }

    onChange(coins.filter((item) => item.id !== coin.id));
  };

  return (
    <>
      <div className="coins white-card" data-testid="coin-form">
        <table>
          <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th />
          </tr>
          </thead>
          <tbody>
          {coins.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>{item.label}</td>
              <td>{formatCoinPrice(item.price)}</td>
              <td className="text-right">
                <i className="fa fa-edit text-primary cursor-pointer" onClick={() => setEditingCoin(item)} />
                <i className="fa fa-trash text-danger cursor-pointer ml-3" onClick={() => onDeleteCoin(item)} />
              </td>
            </tr>
          ))}
          </tbody>
        </table>

        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <i className="fa fa-plus-circle" /> Add New
          </button>
        </div>
      </div>

      {showAddModal && (
        <AddCoinModal onCreate={onAddCoin} onClose={() => setShowAddModal(false)} />
      )}
      {editingCoin && (
        <EditCoinModal coin={editingCoin} onSubmit={onEditCoin} onClose={() => setEditingCoin(undefined)} />
      )}
    </>
  );
};

export default Coins;
