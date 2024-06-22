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
      setSecret(data.clientSecret);
      return data.clientSecret;
    } else {
      openAlert(data);
      data.message.startsWith("User authentication failed")
        ? router.push("/login")
        : null;
    }
  }, []);
  useEffect(() => {
    //TODO: Authenticate (and redirect to login) before opening payment page
    fetchClientSecret();
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
    <h2 className="p-6">Connecting to stripe</h2>
  );
};

export default Checkout;
