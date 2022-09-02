import React, {FC} from "react";
import {Modal} from "../../../../components";
import CoinForm from "../CoinForm";
import {ICoin} from "../../../../utils/interfaces";
import "./style.css";

export interface IAddCoinModalProps {
  onCreate(coin: Partial<ICoin>): void;
  onClose(): void;
}

const AddCoinModal: FC<IAddCoinModalProps> = ({
  onCreate,
  onClose,
}) => {
  return (
    <Modal title="Add New Coin" onClose={onClose}>
      <CoinForm onSubmit={onCreate} onClose={onClose} />
    </Modal>
  );
};

export default AddCoinModal;
