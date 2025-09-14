export type Quantity = {
  id?: number;
  prQuantity?: number | string;
  bbQuantity?: number | string;
  petsQuantity?: number | string;
};


export type QuantityFormProps = {
  quantity: Quantity;
  onAdd: (quantity: Quantity) => void;
  onSubmit: (quantity: Quantity) => void;
};

export type QuantityListProps = {
  quantities: Quantity[];
  onRemove?: (quantityId: number | undefined) => void;
};