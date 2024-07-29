import { Product } from "~/models/Product";

export type CartResponse = {
  cart: {
    items: CartItem[];
    total: number;
  };
};

export type CartRequest = {
  items: CartItem[];
};

export type CartItem = {
  product: Product;
  count: number;
};
