import { Product } from "~/models/Product";

export type CartResponse = {
  cart: CartElementResponse;
  total: number;
};

export type CartRequest = {
  items: CartItem[];
};

export type CartItem = {
  product: Product;
  count: number;
  price: number;
};

export type CartElementResponse = {
  id: string;
  items: CartResponseItem[];
};

export type CartResponseItem = {
  id: string;
  product_id: string;
  price: string;
  count: number;
};
