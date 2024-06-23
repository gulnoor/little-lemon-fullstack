"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import StripeForm from "../ui/Stripe";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { AlertContext } from "../lib/contexts/AlertContext";
import { TokenContext } from "../lib/contexts/tokenContext";
import { ThemeContext } from "../lib/contexts/themeContext";
import { CartContext } from "../lib/contexts/cartContext";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const Checkout = () => {
  const { openAlert } = useContext(AlertContext);
  const { cartState } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);
  const { token } = useContext(TokenContext);
  const [secret, setSecret] = useState(undefined);
  const router = useRouter();

  //FIXME: //! add cart, checkout, back to cart, clear cart, back to checkout, payment successful
  //? I think it was fixed by adding amount calc to checkout route

  const fetchClientSecret = useCallback(async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(cartState),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = {};
    try {
      data = await response.json();
    } catch (e) {
      openAlert({ type: "error", message: "couldn't parse response" });
    }
    if (data.type === "success") {
      console.log(data.order);

      setSecret(data.clientSecret);
      openAlert({
        type: "success",
        message: "order received" + JSON.stringify(data.order),
      });
      return;
    } else {
      openAlert(data);
      data.message.startsWith("User authentication failed")
        ? router.push("/login")
        : null;
    }
  }, []);
  useEffect(() => {
    // fetchClientSecret();
  }, []);
  return secret ? (
    <section>
      <Elements
        key={secret}
        options={{
          clientSecret: secret,
          appearance: {
            theme: theme === "dark" ? "night" : "stripe",
            labels: "floating",
            rules: {
              ".Input": {
                backgroundColor: "var(--md-sys-color-error)",
              },
            },
          },
        }}
        stripe={stripe}
      >
        <StripeForm></StripeForm>
      </Elements>
    </section>
  ) : (
    <section>
      <h2 className="p-4 text-2xl">Choose payment method</h2>
      <Button sx={{
        height: "100px",
        width: "100%",
        borderRadius: "16px",
        margin: "10px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        backgroundColor: "var(--md-sys-color-surface-container)",
        "@media screen and (min-width: 475px)":{
          width: "200px"
        }

      }} variant="outlined" onClick={fetchClientSecret}>Credit Card</Button>
    </section>
  );
};

export default Checkout;
