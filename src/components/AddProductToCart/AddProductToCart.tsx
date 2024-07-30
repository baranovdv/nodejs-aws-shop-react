import Typography from "@mui/material/Typography";
import { AvailableProduct, Product } from "~/models/Product";
import CartIcon from "@mui/icons-material/ShoppingCart";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import { useCart, useInvalidateCart, useUpsertCart } from "~/queries/cart";
import { useAvailableProducts } from "~/queries/products";
import { CartItem } from "~/models/CartItem";

type AddProductToCartProps = {
  product: Product;
};

export default function AddProductToCart({ product }: AddProductToCartProps) {
  const { data = [], isFetching } = useCart();
  const { data: products } = useAvailableProducts();
  const { mutate: upsertCart } = useUpsertCart();
  const invalidateCart = useInvalidateCart();

  const cartItems: CartItem[] = !products
    ? []
    : data.map((prod) => {
        const availableProd = products?.find(
          (pr) => (pr.id = prod.product_id)
        ) as AvailableProduct | undefined;

        console.log("prod", prod);

        return {
          product: {
            id: prod.id,
            title: availableProd?.title || "No title",
            description: availableProd?.description || "No description",
            price: prod.price,
          },
          count: prod.count,
          price: +prod.price,
        };
      });

  const cartItem = cartItems.find(
    (i: { product: { id: string | undefined } }) => i.product.id === product.id
  );

  const addProduct = () => {
    upsertCart(
      {
        product,
        price: cartItem?.price,
        count: cartItem ? cartItem.count + 1 : 1,
      },
      { onSuccess: invalidateCart }
    );
  };

  const removeProduct = () => {
    if (cartItem) {
      upsertCart(
        {
          ...cartItem,
          price: +cartItem.product.price,
          count: cartItem.count - 1,
        },
        { onSuccess: invalidateCart }
      );
    }
  };

  return cartItem ? (
    <>
      <IconButton disabled={isFetching} onClick={removeProduct} size="large">
        <Remove color={"secondary"} />
      </IconButton>
      <Typography align="center">{cartItem.count}</Typography>
      <IconButton disabled={isFetching} onClick={addProduct} size="large">
        <Add color={"secondary"} />
      </IconButton>
    </>
  ) : (
    <IconButton disabled={isFetching} onClick={addProduct} size="large">
      <CartIcon color={"secondary"} />
    </IconButton>
  );
}
