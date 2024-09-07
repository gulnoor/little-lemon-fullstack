"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useContext } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { IsMountedContext } from "../lib/contexts/mountedContext";
import { CartButtons } from "./MenuItem";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, removeItem } from "../lib/reduxStore/cartSlice";

const Cart = ({ tailwindcss }) => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  console.log(cartState);
  const { isMounted } = useContext(IsMountedContext);

  return (
    <div
      className={`
    sticky
    gap-2
    top-2
    px-2 md:px-6
    py-4
    rounded-xl
    bg-[var(--md-sys-color-surface-container)]
    ${tailwindcss}`}
    >
      <List
        style={{ padding: "0px" }}
        id="cartlist"
        className="rounded-xl overflow-scroll "
      >
        <h2 className="p-4">Cart</h2>
        {isMounted &&
          cartState.map((item) => {
            return (
              <ListItem
                divider
                className=" bg-[var(--md-sys-color-surface-container-high)]"
                key={item?.id}
              >
                <ListItemText
                  className=" md:pl-4 w-full"
                  primary={item?.name}
                  secondary={item?.price}
                />
                <CartButtons
                  quantity={item?.quantity}
                  plusClick={() => dispatch(increment(item))}
                  minusClick={() => dispatch(decrement(item))}
                />
                <ListItemButton
                  className="w-fit"
                  onClick={() => dispatch(removeItem(item))}
                >
                  <DeleteIcon className="w-fit" />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
      {
        <div className="flex flex-col flex-grow gap-3 b-0 mt-auto px-4">
          <h2>Total: </h2>
          {/* <h3>{`$${cartTotal}`}</h3> */}
          <Link className="w-full" href={"/checkout"}>
            <Button
              sx={{
                width: "100%",
                maxWidth: "450px",
              }}
              variant="contained"
            >
              Proceed to Payment
            </Button>
          </Link>
        </div>
      }
    </div>
  );
};

export default Cart;
