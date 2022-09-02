import React, {FC, FormEvent, useEffect, useMemo, useState} from "react";
import {Input} from "../../../../components";
import {ICoin} from "../../../../utils/interfaces";
import "./style.css";

export interface ICoinFormProps {
  coin?: ICoin;
  onSubmit(coin: Partial<ICoin>): void;
  onClose(): void;
}

const CoinForm: FC<ICoinFormProps> = ({
  coin,
  onSubmit,
  onClose,
}) => {
  const [form, setForm] = useState({
    label: '',
    price: '',
  });

  useEffect(() => {
    if (coin) {
      setForm({
        label: coin.label,
        price: coin.price.toString(),
      });
    }
  }, [coin]);

  const valid = useMemo(() => {
    if (!form.label) {
      return false;
    }
    const price = Number(form.price);
    return !Number.isNaN(price) && price > 0;
  }, [form]);

  const onFieldChange = (field: string, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...coin,
      label: form.label,
      price: Number(form.price),
    });
  };

  return (
    <form className="coin-form" onSubmit={onFormSubmit}>
      <Input
        name="label"
        label="Coin:"
        required
        value={form.label}
        onChange={onFieldChange}
      />

      <Input
        className="mt-4"
        name="price"
        type="number"
        label="Price:"
        placeholder="(Pence)"
        required
        value={form.price}
        onChange={onFieldChange}
      />

      <div className="text-right mt-5">
        <button className="btn btn-secondary" type="button" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary ml-3" disabled={!valid}>Save</button>
      </div>
    </form>
  );
};

export default CoinForm;
