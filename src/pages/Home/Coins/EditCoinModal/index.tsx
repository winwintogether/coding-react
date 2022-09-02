import React, {FC} from "react";
import {Modal} from "../../../../components";
import CoinForm from "../CoinForm";
import {ICoin} from "../../../../utils/interfaces";
import "./style.css";

export interface IEditCoinModalProps {
  coin: ICoin;
  onSubmit(coin: ICoin): void;
  onClose(): void;
}

const EditCoinModal: FC<IEditCoinModalProps> = ({
  coin,
  onSubmit,
  onClose,
}) => {
  return (
    <Modal title="Edit Coin" onClose={onClose}>
      <CoinForm coin={coin} onSubmit={onSubmit} onClose={onClose} />
    </Modal>
  );
};

export default EditCoinModal;
